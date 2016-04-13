'use strict';

const chai = require('chai');
const expect = chai.expect;
const parseProduct = require('./../src/lib/product-parse');
const productWithEvents = require('./mocks/productWithEventsMock');
const productWithoutEvents = require('./mocks/productWithoutEventsMock');

describe('Parsing a product with events', function getParsedProductSuccessDescribe() {
	let events;

	before(function* getParsedProductSuccessBefore() {
		events = parseProduct('tornado', productWithEvents);
	});

	it('should return an non-empty array of event objects', function noRightsCode() {
		expect(events).to.be.instanceof(Array);
		expect(events).to.not.be.empty;
	});
});

describe('Parsing a product without events', function getParsedProductSuccessDescribe() {
	let events;

	before(function* getParsedProductSuccessBefore() {
		events = parseProduct('tornado', productWithoutEvents);
	});

	it('should return an empty array of event objects', function noRightsCode() {
		expect(events).to.be.instanceof(Array);
		expect(events).to.be.empty;
	});
});

describe('Attempting to parse a report without a valid string for the product', function getParsedProductSuccessDescribe() {

	it('should throw an error', function noRightsCode() {
		expect(function () {
			parseProduct(123, productWithEvents);
		}).to.throw('`product` must be a valid string');
	});
});

describe('Attempting to parse a report without a valid string for the data', function getParsedProductSuccessDescribe() {

	it('should throw an error', function noRightsCode() {
		expect(function () {
			parseProduct('tornado', []);
		}).to.throw('`data` must be a valid string');
	});
});