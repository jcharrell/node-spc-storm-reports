'use strict';

const co = require('co');

// Map our replacement properties for those that are not very enough
const propertyMappings = {
	'#': 'id',
	'e/m/u': 'magnitudeDesignator',
	'mag': 'magnitude',
	'st': 'state',
	'lat': 'latitude',
	'lon': 'longitude'
};

module.exports = function mapProperties(data) {
	return co(function* propertyMapping() {
		// Loop through each object property, which designates a specific report product (i.e. tornado, wind, hail)
		for (let product in data) {
			if(data.hasOwnProperty(product)) {
				// Iterate over each report item available for the product
				data[product] = data[product].map(function(reportObject) {
					for (let property in reportObject) {
						// If this is a property that needs to be renamed.  Create a new property with the same value
						// and delete the original property
						if(reportObject.hasOwnProperty(property) && propertyMappings.hasOwnProperty(property)) {
							let newProperty = propertyMappings[property];
							reportObject[newProperty] = reportObject[property];
							delete reportObject[property];
						}
					}
					return reportObject;
				});
			}
		}
		return data;
	});
};
