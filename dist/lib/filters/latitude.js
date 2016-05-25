'use strict';

module.exports = function filterByLatitude(data, min, max) {
	if (!min && !max) {
		return data;
	}

	data = data.filter(function (event) {
		var latitude = event.lat;

		if (min && max) {
			return latitude >= min && latitude <= max;
		} else if (min) {
			return latitude >= min;
		} else if (max) {
			return latitude <= max;
		}
	});

	return data;
};