'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = 'http://www.spc.noaa.gov/climo/data/nglsr/data/rpts/';
var dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var co = require('co');

module.exports = function reportsRequest(date) {
	return co(_regenerator2.default.mark(function spcRequest() {
		var response;
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

						date = date.replace(/\d{2}(\d{2})-(\d{2})-(\d{2})/, '$1$2$3');

						_context.next = 5;
						return request.getAsync('' + baseUrl + date + '.log');

					case 5:
						response = _context.sent;

						if (!(response.statusCode !== 200)) {
							_context.next = 8;
							break;
						}

						throw new Error('Invalid response from the SPC.');

					case 8:
						return _context.abrupt('return', response);

					case 9:
					case 'end':
						return _context.stop();
				}
			}
		}, spcRequest, this);
	})).catch(function errorHandler(err) {
		throw err;
	});
};