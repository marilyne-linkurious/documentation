/**
 * LINKURIOUS CONFIDENTIAL
 * Copyright Linkurious SAS 2012 - 2016
 *
 * - Created by david on 2016-12-29.
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');
const Utils = require('./Utils');
const Book = require('./Book');

const LINK_ABSOLUTE = /^https?:\/\/[^\s]+$/ig;
const LINK_RELATIVE = /^\/([a-z0-9-]+)(\/#[a-z0-9-]+)?$/ig;
const LINK_HASH = /^#([a-zA-Z0-9-]+)$/ig;

class BookSiteGenerator {

  /**
   * @param {Book} book
   * @param {string} target
   * @param {string} projectSources
   */
  constructor(book, target, projectSources) {
    //noinspection JSUnresolvedVariable
    this.book = book;
    this.target = target;
    this.projectSources = projectSources;
    this.templateBody = fs.readFileSync(book._path(book.config.template), {encoding: 'utf8'});

    // index entry keys
    this.entryKeys = new Set();
    this._forEntries(entry => {
      this.entryKeys.add(entry.key);
    });

    // image references
    this.imageReferences = this.getImageReferences();
    this.checkImageReferences();

    // extract variables and references, check integrity
    this.variables = this.book.getDefinedVariables(this.projectSources);
    this.variableReferences = this.book.getVariableReferences();
    this.book.checkVariableIntegrity(this.variables, this.variableReferences);
  }

  log(msg) {
    this.book.log(msg);
  }

  generate() {
    this.log(`Generating site in ${this.target}...`);
    fs.emptyDirSync(this.target);

    this.log('Generating HTML content from Markdown templates...');
    this._generateHtmlFile(
      {name: this.book.config.name, content: this.book.config.description, key: ''},
      this.target,
      this.variables
    );

    this._forEntries(entry => {
      // make entry dir + file
      let entryTarget = path.resolve(this.target, entry.key);
      fs.emptyDirSync(entryTarget);
      this._generateHtmlFile(entry, entryTarget, this.variables);
    });

    const assetsSource = this.book._path(this.book.config.assets);
    const assetsTarget = path.resolve(this.target, path.basename(assetsSource));
    this.log(`Copying assets from "${assetsSource}"...`);
    fs.copySync(assetsSource, assetsTarget);

    this.log(`Copying ${this.imageReferences.size} referenced images...`);
    for (let imageRef of this.imageReferences.values()) {
      fs.copySync(imageRef.key, path.resolve(this.target, imageRef.contentKey, imageRef.url));
    }
  }

  checkImageReferences() {
    for (let imgRef of this.imageReferences.values()) {
      if (imgRef.url.indexOf('/') !== -1) {
        throw new Error(
          `Illegal image URL (contains a "/"): "${imgRef.url}" in file "${imgRef.file}"`
        );
      }
      if (!fs.existsSync(imgRef.key)) {
        throw new Error(`Broken image reference "${imgRef.url}" in file "${imgRef.file}"`)
      }
    }
  }

  /**
   * @param {function(Entry)} cb
   * @private
   */
  _forEntries(cb) {
    this.book.config.index.forEach(entry => {
      cb(entry);
      if (!entry.children) { return; }
      entry.children.forEach(subEntry => {
        cb(subEntry);
      });
    });
  }

  /**
   * @returns {Map.<string, {key: string, url: string, file: string}>} indexed by absolute path
   */
  getImageReferences() {
    /** @type {Map.<string, {key: string, url: string, file: string, contentKey: string}>} */
    const references = new Map();

    this.log(`Extract image references from markdown files...`);
    this._forEntries(entry => {
      if (!entry.content) { return; }
      const mdPath = this.book.resolveContent(entry.content);
      const mdBody = fs.readFileSync(mdPath, {encoding: 'utf8'});

      Utils.forEachMatch(mdBody, /!\[[^\]]*]\(([^)]+)\)/g, imageUrl => {
        const imagePath = path.resolve(mdPath, '..', imageUrl);
        references.set(
          imagePath,
          {key: imagePath, url: imageUrl, file: mdPath, contentKey: entry.key}
        );
      });
    });

    return references;
  }

  /**
   * @param {Entry} entry relative path of a markdown content file
   * @param {string} targetPath
   * @param {Map<string, Variable>} variables
   */
  _generateHtmlFile(entry, targetPath, variables) {

    let htmlBody;
    const mdPath = this.book.resolveContent(entry.content);
    if (Utils.isFile(mdPath)) {
      // render Markdown template
      htmlBody = this._getHtmlContent(mdPath, variables);
    } else {
      htmlBody = Utils.renderMarkdown(this._makeMarkdownIndex(entry));
    }

    this._checkInternalLinks(htmlBody, entry.content);

    // render HTML template
    let htmlPage = this._renderTemplate(
      this.templateBody,
      variables,
      {body: htmlBody, title: entry.name},
      true
    );

    // tag links to current page
    htmlPage = htmlPage.replace(
      new RegExp(`href=(["']/${entry.key}["'])`, 'g'),
      `href=$1 class="current"`
    );

    if (this.book.config.externalLinksToBlank) {
      // make external link open in a new tab
      htmlPage = htmlPage.replace(
        /(href=["']https?:\/\/)/ig,
        `class="external" rel="noopener noreferrer" target="_blank" $1`
      );
    }

    // make all links absolute
    htmlPage = htmlPage.replace(
      /(href|src)=(["'])(\/)/ig,
      `$1=$2${this.book.config.siteRoot}$3`
    );

    fs.writeFileSync(path.resolve(targetPath, 'index.html'), htmlPage);
  }

  /**
   * @param {Entry} entry
   * @param {Entry[]} entry.children
   * @private
   */
  _makeMarkdownIndex(entry) {
    const bullet = this.book.config.numbering ? '1.' : '-';
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
    let mdTemplate;
    try {
      mdTemplate = fs.readFileSync(mdPath, {encoding: 'utf8'});
    } catch(e) {
      throw new Error('Could not read file "' + mdPath + '": ' + e.message);
    }
    return this._renderTemplate(mdTemplate, variables, null, false);
  }

  /**
   * @param {string} htmlBody
   * @param {string} mdPath
   * @throws {Error} if an internal link is broken.
   * @private
   */
  _checkInternalLinks(htmlBody, mdPath) {
    Utils.forEachMatch(htmlBody, /\shref=["'](.+?)['"]/ig, url => {
      if (url.match(LINK_HASH)) {
        // ignore hash links
      } else if (url.match(LINK_ABSOLUTE)) {
        // ignore absolute links
      } else if (url.match(LINK_RELATIVE)) {
        // remove leading "/" and "#anchor" part, then check for existence in entryKey index
        const entryKey = url.slice(1).split('/#')[0];
        if (!this.entryKeys.has(entryKey)) {
          throw new Error(`Broken internal link "${entryKey}" in file "${mdPath}"`);
        }
      } else {
        throw new Error(`Unexpected link URL: "${url}" in file "${mdPath}"`);
      }
    });
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
        throw new ReferenceError(`Variable reference "${referenceKey}" could not be resolved.`);
      }

      body = body.replace(new RegExp('\\{\\{' + referenceKey + '}}', 'g'), value);
    });

    return body;
  }

}

module.exports = BookSiteGenerator;
