#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const Dokapi = require('dokapi');

// (docName|"all") ["site"|"page"] [watch?]
const args = process.argv.slice(2);
const docName = args[0];
const outputType = args[1];
const watch = args[2] === 'true';

const OUTPUT_TYPES = ['site', 'page'];
const DOC_NAMES = fs.readdirSync(path.resolve(__dirname, 'content'));

/**
 * @param {string} docName or "all"
 * @param {string} outputType or "all"
 * @return {{}[]}
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
    dok.run();
  } catch(e) {
    dok.printError(e);
    process.exit(1);
  }
});
