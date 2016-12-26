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
const marky = require("marky-markdown");

/**
 * @typedef {object} Entry
 * @property {string} key Entry key
 * @property {string} name Entry name
 * @property {string} content Markdown file path
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
   * @param {string} contentDir
   * @param {object} config
   * @param {array<string>} markdownFiles
   * @param {object} [options]
   */
  constructor(contentDir, config, markdownFiles, options) {
    this.contentDir = contentDir;
    this.config = config;
    this.markownFiles = markdownFiles;
    this.options = Utils.defaults(options, {annotation: 'doc'});
    this.assignKeys();

    this.generateSite('./site');
  }

  assignKeys() {
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

  generateSite(target) {
    const t = Date.now();

    this.log(`Generating site in ${target}...`);
    fs.emptyDirSync(target);

    this.log(`Cloning project code (${this.config.project})...`);
    const projectSources = path.resolve(target, '.project');
    Utils.gitClone(this.config.project, projectSources);

    const variables = this.getVariables(projectSources);
    const references = this.getReferences();
    this.checkVariableIntegrity(variables, references);

    this.log('Generating HTML content from Markdown templates...');
    this.generateHtmlFile(
      {name: this.config.name, content: this.config.description, key: ''}, target, variables
    );
    this.config.index.forEach(entry => {
      // make entry dir + file
      let entryTarget = path.resolve(target, entry.key);
      fs.emptyDirSync(entryTarget);
      this.generateHtmlFile(entry.content, entryTarget, variables);

      if (!entry.children) { return; }
      entry.children.forEach(subEntry => {
        // make sub-entry dir + file
        let subEntryTarget = path.resolve(entryTarget, subEntry.key);
        fs.emptyDirSync(subEntryTarget);
        this.generateHtmlFile(subEntry.content, subEntryTarget, variables);
      });
    });

    this.log(`Done in ${((Date.now() - t) / 1000).toFixed(2)}s :)`);
  }

  /**
   * @param {Entry} entry relative path of a markdown content file
   * @param {string} targetPath
   * @param {Map<string, Variable>} variables
   */
  generateHtmlFile(entry, targetPath, variables) {
    const body = this.getHtmlContent(
      path.resolve(this.contentDir, entry.content),
      variables
    );
    fs.writeFileSync(
      path.resolve(targetPath, 'index.html'),
      `<html><head><title>${entry.name}</title></head><body>${body}</body>`
    );
  }

  /**
   * @param {string} markdownPath Markdown file path
   * @param {Map<string, Variable>} variables
   * @returns {string}
   */
  getHtmlContent(markdownPath, variables) {
    return marky(this.getMarkdownContent(markdownPath, variables), {
      sanitize: true,            // remove script tags and stuff
      linkify: true,             // turn orphan URLs into hyperlinks
      highlightSyntax: true,     // run highlights on fenced code blocks
      prefixHeadingIds: true,    // prevent DOM id collisions
      serveImagesWithCDN: false, // use npm's CDN to proxy images over HTTPS
      debug: false,              // console.log() all the things
      package: null              // npm package metadata
    });
  }

  /**
   * @param {string} mdPath
   * @param {Map<string, Variable>} variables
   * @returns {string}
   */
  getMarkdownContent(mdPath, variables) {
    var mdBody = fs.readFileSync(mdPath, {encoding: 'utf8'});

    // replace variable references
    this.forReferences(mdBody, referenceKey => {
      mdBody = mdBody.replace(
        new RegExp('\\{\\{' + referenceKey + '}}', 'g'),
        variables.get(referenceKey).text
      );
    });

    return mdBody;
  }

  /**
   * @param {string} projectSources
   * @returns {Map.<string, Variable>}
   */
  getVariables(projectSources) {
    const annotation = this.options.annotation;

    /** @type {Map<string, Variable>} */
    const variables = new Map();

    this.log(`Extracting @${annotation} variable from project code...`);
    Utils.getAllFiles(projectSources, '.js').forEach(jsFile => {
      Utils.extractComments(jsFile).forEach(comment => {
        if (comment.keys[annotation] === undefined) { return; }
        let key = comment.keys[annotation];
        let text = comment.lines.join('\n');
        variables.set(key, {text: text, key: key, file: jsFile});
      })
    });

    // loading builtin variables
    Object.keys(this.config.variables).forEach(variableKey => {
      variables.set(variableKey, {
        key: variableKey,
        text: this.config.variables[variableKey],
        builtin: true
      });
    });

    return variables;
  }

  /**
   * @returns {Map.<string, Reference>}
   */
  getReferences() {
    /** @type {Map<string, Reference>} */
    var references = new Map();

    this.log(`Extract block references from markdown files...`);
    this.markownFiles.forEach(mdFile => {
      const mdBody = fs.readFileSync(mdFile, {encoding: 'utf8'});
      this.forReferences(mdBody, referenceKey => {
        references.set(referenceKey, {file: mdFile, key: referenceKey});
      })
    });

    return references;
  }

  forReferences(mdBody, callback) {
    const blockRefRe = /\{\{([a-z0-9.]+)}}/g;
    var match;
    while ((match = blockRefRe.exec(mdBody)) !== null) {
      callback(match[1])
    }
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
      if (variables.builtin) { continue; }
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

}

module.exports = Book;
