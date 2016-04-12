'use strict';

const baseUrl = 'http://www.spc.noaa.gov/climo/data/nglsr/data/rpts/';
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const co = require('co');

module.exports = function reportsRequest(date) {
    date = date.replace(/\d{2}(\d{2})-(\d{2})-(\d{2})/, '$1$2$3');

    return co(function* spcRequest() {
        let response = yield request.getAsync(`${baseUrl}${date}.log`);
        return Promise.resolve(response.body);
    }).catch(function errorHandler(err) {
        throw(err);
    });
};