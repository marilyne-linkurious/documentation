/**
 * LINKURIOUS CONFIDENTIAL
 * Copyright Linkurious SAS 2012 - 2016
 *
 * - Created by david on 2016-12-23.
 */
'use strict';

const path = require('path');
const BookParser = require('./classes/BookParser');

const book = BookParser.parse(path.resolve(__dirname, '..', 'content', 'admin'));
book.generateSite('output/site');
