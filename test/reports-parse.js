'use strict';

const chai = require('chai');
const expect = chai.expect;
const parseReports = require('./../src/lib/reports-parse');
const reports = require('./mocks/productWithEventsMock');
const defaultOptions = {
	tornado: true,
	hail: true,
	windDamage: true,
	gust: false,
	blizzard: false,
	freezingRain: false,
	heavySnow: false,
	iceStorm: false,
	sleet: false,
	snow: false,
	wildfire: false
};

describe('Parsing reports', function getParsedReportSuccessDescribe() {
	let events;

	before(function* getParsedReportSuccessDescribeBefore() {
		events = yield parseReports(reports, defaultOptions);
	});

	it('should return an non-empty array of event objects', function validResponse() {
		expect(events).to.be.instanceof(Object);
		expect(events.tornado).to.exist;
		expect(events.tornado).to.be.instanceof(Array);
	});
});
