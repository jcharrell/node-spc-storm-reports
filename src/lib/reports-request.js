'use strict';

const baseUrl = 'http://www.spc.noaa.gov/climo/data/nglsr/data/rpts/';
const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const co = require('co');

module.exports = function reportsRequest(date) {
	return co(function* spcRequest() {
		if (!dateRegex.test(date)) {
			throw new Error("'date' must be a valid date format.");
		}

		date = date.replace(/\d{2}(\d{2})-(\d{2})-(\d{2})/, '$1$2$3');

		let response =  yield request.getAsync(`${baseUrl}${date}.log`);

		if(response.statusCode !== 200) {
			throw new Error('Invalid response from the SPC.')
		}

		return response;
	}).catch(function errorHandler(err) {
		throw (err);
	});
};
