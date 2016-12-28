/**
 * LINKURIOUS CONFIDENTIAL
 * Copyright Linkurious SAS 2012 - 2016
 *
 * - Created by david on 2016-12-23.
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');
const Utils = require('./Utils');

/**
 * @typedef {object} Entry
 * @property {string} key Entry key
 * @property {string} name Entry name
 * @property {string} content Markdown file path
 * @property {Array<Entry>|undefined} children Sub-entries
 */

/**
 * @typedef {object} Variable
 * @property {string} key Unique key of the variable.
 * @property {string} text Text content of this variable.
 * @property {string} file JS file in which this variable is defined.
 * @property {boolean|undefined} builtin Whether this is a builtin variable (true = will not fail if not used).
 */

/**
 * @typedef {object} Reference
 * @property {string} key Variable key to which this reference points to.
 * @property {string} file Markdown file in which the reference was found.
 */

class Book {
  /**
   *
   * @param {string} rootDir
   * @param {Object} config
   * @param {string} config.project
   * @param {string} config.name
   * @param {string} config.assets
   * @param {boolean} [config.numbering]
   * @param {string} config.siteRoot
   * @param {string} config.template HTML template file
   * @param {string} config.description
   * @param {Array<Entry>} config.index
   * @param {Object<String>} config.variables
   * @param {Array<string>} referencedContent
   * @param {object} [options]
   */
  constructor(rootDir, config, referencedContent, options) {
    this.rootDir = rootDir;
    this.config = config;
    this.referencedContent = referencedContent;
    this.options = Utils.defaults(options, {annotation: 'doc'});
    this.template = fs.readFileSync(this._path(this.config.template), {encoding: 'utf8'});
    this.numbering = !!config.numbering;

    this._assignKeys();
    this.checkOrphanContent();
  }

  /**
   * @returns {string}
   */
  static get CONFIG_FILE() { return '.book.json'; }

  /**
   * @returns {string}
   */
  static get CONTENT_DIR() { return 'content'; }

  checkOrphanContent() {
    // check that all content files in `rootDir`/content are referenced in `config`
    const markdownContent = Utils.getAllFiles(this._path(Book.CONTENT_DIR), '.md');
    const notReferenced = Utils.difference(markdownContent, this.referencedContent);
    if (notReferenced.length > 0) {
      throw new Error('Some Markdown files are not referenced:\n' + notReferenced.join('\n'));
    }
  }

  /**
   * @param {string} relativePath
   * @param {string} [subPath]
   * @returns {string} path resolved in `rootDir`
   */
  _path(relativePath, subPath) {
    if (subPath !== undefined) {
      return path.resolve(this.rootDir, relativePath, subPath);
    } else {
      return path.resolve(this.rootDir, relativePath);
    }
  }

  /**
   * Automatically assign keys to entries in this.config.index that do not have one.
   * Checks that entry keys are unique.
   */
  _assignKeys() {
    // assign default keys and check uniqueness
    const keys = new Set();
    const ensureEntryKey = (entry) => {
      if (entry.key === undefined) {
        entry.key = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }
      if (keys.has(entry.key)) {
        throw new Error('Duplicate entry key in index: ' + entry.key);
      } else {
        keys.add(entry.key)
      }
    };
    this.config.index.forEach(mainEntry => {
      ensureEntryKey(mainEntry);
      if (!mainEntry.children) { return; }
      mainEntry.children.forEach(subEntry => {
        ensureEntryKey(subEntry);
      });
    });
  }

  _checkMarkdownFiles(createMissing) {
    this.log(`Check all markdown files (creating missing: ${createMissing})...`);
    this.referencedContent.forEach(filePath => {
      if (createMissing) {
        fs.ensureFileSync(filePath)
      } else {
        Utils.check.file('file', filePath);
      }
    });
  }

