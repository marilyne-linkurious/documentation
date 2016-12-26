/**
 * LINKURIOUS CONFIDENTIAL
 * Copyright Linkurious SAS 2012 - 2016
 *
 * - Created by david on 2016-12-23.
 */
'use strict';

const BookParser = require('./BookParser');

const book = BookParser.parse('./content/admin');
//console.log(JSON.stringify(book, null, ' '));
