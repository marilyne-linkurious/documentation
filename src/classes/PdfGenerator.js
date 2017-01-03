/**
 * LINKURIOUS CONFIDENTIAL
 * Copyright Linkurious SAS 2012 - 2016
 *
 * - Created by david on 2016-12-29.
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');
const pdf = require('html-pdf');
const Utils = require('./Utils');
const AbstractGenerator = require('./AbstractGenerator');

class PdfGenerator extends AbstractGenerator {

  /**
   * @param {Book} book
   * @param {string} target
   * @param {string} projectSources
   */
  constructor(book, target, projectSources) {
    super(
      book,
      path.resolve(target, 'pdf'),
      projectSources,
      `
       <div style="page-break-before: always"></div>
       <a id="_{{entry.key}}_">&nbsp;</a>
       {{body}}`
    );
    this.siteRoot = '.';
  }

  /**
   *
   */
  $generate() {
    // single page template
    const htmlTemplate = fs.readFileSync(
      this.book._path(this.book.config.pdfTemplate),
      {encoding: 'utf8'}
    );
    const templateParts = htmlTemplate.split('{{body}}', 2);

    const targetFile = path.resolve(this.target, 'index.html');

    /** @type {number} */
    const htmlFd = fs.openSync(targetFile, 'a');
    const appendHtml = (str) => fs.writeSync(htmlFd, str);

    this.log('Generating HTML content from Markdown templates...');

    // html template (prefix)
    appendHtml(this.fixLinksRoot(this.renderTemplate(templateParts[0])));

    appendHtml(this.generateHtml(
      {name: this.book.config.name, content: this.book.config.description, key: ''}
    ));

    this.forEntries(entry => { appendHtml(this.generateHtml(entry)); });

    // html template (suffix)
    appendHtml(this.fixLinksRoot(this.renderTemplate(templateParts[1])));

    fs.closeSync(htmlFd);

    const assetsSource = this.book._path(this.book.config.assets);
    const assetsTarget = path.resolve(this.target, path.basename(assetsSource));
    this.log(`Copying assets from "${assetsSource}"...`);
    fs.copySync(assetsSource, assetsTarget);

    this.log(`Copying ${this.imageReferences.size} referenced images...`);
    for (let imageRef of this.imageReferences.values()) {
      fs.copySync(imageRef.key, path.resolve(this.target, 'images', imageRef.url));
    }

    // todo: use https://www.npmjs.com/package/pdfcrowd to generate a PDF with working anchor links
    this.log(`Generating PDF file...`);
    const options = { format: 'Letter' };
    const html = fs.readFileSync(targetFile, {encoding: 'utf8'});
    pdf.create(html, options).toFile(path.resolve(this.target, 'index.pdf'), function(err, res) {
      if (err) return console.log(err);
      console.log(res);
    });
  }

  /**
   * @param {Entry} entry
   * @returns {string}
   */
  $generateMissingContentHtml(entry) {
    return '';
  }

  /**
   * @param {string} mdPath
   * @returns {string}
   */
  $getMarkdownContent(mdPath) {
    let md = super.$getMarkdownContent(mdPath);

    // fix image links (relative to "images" folder)
    md = md.replace(/(!\[[^\]]*?])\(([^)]+?)\)/ig, `$1(/images/$2)`);

    // fix internal links (make anchors)
    return md.replace(/([^!]\[[^\]]*?])\(\/([^)]+?)(\/#[^)]+?)?\)/ig, '$1(#_$2_)');
  }

  $checkInternalLinks(htmlBody, mdPath) {
    Utils.forEachMatch(htmlBody, /\shref="#namedest=([^"]+?)"/ig, key => {
      if (!this.entryKeys.has(key)) {
        throw new Error(`Broken internal link "${key}" in file "${mdPath}"`);
      }
    });
  }
}

module.exports = PdfGenerator;
