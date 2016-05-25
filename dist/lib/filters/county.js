'use strict';

module.exports = function filterByLongitude(data, county) {
	if (!county) {
		return data;
	}

	data = data.filter(function (event) {
		return event.county === county.toUpperCase();
	});

	return data;
};