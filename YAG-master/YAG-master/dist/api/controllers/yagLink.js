'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LinkAcc = exports.Links = undefined;

let Links = exports.Links = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const key = req.swagger.params.linkObject.value;
        const name = req.swagger.params.username.value;
        const result = yield _accountModel2.default.Links(name, key);
        res.status(result.statusCode).send(result.body);
    });

    return function Links(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let LinkAcc = exports.LinkAcc = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const key = req.swagger.params.linkAccKey.value;
        const name = req.swagger.params.username.value;
        const result = yield _accountModel2.default.LinkAcc(name, key);
        res.status(result.statusCode).send(result.body);
    });

    return function LinkAcc(_x3, _x4) {
        return _ref2.apply(this, arguments);
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