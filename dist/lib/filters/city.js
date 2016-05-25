'use strict';

module.exports = function filterByLongitude(data, city) {
	if (!city) {
		return data;
	}

	data = data.filter(function (event) {
		return event.city === city.toUpperCase();
	});

	return data;
};