'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getstressofdeviceid = exports.getecgofdeviceid = exports.getrealdata = exports.getHealthByID = undefined;

// YAG function to fetch user's health data

let getHealthByID = exports.getHealthByID = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const result = yield _healthModel2.default.getHealth(username);
        res.status(result.statusCode).send(result.body);
    });

    return function getHealthByID(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let getrealdata = exports.getrealdata = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const deviceId = req.swagger.params.deviceId.value;
        const result = yield _healthModel2.default.getrealdata(username, deviceId);
        res.status(result.statusCode).send(result.body);
    });

    return function getrealdata(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let getecgofdeviceid = exports.getecgofdeviceid = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const deviceId = req.swagger.params.deviceId.value;
        const result = yield _healthModel2.default.getecgofdeviceid(deviceId);
        res.status(result.statusCode).send(result.body);
    });

    return function getecgofdeviceid(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

let getstressofdeviceid = exports.getstressofdeviceid = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const deviceId = req.swagger.params.deviceId.value;
        const result = yield _healthModel2.default.getstressofdeviceid(deviceId);
        res.status(result.statusCode).send(result.body);
    });

    return function getstressofdeviceid(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _healthModel = require('../../lib/models/health-model');

var _healthModel2 = _interopRequireDefault(_healthModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

;

;

;