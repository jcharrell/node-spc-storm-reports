'use strict';

// Define a regular expression to extract each event for a given product

var eventRegEx = new RegExp('^(.+)$', 'gm');
var validProducts = {
	tornado: 'TORNADO',
	hail: 'HAIL',
	windDamage: 'WNDG',
	windGust: 'GUST',
	blizzard: 'BLIZZARD',
	freezingRain: 'FREEZING RAIN',
	heavySnow: 'HEAVY SNOW',
	iceStorm: 'ICE STORM',
	sleet: 'SLEET',
	snow: 'SNOW',
	wildfire: 'WILDFIRE'
};

module.exports = function parseData(product, data) {
	// Perform some basic data validation
	if (typeof product !== 'string') {
		throw new Error('`product` must be a valid string');
	}

	if (typeof data !== 'string') {
		throw new Error('`data` must be a valid string');
	}

	if (!validProducts.hasOwnProperty(product)) {
		throw new Error('Invalid product specified');
	}

	// Define a regular expression to extract a product block from the log
	var productRegexString = '\\*{3}' + validProducts[product] + '\\*{3}\\n{2}\\s(.+)\\n{2,3}((?!\\*{3}\\w+\\*{3})(?:.+\\n)+)';

	// Grab the product section.  If it is empty, return an empty array.
	var productMatch = data.match(productRegexString);

	if (productMatch === null) {
		return [];
	}

	// We have events, define an empty array to hold them!
	var events = [];

	// Extract each event from the product block
	var eventMatches = productMatch[2].match(eventRegEx);

	// Create an array of each column name for this product block
	productMatch[1] = productMatch[1].toLowerCase();
	var columns = productMatch[1].split('|');

	/*
  Loop through each event in the product block.  Create a new object, and
  assign the values to the appropriate property name.  Add the event to the array of events.
  I opted to use a `for` loop rather than a `forEach`, simply for performance.
  */
	for (var i = 0; i < eventMatches.length; i++) {
		var obj = {};
		var eventDetails = eventMatches[i].split('|');
		for (var j = 0; j < eventDetails.length; j++) {
			// Cleanup the value and cast to integer if it is a number
			var value = eventDetails[j];

			// Remove leading and trailing white spaces
			value = value.trim();

			// Change empty strings to null values
			if (value === '') {
				value = null;
			}

			// If the value is not null and is a number, cast it to an integer
			if (value !== null && !isNaN(value)) {
				value = parseInt(value);
			}

			obj[columns[j]] = value;
		}
		// Create a proper decimal value for latitude and longitude values provided by the NWS input
		obj.lat = (obj.lat * 0.01).toFixed(2) / 1;
		obj.lon = (obj.lon * -0.01).toFixed(2) / 1;

		events.push(obj);
	}

	return events;
};