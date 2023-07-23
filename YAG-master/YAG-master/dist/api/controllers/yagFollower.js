'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Delete = exports.Accept = exports.Add = exports.searchAll = undefined;

let searchAll = exports.searchAll = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const body = req.swagger.params.user.value;
        const result = yield _accountModel2.default.searchAll(body);
        res.status(result.statusCode).send(result.body);
    });

    return function searchAll(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let Add = exports.Add = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.user.value;
        const body = req.swagger.params.linkObject.value;
        const result = yield _accountModel2.default.Add(username, body);
        res.status(result.statusCode).send(result.body);
    });

    return function Add(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let Accept = exports.Accept = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.user.value;
        const body = req.swagger.params.linkObject.value;
        const result = yield _accountModel2.default.Accept(username, body);
        res.status(result.statusCode).send(result.body);
    });

    return function Accept(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

let Delete = exports.Delete = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const body = req.swagger.params.linkObject.value;
        const result = yield _accountModel2.default.Delete(username, body);
        res.status(result.statusCode).send(result.body);
    });

    return function Delete(_x7, _x8) {
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

;