'use strict';

const Promise = require('bluebird');
const parseProduct = require('./product-parse');

module.exports = function praseReports(data) {
	// Return the products defined in the optional `options` object or return all.
	// http://www.spc.noaa.gov/climo/data/nglsr/data/rpts/160406.log
	var results = parseProduct('TORNADO', data);

	return Promise.resolve(results);
};