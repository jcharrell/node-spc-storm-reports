'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var co = require('co');
var Promise = require('bluebird');
var parseProduct = require('./product-parse');

module.exports = function parseReports(data, options) {
	// Return the products defined in the optional `options` object or return all.
	// http://www.spc.noaa.gov/climo/data/nglsr/data/rpts/160406.log
	return co(_regenerator2.default.mark(function spcRequest() {
		var results, property;
		return _regenerator2.default.wrap(function spcRequest$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(typeof data !== 'string')) {
							_context.next = 2;
							break;
						}

						throw new Error('`data` must be a valid string');

					case 2:
						if (!(options && (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) !== 'object')) {
							_context.next = 4;
							break;
						}

						throw new Error("'options' must be a valid object.");

					case 4:
						results = {};

						for (property in options) {
							if (options.hasOwnProperty(property) && options[property]) {
								results[property] = parseProduct(property, data);
							}
						}

						return _context.abrupt('return', Promise.resolve(results));

					case 7:
					case 'end':
						return _context.stop();
				}
			}
		}, spcRequest, this);
	})).catch(function errorHandler(err) {
		throw err;
	});
};