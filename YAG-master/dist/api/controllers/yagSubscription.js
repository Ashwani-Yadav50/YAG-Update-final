'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.share = exports.updateMasterSubscriptionByID = exports.getMasterSubscriptionByID = exports.createMasterSubscriptionByID = exports.updateSubscriptionByID = exports.getSubscriptionByID = exports.createSubscriptionByID = undefined;

// YAG function to save the user's Subscription data

let createSubscriptionByID = exports.createSubscriptionByID = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const body = req.swagger.params.subscriptionDocument.value;
        const result = yield _subscriptionModel2.default.save(body);
        res.status(result.statusCode).send(result.body);
    });

    return function createSubscriptionByID(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let getSubscriptionByID = exports.getSubscriptionByID = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const result = yield _subscriptionModel2.default.getAccountByID(username);
        res.status(result.statusCode).send(result.body);
    });

    return function getSubscriptionByID(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let updateSubscriptionByID = exports.updateSubscriptionByID = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const body = req.swagger.params.subscriptionUpdateDocument.value;
        const result = yield _subscriptionModel2.default.update(username, body);
        res.status(result.statusCode).send(result.body);
    });

    return function updateSubscriptionByID(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

let createMasterSubscriptionByID = exports.createMasterSubscriptionByID = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const body = req.swagger.params.subscriptionDocument.value;
        const result = yield _subscriptionModel2.default.saveMaster(body);
        res.status(result.statusCode).send(result.body);
    });

    return function createMasterSubscriptionByID(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

let getMasterSubscriptionByID = exports.getMasterSubscriptionByID = (() => {
    var _ref5 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const result = yield _subscriptionModel2.default.getMasterAccountByID(username);
        res.status(result.statusCode).send(result.body);
    });

    return function getMasterSubscriptionByID(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
})();

let updateMasterSubscriptionByID = exports.updateMasterSubscriptionByID = (() => {
    var _ref6 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const body = req.swagger.params.updateSubscription.value;
        const result = yield _subscriptionModel2.default.updateMaster(username, body);
        res.status(result.statusCode).send(result.body);
    });

    return function updateMasterSubscriptionByID(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
})();

let share = exports.share = (() => {
    var _ref7 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const body = req.swagger.params.shareSub.value;
        const result = yield _subscriptionModel2.default.share(username, body);
        res.status(result.statusCode).send(result.body);
    });

    return function share(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _subscriptionModel = require('../../lib/models/subscription-model');

var _subscriptionModel2 = _interopRequireDefault(_subscriptionModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

;

;

;

;

;

;