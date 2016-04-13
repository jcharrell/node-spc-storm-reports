'use strict';

// Regular expression to validate the requested date format

var request = require('./lib/reports-request');
var parse = require('./lib/reports-parse');
var Promise = require('bluebird');
var co = require('co');

// Default options, which determine the data attributes to request and return
var defaultOptions = {
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
				return co(regeneratorRuntime.mark(function gatherReports() {
								var productOptions, response;
								return regeneratorRuntime.wrap(function gatherReports$(_context) {
												while (1) {
																switch (_context.prev = _context.next) {
																				case 0:
																								productOptions = {};

																								productOptions = Object.assign(productOptions, defaultOptions);

																								if (userOptions) {
																												productOptions = Object.assign(productOptions, userOptions);
																								}

																								_context.next = 5;
																								return request(date);

																				case 5:
																								response = _context.sent;
																								_context.next = 8;
																								return parse(response.body, productOptions);

																				case 8:
																								return _context.abrupt('return', _context.sent);

																				case 9:
																				case 'end':
																								return _context.stop();
																}
												}
								}, gatherReports, this);
				})).catch(function errorHandler(err) {
								console.error(err.stack);
								throw err;
				});
};