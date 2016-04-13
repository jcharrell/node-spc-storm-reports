'use strict';

const co = require('co');
const Promise = require('bluebird');
const parseProduct = require('./product-parse');

module.exports = function parseReports(data, options) {
	// Return the products defined in the optional `options` object or return all.
	// http://www.spc.noaa.gov/climo/data/nglsr/data/rpts/160406.log
	return co(function* spcRequest() {
		if(typeof data !== 'string') {
			throw new Error('`data` must be a valid string');
		}

		if(options && typeof options !== 'object') {
			throw new Error("'options' must be a valid object.");
		}

		let results = {};
		for (var property in options) {
			if (options.hasOwnProperty(property) && options[property]) {
				results[property] = parseProduct(property, data);
			}
		}

		return Promise.resolve(results);
	}).catch(function errorHandler(err) {
		throw (err);
	});
};