'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var co = require('co');

// Map our replacement properties for those that are not very enough
var propertyMappings = {
	'#': 'id',
	'e/m/u': 'magnitudeDesignator',
	'mag': 'magnitude',
	'st': 'state',
	'lat': 'latitude',
	'lon': 'longitude'
};

module.exports = function mapProperties(data) {
	return co(_regenerator2.default.mark(function propertyMapping() {
		var product;
		return _regenerator2.default.wrap(function propertyMapping$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						// Loop through each object property, which designates a specific report product (i.e. tornado, wind, hail)
						for (product in data) {
							if (data.hasOwnProperty(product)) {
								// Iterate over each report item available for the product
								data[product] = data[product].map(function (reportObject) {
									for (var property in reportObject) {
										// If this is a property that needs to be renamed.  Create a new property with the same value
										// and delete the original property
										if (reportObject.hasOwnProperty(property) && propertyMappings.hasOwnProperty(property)) {
											var newProperty = propertyMappings[property];
											reportObject[newProperty] = reportObject[property];
											delete reportObject[property];
										}
									}
									return reportObject;
								});
							}
						}
						return _context.abrupt('return', data);

					case 2:
					case 'end':
						return _context.stop();
				}
			}
		}, propertyMapping, this);
	}));
};