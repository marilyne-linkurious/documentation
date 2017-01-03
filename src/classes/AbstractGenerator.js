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

const LINK_MAILTO = /^mailto:[^\s]+$/ig;
const LINK_ABSOLUTE = /^https?:\/\/[^\s]+$/ig;
const LINK_RELATIVE = /^\/([a-z0-9-]+)(\/#[a-z0-9-]+)?$/ig;
const LINK_HASH = /^#([a-zA-Z0-9=-]+)$/ig;

class AbstractGenerator {

  /**
   * @param {Book} book
   * @param {string} target
   * @param {string} projectSources
   * @param {string} htmlTemplateBody
   */
  constructor(book, target, projectSources, htmlTemplateBody) {
    //noinspection JSUnresolvedVariable
    this.book = book;
    this.target = target;
    this.projectSources = projectSources;
    this.htmlTemplateBody = htmlTemplateBody;

    // index entry keys
    this.entryKeys = new Set();
    this.forEntries(entry => {
      this.entryKeys.add(entry.key);
    });

    // image references
    this.imageReferences = this._getImageReferences();
    this._checkImageReferences();

    // extract variables and references, check integrity
    this.variables = this.book.getDefinedVariables(this.projectSources);
    this.variableReferences = this.book.getVariableReferences();
    this.book.checkVariableIntegrity(this.variables, this.variableReferences);

    this.siteRoot = this.book.config.siteRoot;
  }

  log(msg) {
    this.book.log(msg);
  }

  /**
   * @abstract
   */
  $generate() {
    throw new Error('$generate: not implemented');
  }

  /**
   * @abstract
   */
  generate() {
    this.log(`Generating site in ${this.target}...`);
    fs.emptyDirSync(this.target);

    this.$generate();
  }

  _checkImageReferences() {
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
   */
  forEntries(cb) {
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
  _getImageReferences() {
    /** @type {Map.<string, {key: string, url: string, file: string, contentKey: string}>} */
    const references = new Map();

    this.log(`Extract image references from markdown files...`);
    this.forEntries(entry => {
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
   */
  generateHtml(entry) {

    let htmlBody;
    const mdPath = this.book.resolveContent(entry.content);
    if (Utils.isFile(mdPath)) {
      // render Markdown template
      htmlBody = this._getHtmlContent(mdPath);
    } else {
      htmlBody = this.$generateMissingContentHtml(entry);
    }

    this.$checkInternalLinks(htmlBody, entry.content);

    // render HTML template
    let htmlPage = this.renderTemplate(
      this.htmlTemplateBody,
      {body: htmlBody, title: entry.name, 'entry.key': entry.key},
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

    htmlPage = this.fixLinksRoot(htmlPage);

    return htmlPage;
  }

  /**
   * Make all links absolute
   *
   * @param {string} html
   * @returns {string}
   */
  fixLinksRoot(html) {
    return html.replace(/(href|src)=(["'])(\/)/ig, `$1=$2${this.siteRoot}$3`);
  }

  /**
   * @abstract
   * @param {Entry} entry
   * @returns {string}
   */
  $generateMissingContentHtml(entry) {
    throw new Error('$generateMissingContentHtml: not implemented')
  }

  /**
   * @param {string} markdownPath Markdown file path
   * @returns {string}
   */
  _getHtmlContent(markdownPath) {
    return Utils.renderMarkdown(this.$getMarkdownContent(markdownPath));
  }

  /**
   * @param {string} mdPath
   * @returns {string}
   */
  $getMarkdownContent(mdPath) {
    let mdTemplate;
    try {
      mdTemplate = fs.readFileSync(mdPath, {encoding: 'utf8'});
    } catch(e) {
      throw new Error('Could not read file "' + mdPath + '": ' + e.message);
    }
    return this.renderTemplate(mdTemplate, null, false);
  }

  /**
   * @param {string} htmlBody
   * @param {string} mdPath
   * @throws {Error} if an internal link is broken.
   */
  $checkInternalLinks(htmlBody, mdPath) {
    Utils.forEachMatch(htmlBody, /\shref=["'](.+?)['"]/ig, url => {
      if (url.match(LINK_MAILTO) || url.match(LINK_HASH) || url.match(LINK_ABSOLUTE)) {
        // don't change mailto/hash/absolute
      } else if (url.match(LINK_RELATIVE)) {
        // remove leading "/" and "#anchor" part, then check for existence in entryKey index
        const entryKey = url.slice(1).split('/#')[0];
        if (!this.entryKeys.has(entryKey)) {
          throw new Error(`Broken internal link "${entryKey}" in file "${mdPath}"`);
        }
      } else {
        throw new Error(
          `Unexpected link URL: "${url}" in file "${mdPath}" (internal links must start with "/")`
        );
      }
    });
  }

  /**
   * @param {string} body The template body
   * @param {Object<String>} [variableOverrides={}]
   * @param {boolean} [renderMarkdown=false]
   * @returns {*}
   */
  renderTemplate(body, variableOverrides, renderMarkdown) {
    if (!variableOverrides) { variableOverrides = {}; }

    Utils.forReferences(body, referenceKey => {
      let value;
      if (referenceKey in variableOverrides) {
        value = variableOverrides[referenceKey];
      } else if (this.variables.has(referenceKey)) {
        value = this.variables.get(referenceKey).markdown && renderMarkdown
          ? Utils.renderMarkdown(this.variables.get(referenceKey).text)
          : this.variables.get(referenceKey).text;
      } else {
        throw new ReferenceError(`Variable reference "${referenceKey}" could not be resolved.`);
      }

      body = body.replace(new RegExp('\\{\\{' + referenceKey + '}}', 'g'), value);
    });

    return body;
  }

}

module.exports = AbstractGenerator;