  /**
   * @param {string} target Target directory
   * @param {boolean} [forceDownloadProject=false]
   * @param {boolean} [createMissingMarkdown=false]
   * @returns {Promise}
   */
  generateSite(target, forceDownloadProject, createMissingMarkdown) {
    const t = Date.now();

    this.log(`Generating site in ${target}...`);
    fs.emptyDirSync(target);

    this._checkMarkdownFiles(!!createMissingMarkdown);

    const projectSources = path.resolve(target, '..', path.basename(target) + '-project');
    if (!fs.existsSync(projectSources) || forceDownloadProject) {
      this.log(`Cloning project code (${this.config.project})...`);
      Utils.gitClone(this.config.project, projectSources);
    } else {
      this.log(`Using cached copy of (${this.config.project})...`);
    }

    const variables = this._getVariables(projectSources);
    const references = this._getReferences();
    this.checkVariableIntegrity(variables, references);

    this.log('Generating HTML content from Markdown templates...');
    this._generateHtmlFile(
      {name: this.config.name, content: this.config.description, key: ''}, target, variables
    );
    const generateEntry = entry => {
      // make entry dir + file
      let entryTarget = path.resolve(target, entry.key);
      fs.emptyDirSync(entryTarget);
      this._generateHtmlFile(entry, entryTarget, variables);
    };
    this.config.index.forEach(entry => {
      generateEntry(entry);
      if (!entry.children) { return; }
      entry.children.forEach(subEntry => {
        generateEntry(subEntry);
      });
    });

    const assetsSource = this._path(this.config.assets);
    const assetsTarget = path.resolve(target, path.basename(assetsSource));
    this.log(`Copying assets from "${assetsSource}"...`);
    fs.copySync(assetsSource, assetsTarget);

    this.log(`Done in ${((Date.now() - t) / 1000).toFixed(2)}s :)`);
  }

