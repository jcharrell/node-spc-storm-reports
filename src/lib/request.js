'use strict';

const http = require('http');
const Promise = require('bluebird');

module.exports = Promise.method(function promiseMethod(options) {
	return new Promise(function requestPromise(resolve, reject) {
		http.request(options, function httpRequest(response) {
			// Bundle the result
			let result = {
				statusCode: response.statusCode,
				headers: response.headers,
				body: ''
			};

			// Build the body
			response.on('data', function buildBody(chunk) {
				result.body += chunk;
			});

			// Resolve with the response
			response.on('end', function resolvePromise() {
				resolve(result);
			});

			// Handle errors
			response.on('error', function errorHandler(err) {
				reject(err);
			});
		}).end();
	});
});
