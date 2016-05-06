'use strict';

module.exports = function filterByLongitude(data, min, max) {
	if (!min && !max) {
		return data;
	}

	data = data.filter(function (event) {
		var longitude = event.lon;

		if (min && max) {
			return longitude >= min && longitude <= max;
		} else if (min) {
			return longitude >= min;
		} else if (max) {
			return longitude <= max;
		}
	});

	return data;
};