  /**
   * @param {Entry} entry relative path of a markdown content file
   * @param {string} targetPath
   * @param {Map<string, Variable>} variables
   */
  _generateHtmlFile(entry, targetPath, variables) {
    let htmlBody;
    const mdPath = this._path(Book.CONTENT_DIR, entry.content);
    if (Utils.isFile(mdPath)) {
      htmlBody = this._getHtmlContent(mdPath, variables);
    } else {
      htmlBody = Utils.renderMarkdown(this._makeIndexMarkdown(entry));
    }

    let htmlPage = this._renderTemplate(
      this.template,
      variables,
      {body: htmlBody, title: entry.name},
      true
    );

    // second pass to tag links to current page
    htmlPage = htmlPage.replace(
      new RegExp(`href=(["']/${entry.key}["'])`, 'g'),
      `href=$1 class="current"`
    );

    // third pass to make links absolute
    htmlPage = htmlPage.replace(
      /(href|src)=(["'])(\/)/g,
      `$1=$2${this.config.siteRoot}$3`
    );

    fs.writeFileSync(path.resolve(targetPath, 'index.html'), htmlPage);
  }

  /**
   * @param {Entry} entry
   * @param {Entry[]} entry.children
   * @private
   */
  _makeIndexMarkdown(entry) {
    const bullet = this.numbering ? '1.' : '-';
    return entry.children.reduce((md, child) => {
        return `${md}\n${bullet} [${child.name}](/${child.key})`;
    }, `# ${entry.name}\n`) + '\n';
  }

  /**
   * @param {string} markdownPath Markdown file path
   * @param {Map<string, Variable>} variables
   * @returns {string}
   */
  _getHtmlContent(markdownPath, variables) {
    return Utils.renderMarkdown(this._getMarkdownContent(markdownPath, variables));
  }

  /**
   * @param {string} mdPath
   * @param {Map<string, Variable>} variables
   * @returns {string}
   */
  _getMarkdownContent(mdPath, variables) {
    let mdBody;
    try {
      mdBody = fs.readFileSync(mdPath, {encoding: 'utf8'});
    } catch(e) {
      throw new Error('Could not read file "' + mdPath + '": ' + e.message);
    }
    return this._renderTemplate(mdBody, variables, null, false);
  }

  /**
   * @param {string} projectSources
   * @returns {Map.<string, Variable>}
   */
  _getVariables(projectSources) {
    const annotation = this.options.annotation;

    /** @type {Map<string, Variable>} */
    const variables = new Map();

    this.log(`Extracting @${annotation} variable from project code...`);
    Utils.getAllFiles(projectSources, '.js').forEach(jsFile => {
      Utils.extractComments(jsFile).forEach(comment => {
        if (!(annotation in comment.keys)) { return; }
        let key = comment.keys[annotation];
        let text = comment.lines.join('\n');
        variables.set(key, {text: text, key: key, file: jsFile, markdown: true});
      })
    });

    // loading builtin variables
    Object.keys(this.config.variables).forEach(variableKey => {
      variables.set(variableKey, {
        key: variableKey + '',
        text: this.config.variables[variableKey],
        builtin: true,
        file: Book.CONFIG_FILE,
        markdown: false
      });
    });

    // generating menu variable
    variables.set('menu', {
      key: 'menu',
      text: Utils.renderMarkdown(this._generateMarkdownMenu()),
      builtin: true,
      markdown: false,
      file: Book.CONFIG_FILE
    });

    // generating random token
    variables.set('random', {
      key: 'menu',
      text: Date.now() + '',
      builtin: true,
      markdown: false,
      file: Book.CONFIG_FILE
    });

    // extract package.json string variables
    const packagePath = path.resolve(projectSources, 'package.json');
    const packageInfo = fs.readJsonSync(packagePath, {encoding: 'utf8'});
    for (let key in packageInfo) {
      if (!packageInfo.hasOwnProperty(key) || typeof packageInfo[key] !== 'string') {
        continue;
      }
      let varKey = 'package.' + key;
      variables.set(
        varKey,
        {key: varKey, text: packageInfo[key], builtin: true, markdown: false, file: packagePath}
      );
    }

    return variables;
  }

  /**
   * @returns {Map.<string, Reference>}
   */
  _getReferences() {
    /** @type {Map<string, Reference>} */
    const references = new Map();

    this.log(`Extract block references from markdown files...`);
    this.referencedContent.forEach(mdFile => {
      const mdBody = fs.readFileSync(mdFile, {encoding: 'utf8'});
      Utils.forReferences(mdBody, referenceKey => {
        references.set(referenceKey, {file: mdFile, key: referenceKey});
      })
    });

    return references;
  }

  /**
   * @param {string} body The template body
   * @param {Map<String, Variable>} variables
   * @param {Object<String>} [variableOverrides={}]
   * @param {boolean} [renderMarkdown=false]
   * @returns {*}
   */
  _renderTemplate(body, variables, variableOverrides, renderMarkdown) {
    if (!variableOverrides) { variableOverrides = {}; }

    Utils.forReferences(body, referenceKey => {
      let value;
      if (referenceKey in variableOverrides) {
        value = variableOverrides[referenceKey];
      } else if (variables.has(referenceKey)) {
        value = variables.get(referenceKey).markdown && renderMarkdown
          ? Utils.renderMarkdown(variables.get(referenceKey).text)
          : variables.get(referenceKey).text;
      } else {
        throw new ReferenceError(`Variable reference "${referenceKey}" could nto be resolved.`);
      }

      body = body.replace(new RegExp('\\{\\{' + referenceKey + '}}', 'g'), value);
    });

    return body;
  }

  /**
   * @param {Map<string, Variable>} variables
   * @param {Map<string, Reference>} references
   */
  checkVariableIntegrity(variables, references) {
    this.log('Checking variables/references integrity...');
    const errors = [];
    for (let reference of references.values()) {
      if (!variables.has(reference.key)) {
        errors.push(`Reference "${reference.key}" used in "${reference.file}" is never defined.`);
      }
    }
    for (let variable of variables.values()) {
      // don't fail if a builtin variable is not used
      if (variable.builtin) { continue; }
      if (!references.has(variable.key)) {
        errors.push(`Variable "${variable.key}" defined in "${variable.file}" is never used.`);
      }
    }
    if (errors.length) {
      throw new Error(errors.join('\n'));
    }
  }

  log(msg) {
    console.log(msg);
  }

  /**
   * @returns {string}
   */
  _generateMarkdownMenu() {
    this.log(`Generating menu...`);
    const bullet = this.numbering ? '1.' : '-';
    return `${bullet} [Home](/)\n${this.__generateMarkdownMenu('', bullet, this.config.index)}`;
  }

  /**
   * @param {string} indent The indentation level
   * @param {string} bullet '-' or '1.'
   * @param {Array<Entry>} entries
   * @returns {string} html
   * @private
   */
  __generateMarkdownMenu(indent, bullet, entries) {
    return entries.reduce((menu, entry) => {
      return menu + indent + `${bullet} [${entry.name}](/${entry.key})\n` +
        (entry.children ? this.__generateMarkdownMenu(indent + '   ', bullet, entry.children) : '');
    }, '');
  }
}

module.exports = Book;
