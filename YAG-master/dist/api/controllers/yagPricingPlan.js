'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMaster = exports.createMasterPlan = exports.getpricingPlan = exports.createplan = undefined;

// YAG function to fetch user's health data

let createplan = exports.createplan = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const body = req.swagger.params.pricingplan.value;
        const result = yield _pricingPlanModel2.default.save(body);
        res.status(result.statusCode).send(result.body);
    });

    return function createplan(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let getpricingPlan = exports.getpricingPlan = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const result = yield _pricingPlanModel2.default.getPlans();
        res.status(result.statusCode).send(result.body);
    });

    return function getpricingPlan(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let createMasterPlan = exports.createMasterPlan = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const body = req.swagger.params.pricingplan.value;
        const result = yield _pricingPlanModel2.default.saveMaster(body);
        res.status(result.statusCode).send(result.body);
    });

    return function createMasterPlan(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

let getMaster = exports.getMaster = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const result = yield _pricingPlanModel2.default.getMasterPlans();
        res.status(result.statusCode).send(result.body);
    });

    return function getMaster(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _pricingPlanModel = require('../../lib/models/pricingPlan-model');

var _pricingPlanModel2 = _interopRequireDefault(_pricingPlanModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

;

;

;