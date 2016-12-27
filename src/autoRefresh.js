/**
 * LINKURIOUS CONFIDENTIAL
 * Copyright Linkurious SAS 2012 - 2016
 *
 * - Created by david on 2016-12-27.
 */
'use strict';

const args = process.argv.slice(2);

if (args.length !== 2) { usage(); }
const sourceFolder = args[0];
const targetFolder = args[1];

const BookParser = require('./classes/BookParser');

const watch = require('watch');
watch.watchTree(sourceFolder, () => {
  console.log('Source folder changed, rebuilding...');
  try {
    const book = BookParser.parse(sourceFolder);
    book.log = function(m) { console.log(' * ' + m); };
    book.generateSite(targetFolder, false);
  } catch(e) {
    fatal(e.message);
  }

});

function usage() {
  fatal(`Usage: >${process.argv[1]} source-folder target-folder`);
}

function fatal(msg) {
  console.log(msg);
  process.exit(1);
}

// process.on('SIGTERM', function () {
//   server.close(function () {
//     process.exit(0);
//   });
// });

