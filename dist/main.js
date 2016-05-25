'use strict';

// Regular expression to validate the requested date format

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = require('./lib/reports-request');
var parse = require('./lib/reports-parse');
var propertyMapper = require('./lib/reports-property-mapper');
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
	return co(_regenerator2.default.mark(function gatherReports() {
		var productOptions, response, reportData;
		return _regenerator2.default.wrap(function gatherReports$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						productOptions = (0, _assign2.default)({}, defaultOptions);


						if (userOptions) {
							productOptions = (0, _assign2.default)(productOptions, userOptions);
						}

						_context.next = 4;
						return request(date);

					case 4:
						response = _context.sent;
						_context.next = 7;
						return parse(response.body, productOptions);

					case 7:
						reportData = _context.sent;
						_context.next = 10;
						return propertyMapper(reportData);

					case 10:
						return _context.abrupt('return', _context.sent);

					case 11:
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