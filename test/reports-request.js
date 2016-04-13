'use strict';

const chai = require('chai');
const expect = chai.expect;
const reportsRequest = require('./../src/lib/reports-request');

describe('Request SPC storm reports', function getReportsSuccessDescribe() {
	let response;

	before(function* getReportsSuccessBefore() {
		response = yield reportsRequest('2016-04-04');
	});

	it('should return with a HTTP status of 200', function noRightsCode() {
		expect(response.statusCode).to.exist;
		expect(response.statusCode).to.equal(200);
	});

	it("should respond with a valid response body", function () {
		expect(response.body).to.exist;
	});
});
