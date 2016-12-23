/**
 * LINKURIOUS CONFIDENTIAL
 * Copyright Linkurious SAS 2012 - 2016
 *
 * - Created by david on 2016-12-23.
 */
'use strict';

const fs = require('fs-extra');
const path = require('path');

const Book = require('./Book');

const Valcheck = require('valcheck/src/Valcheck');

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
      console.log(JSON.stringify(fileContent, null, ' '))
      bookContent = JSON.parse(fileContent);
    } catch(e) {
      throw new Error(`Could not parse JSON content of "${configPath}: ${e.message}`);
    }

    BookParser._validate(dir, bookContent);

    return new Book(dir, bookContent);
  }

  /**
   * @param {string} dir content directory
   * @param {object} content
   * @return {string[]} files
   * @private
   */
  static _validate(dir, content) {
    var files = [];

    // check object format and extract files
    const contentChecker = (key, value) => {
      if (typeof value === 'string') {
        // extract file names
        files.push(value);
        return false;
      } else if (Array.isArray(value)) {
        return checker.property(key, value, {
          arrayItem: {
            required: true,
            properties: {
              name: {required: true, type: 'string'},
              content: {required: true, check: contentChecker}
            }
          }
        });
      } else {
        return checker._error(key, "must be a string or an array");
      }
    };

    checker.properties('book', content, {
      name: {required: true, type: 'string'},
      description: {required: true, type: 'string'},
      index: {
        required: true,
        arrayItem: {
          properties: {
            name: {required: true, type: 'string'},
            content: {required: true, check: contentChecker}
          }
        }
      }
    });

    // check that all files exits
    files.forEach(file => {
      let f = path.resolve(dir, file);
      checker.file(f, f);
    });

    // todo: check that no existing file is un-referenced

    return files;
  }
}

module.exports = BookParser;
