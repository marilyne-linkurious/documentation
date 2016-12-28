/**
 * LINKURIOUS CONFIDENTIAL
 * Copyright Linkurious SAS 2012 - 2016
 *
 * - Created by david on 2016-12-26.
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');
const child = require('child_process');
const _ = require('lodash');
const marky = require("marky-markdown");
const Valcheck = require('valcheck');

/**
 * @type Valcheck
 */
const checker = new Valcheck(error => {
  throw new Error('Validation error: ' + error);
}, bug => {
  throw new Error('Library usage error: ' + bug);
});

/** @type {function(Array, Array): Array} */
const _difference = require('lodash.difference');

const COMMENT_KEY_RE = /^@(\S+)(?:\s+(.+))?$/;

class Utils {

  /**
   * Get all files recursively.
   *
   * @param {string} dir
   * @param {string} suffix
   * @returns {Array<String>}
   */
  static getAllFiles(dir, suffix) {
    let files = [];
    const fileNames = fs.readdirSync(dir);
    for (let fileName of fileNames) {
      let filePath = path.resolve(dir, fileName);
      let stat = fs.statSync(filePath);
      if (stat.isFile() && fileName.endsWith(suffix)) {
        files.push(filePath);
      } else if (stat.isDirectory()) {
        files = files.concat(Utils.getAllFiles(filePath, suffix));
      }
    }
    return files;
  }

  /**
   * @returns {Valcheck}
   */
  static get check() { return checker; }

  /**
   * Clone git repository into a folder.
   *
   * @param {string} url Repository URL.
   * @param {string} dir Target directory.
   */
  static gitClone(url, dir) {
    let branch = 'master';
    if (url.indexOf('#') !== -1) {
      let ub = url.split('#');
      url = ub[0];
      branch = ub[1];
    }

    fs.emptyDirSync(dir);
    const r = child.spawnSync(
      'git',
      ['clone', `--branch=${branch}`, '--depth=1', url, '.'],
      {cwd: dir, timeout: 5000, stdio: 'pipe'}
    );

    const err = r.output[2];
    if (r.status !== 0) {
      throw new Error('Error while cloning: ' + err)
    }
  }

  /**
   * Extracts block comments from a JS file
   *
   * @param {string} file
   * @returns {Array<{file: string, keys: Object<string>, lines: Array<String>}>}
   */
  static extractComments(file) {
    const comments = [];
    const body = fs.readFileSync(file, {encoding: 'utf8'});

    const re = /^\/\*\*[\r\n]+([\w\W]+?)\*\//gm;
    let match, c, lines, comment;
    while ((match = re.exec(body)) !== null) {
      // extract lines
      c = match[1].trim();
      if (c[0] === '*') { c = c.substr(1); c = c.trim(); }
      lines = c.split(/[\r\n]+\s*[*][ ]?/);

      // extract @keys and lines
      comment = {file: file, keys: {}, lines: []};
      lines.forEach(line => {
        if ((match = COMMENT_KEY_RE.exec(line)) !== null) {
          comment.keys[match[1]] = match[2] ? match[2] : true;
        } else {
          comment.lines.push(line);
        }
      });

      comments.push(comment);
    }

    return comments;
  }

  /**
   * @param {string} body
   * @param {function(string)} callback called for each Moustache reference
   */
  static forReferences(body, callback) {
    const blockRefRe = /\{\{([a-z0-9.]+)}}/g;
    let match;
    while ((match = blockRefRe.exec(body)) !== null) {
      callback(match[1])
    }
  }

  /**
   * @param {string} markdown Markdown content
   * @returns {string} HTML content
   */
  static renderMarkdown(markdown) {

    // hack to fix code highlighting
    markdown = markdown.replace(/```JS(?:ON)?\n/ig, '```js\n');

    return marky(markdown, {
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
   * @param {Array} array
   * @param {Array} otherArray
   * @returns {Array}
   */
  static difference(array, otherArray) {
    return _difference(array, otherArray);
  }

  /**
   *
   * @param {object} o
   * @param {object} defaults
   * @returns {object}
   */
  static defaults(o, defaults) {
    if (!o)  { o = {}; }
    return _.defaults(o, defaults);
  }

  /**
   *
   * @param {string} p path
   * @returns {boolean}
   */
  static isFile(p) {
    try {
      const stats = fs.statSync(p);
      return stats.isFile();
    } catch(e) {
      return false;
    }
  }
}

module.exports = Utils;
