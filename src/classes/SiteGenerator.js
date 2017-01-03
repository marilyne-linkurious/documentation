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
const AbstractGenerator = require('./AbstractGenerator');

class SiteGenerator extends AbstractGenerator {

  /**
   * @param {Book} book
   * @param {string} target
   * @param {string} projectSources
   */
  constructor(book, target, projectSources) {
    super(
      book,
      path.resolve(target, 'site'),
      projectSources,
      fs.readFileSync(book._path(book.config.siteTemplate), {encoding: 'utf8'})
    )
  }

  /**
   *
   */
  $generate() {
    this.log('Generating HTML content from Markdown templates...');
    this.generateHtmlFile(
      this.target,
      {name: this.book.config.name, content: this.book.config.description, key: ''}
    );

    this.forEntries(entry => {
      // make entry dir + file
      let entryTargetPath = path.resolve(this.target, entry.key);
      fs.emptyDirSync(entryTargetPath);
      this.generateHtmlFile(entryTargetPath, entry);
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

  /**
   * @param {string} targetPath
   * @param {Entry} entry
   */
  generateHtmlFile(targetPath, entry) {
    fs.writeFileSync(
      path.resolve(targetPath, 'index.html'),
      this.generateHtml(entry)
    );
  }




  /**
   * @param {Entry} entry
   * @returns {string}
   */
  $generateMissingContentHtml(entry) {
    return Utils.renderMarkdown(this._makeMarkdownIndex(entry));
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

}

module.exports = SiteGenerator;
