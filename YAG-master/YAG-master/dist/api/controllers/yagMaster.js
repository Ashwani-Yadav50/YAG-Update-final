'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateMasterByID = exports.getAllMaster = exports.getMasterByID = exports.createMaster = undefined;

// YAG function to save the user's BP data

let createMaster = exports.createMaster = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const body = req.swagger.params.master.value;
        const result = yield _accountModel2.default.createMaster(body);
        res.status(result.statusCode).send(result.body);
    });

    return function createMaster(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let getMasterByID = exports.getMasterByID = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const result = yield _accountModel2.default.getMasterByID(username);
        res.status(result.statusCode).send(result.body);
    });

    return function getMasterByID(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let getAllMaster = exports.getAllMaster = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const result = yield _accountModel2.default.getAllMaster();
        res.status(result.statusCode).send(result.body);
    });

    return function getAllMaster(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

let updateMasterByID = exports.updateMasterByID = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const body = req.swagger.params.updateMaster.value;
        const result = yield _accountModel2.default.updateMasterByID(username, body);
        res.status(result.statusCode).send(result.body);
    });

    return function updateMasterByID(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _accountModel = require('../../lib/models/account-model');

var _accountModel2 = _interopRequireDefault(_accountModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

;

;