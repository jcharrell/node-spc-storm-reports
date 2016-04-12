'use strict';

const Promise = require('bluebird');

// Define a regular expression to extract each event for a given product
const eventRegEx = new RegExp('^(.+)$', 'gm');

function parseData(product, data) {
	// Define a regular expression to extract a product block from the log
	let productRegexString = `\\*{3}${product}\\*{3}\\n{2}\\s(.+)\\n{2,3}((?:.+\\n)+)`;

	// Grab the product section.  If it is empty, return an empty array.
	let productMatch = data.match(productRegexString);
	if(productMatch === null) {
		return [];
	}

	// We have events, define an empty array to hold them!
	let events = [];

	// Extract each event from the product block
	let eventMatches = productMatch[2].match(eventRegEx);

	// Create an array of each column name for this product block
	let columns = productMatch[1].split('|');

	/*
		Loop through each event in the product block.  Create a new object, and
		assign the values to the appropriate property name.  Add the event to the array of events.
	 */
	for(let i = 0; i < eventMatches.length; i++) {
		let obj = {};
		let eventDetails = eventMatches[i].split('|');
		for(let j = 0; j < eventDetails.length; j++) {
			obj[columns[j]] = eventDetails[j];
		}
		events.push(obj);
	}

	return events;
}

module.exports = function reportsParse(data) {
	// Return the products defined in the optional `options` object or return all.
	var results = parseData('TORNADO', data);
	return Promise.resolve(results);
};