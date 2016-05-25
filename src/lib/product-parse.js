'use strict';

// Define a regular expression to extract each event for a given product
const validProducts = {
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
		throw new Error('`product` must be a valid string.');
	}

	if (typeof data !== 'string') {
		throw new Error('`data` must be a valid string.');
	}

	if (!validProducts.hasOwnProperty(product)) {
		throw new Error('Invalid product specified,');
	}

	// Define a regular expression to extract a product block from the log
	let productRegexString = `\\*{3}${validProducts[product]}\\*{3}\\n{2}\\s(.+)\\n{2,3}((?!\\*{3}\\w+\\*{3})(?:.+\\n)+)`;

	// Grab the product section.  If it is empty, return an empty array.
	let productMatch = data.match(productRegexString);

	if (productMatch === null) {
		return [];
	}

	// We have events, define an empty array to hold them!
	let events = [];

	// Extract each event from the product block
	let eventMatches = productMatch[2].trim().split('\n');

	// Create an array of each column name for this product block
	productMatch[1] = productMatch[1].toLowerCase();
	let columns = productMatch[1].split('|');

	/*
	 Loop through each event in the product block.  Create a new object, and
	 assign the values to the appropriate property name.  Add the event to the array of events.
	 I opted to use a `for` loop rather than a `forEach`, simply for performance.
	 */
	for (let i = 0; i < eventMatches.length; i++) {
		let obj = {};
		let eventDetails = eventMatches[i].split('|');
		for (let j = 0; j < eventDetails.length; j++) {
			let value = eventDetails[j];

			// Remove leading and trailing white spaces
			value = value.trim();

			// If this is the `time` value, make it resemble a time...
			if(columns[j] === 'time') {
				value = value.replace(/(\d{2})(\d{2})/, '$1:$2');
			}

			// Change empty strings to null values
			if (value === '') {
				value = null
			}

			// If the value is not null and is a number, cast it to an integer
			if (value !== null && !isNaN(value)) {
				value = parseInt(value);
			}

			obj[columns[j]] = value;
		}
		// Create a proper decimal value for latitude and longitude values provided by the NWS input
		obj.lat = ((obj.lat * 0.01).toFixed(2) / 1);
		obj.lon = ((obj.lon * -0.01).toFixed(2) / 1);

		events.push(obj);
	}

	return events;
};
