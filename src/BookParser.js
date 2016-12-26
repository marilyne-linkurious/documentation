/**
 * LINKURIOUS CONFIDENTIAL
 * Copyright Linkurious SAS 2012 - 2016
 *
 * - Created by david on 2016-12-23.
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');
const _difference = require('lodash.difference');
const Valcheck = require('valcheck');
const Book = require('./Book');
const Utils = require('./Utils');

/**
 * @type Valcheck
 */
const checker = new Valcheck(error => {
  throw new Error('Validation error: ' + error);
}, bug => {
  throw new Error('Library usage error: ' + bug);
});

class BookParser {

  /**
   * Checks that the book.json file is correct.
   * Checks that all referenced fiels exist.
   *
   * @param {string} dir
   * @return {Book} the parsed book
   */
  static parse(dir) {
    var configPath = path.resolve(dir, '.book.json');
    dir = path.resolve(dir);

    var fileContent;
    try {
      fileContent = fs.readFileSync(configPath, {encoding: 'utf8'});
    } catch(e) {
      throw new Error(`Could not read file "${configPath}: ${e.message}`);
    }

    var bookContent;
    try {
      bookContent = JSON.parse(fileContent);
    } catch(e) {
      throw new Error(`Could not parse JSON content of "${configPath}: ${e.message}`);
    }

    const markdownContent = BookParser._validate(dir, bookContent);

    return new Book(dir, bookContent, markdownContent);
  }

  /**
   * @param {string} dir content directory
   * @param {object} book
   * @return {string[]} files
   * @private
   */
  static _validate(dir, book) {
    var referencedFiles = [];

    // check that the .book.json file format is connect
    // check that all files referenced in "content" do exist in `dir`
    const checkFilePath = (key, value) => {
      checker.regexp(key, value, /^[a-z0-9/-]+\.md$/);
      let filePath = path.resolve(dir, value);
      checker.file(filePath, filePath);
      referencedFiles.push(filePath);
    };
    checker.properties('book', book, {
      name: {required: true, type: 'string'},
      project: {required: true, check: 'nonEmpty'},
      description: {required: true, check: checkFilePath},
      variables: {required: true, type: 'object'},
      index: {
        required: true,
        arrayItem: {
          properties: {
            name: {required: true, type: 'string'},
            key: {required: false, type: 'string'},
            content: {required: true, check: checkFilePath},
            children: {required: false, arrayItem: {
              properties: {
                name: {required: true, type: 'string'},
                key: {required: false, type: 'string'},
                content: {required: true, check: checkFilePath}
              }
            }}
          }
        }
      }
    });

    // check that all markdown files in `dir` are referenced in .book.json
    const markdownFiles = Utils.getAllFiles(dir, '.md');
    var notReferenced = _difference(markdownFiles, referencedFiles);
    if (notReferenced.length > 0) {
      throw new Error('Some Markdown files are not referenced: ' + notReferenced.join('\n'));
    }

    return referencedFiles;
  }

}

module.exports = BookParser;
