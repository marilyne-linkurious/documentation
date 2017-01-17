'use strict';

const path = require('path');
const Dokapi = require('dokapi');

// (docName|"all") ["site"|"page"] [watch?]
const args = process.argv.slice(2);
const docName = args[0];
const outputType = args[1];
const watch = args[2] === 'true';


/**
 * @param {string} docName or "all"
 * @param {string} outputType or "all"
 * @return {{}[]}
 */
const makeAllArgs = (docName, outputType) => {
  if (docName === 'all') {
    return []
      .concat(makeAllArgs('user', outputType))
      .concat(makeAllArgs('admin', outputType))
      .concat(makeAllArgs('apidoc-examples', outputType));
  }
  if (outputType === 'all') {
    return []
      .concat(makeAllArgs(docName, 'site'))
      .concat(makeAllArgs(docName, 'page'));
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

//console.log(JSON.stringify(makeAllArgs(docName, outputType), null, ' '))

// make all args
makeAllArgs(docName, outputType).forEach(args => {
  const dok = new Dokapi(args);
  dok.run();
});
