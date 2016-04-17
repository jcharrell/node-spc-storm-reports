'use strict';

// Regular expression to validate the requested date format
const request = require('./lib/reports-request');
const parse = require('./lib/reports-parse');
const co = require('co');

// Default options, which determine the data attributes to request and return
const defaultOptions = {
	tornado: true,
    hail: true,
	windDamage: true,
	gust: false,
	blizzard: false,
	freezingRain: false,
	heavySnow: false,
	iceStorm: false,
	sleet: false,
	snow: false,
	wildfire: false
};

module.exports = function requestReports(date, userOptions) {
	return co(function* gatherReports() {
		let productOptions = Object.assign({}, defaultOptions);

		if (userOptions) {
			productOptions = Object.assign(productOptions, userOptions);
		}

        let response = yield request(date);
		return parse(response.body, productOptions);
	}).catch(function errorHandler(err) {
		console.error(err.stack);
		throw(err);
	});
};
