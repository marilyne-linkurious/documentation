#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs-extra');
const Dokapi = require('dokapi');

// (docName|"all") ["site"|"page"] [watch?]
const args = process.argv.slice(2);
const docName = args[0];
const outputType = args[1];
const watch = args[2] === 'true';

const OUTPUT_TYPES = ['site', 'page'];
const DOC_NAMES = fs
  .readdirSync(path.resolve(__dirname, 'content'))
  .filter(dir => dir !== 'shared');

/**
 * @typedef {object} DokapiArgs
 * @property {string} input
 * @property {string} output
 * @property {string} outputType
 * @property {boolean} watch
 * @property {boolean} refreshProject
 * @property {boolean} createMissing
 */

/**
 * @param {string} docName or "all"
 * @param {string} outputType or "all"
 * @return {DokapiArgs[]}
 */
const makeAllArgs = (docName, outputType) => {
  if (docName === 'all') {
    return DOC_NAMES.reduce((res, n) => res.concat(makeAllArgs(n, outputType)), []);
  }
  if (outputType === 'all') {
    return OUTPUT_TYPES.reduce((res, t) => res.concat(makeAllArgs(docName, t)), []);
  }
  return [{
    input: path.resolve(__dirname, 'content', docName),
    output: path.resolve(__dirname, 'output', docName),
    outputType: outputType,
    watch: watch,
    createMissing: false,
    refreshProject: false
  }];
};

// console.log(JSON.stringify(makeAllArgs(docName, outputType), null, ' '))

// make all args
makeAllArgs(docName, outputType).forEach(args => {
  const dok = new Dokapi(args);
  try {
    dok.run(() => {
      if ((args.outputType === 'page' || args.outputType === 'all') && outputType === 'all') {
        fs.copySync(
          path.resolve(args.output, 'page', 'index.html'),
          path.resolve(args.output, 'site', 'page.html')
        );
      }
    });
  } catch(e) {
    dok.printError(e);
    process.exit(1);
  }
});
