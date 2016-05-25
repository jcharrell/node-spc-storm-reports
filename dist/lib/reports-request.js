'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
var request = require('./request');
var co = require('co');

module.exports = function reportsRequest(date) {

	return co(_regenerator2.default.mark(function spcRequest() {
		var requestOptions, response;
		return _regenerator2.default.wrap(function spcRequest$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (dateRegex.test(date)) {
							_context.next = 2;
							break;
						}

						throw new Error("'date' must be a valid date format.");

					case 2:

						// Utilize the supplied date to produce the SPC log date format
						date = date.replace(/\d{2}(\d{2})-(\d{2})-(\d{2})/, '$1$2$3');

						requestOptions = {
							host: 'www.spc.noaa.gov',
							path: '/climo/data/nglsr/data/rpts/' + date + '.log'
						};
						_context.next = 6;
						return request(requestOptions);

					case 6:
						response = _context.sent;

						if (!(response.statusCode !== 200)) {
							_context.next = 9;
							break;
						}

						throw new Error('Invalid response from the SPC.');

					case 9:
						return _context.abrupt('return', response);

					case 10:
					case 'end':
						return _context.stop();
				}
			}
		}, spcRequest, this);
	})).catch(function errorHandler(err) {
		throw err;
	});
};