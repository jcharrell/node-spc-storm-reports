'use strict';

const co = require('co');
const Promise = require('bluebird');
const parseProduct = require('./product-parse');

module.exports = function parseReports(data) {
	// Return the products defined in the optional `options` object or return all.
	// http://www.spc.noaa.gov/climo/data/nglsr/data/rpts/160406.log
	return co(function* spcRequest() {
		var results = parseProduct('tornado', data);

		return Promise.resolve(results);
	}).catch(function errorHandler(err) {
		throw (err);
	});
};