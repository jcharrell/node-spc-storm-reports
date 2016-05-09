'use strict';

module.exports = function filterByLongitude(data, state) {
	if (!state) {
		return data;
	}

	data = data.filter(function (event) {
		return event.st === state.toUpperCase();
	});

	return data;
};
