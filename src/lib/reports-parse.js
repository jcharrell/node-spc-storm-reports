'use strict';

const co = require('co');
const parseProduct = require('./product-parse');

module.exports = function parseReports(data, options) {
	// Return the products defined in the optional `options` object or return the defaults.
	return co(function* spcRequest() {
		// Validate that the data is a valid string
		if (typeof data !== 'string') {
			throw new Error('`data` must be a valid string.');
		}

		// If an `options` value is supplied, verify that it is an object
		if (options && typeof options !== 'object') {
			throw new Error('`options` must be a valid object.');
		}

		let results = {};
		// Loop through each product property within the options object
		for (let property in options) {
			// If the product is requested to be returned (`true`)
			if (options.hasOwnProperty(property) && options[property]) {
				// Parse the events for this product and store it in the the results (response)
				results[property] = parseProduct(property, data);
			}
		}

		return results;
	}).catch(function errorHandler(err) {
		throw err;
	});
};
