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
    var files = [];
    var fileNames = fs.readdirSync(dir);
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
   * Clone git repository into a folder.
   *
   * @param {string} url Repository URL.
   * @param {string} dir Target directory.
   */
  static gitClone(url, dir) {
    var branch = 'master';
    if (url.indexOf('#') !== -1) {
      let ub = url.split('#');
      url = ub[0];
      branch = ub[1];
    }

    fs.emptyDirSync(dir);
    var r = child.spawnSync(
      'git',
      ['clone', `--branch=${branch}`, '--depth=1', url],
      {cwd: dir, timeout: 5000, stdio: 'pipe'}
    );

    var err = r.output[2];
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
    var body = fs.readFileSync(file, {encoding: 'utf8'});

    const re = /^\/\*\*[\r\n]+([\w\W]+?)\*\//gm;
    var match, c, lines, comment;
    while ((match = re.exec(body)) !== null) {
      // extract lines
      c = match[1].trim();
      if (c[0] === '*') { c = c.substr(1); c = c.trim(); }
      lines = c.split(/[\r\n]+\s*[*][ ]*/);

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
   *
   * @param {object} o
   * @param {object} defaults
   * @returns {object}
   */
  static defaults(o, defaults) {
    if (!o)  { o = {}; }
    return _.defaults(o, defaults);
  }
}

module.exports = Utils;
