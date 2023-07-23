'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteSugar = exports.getSugarByID = exports.saveSugar = undefined;

// YAG function to save the user's BP data

let saveSugar = exports.saveSugar = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const body = req.swagger.params.HealthDataDocument.value;
        const result = yield _sugarModel2.default.save(body, username);
        res.status(result.statusCode).send(result.body);
    });

    return function saveSugar(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

// YAG function to fetch user's BP data


let getSugarByID = exports.getSugarByID = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const result = yield _sugarModel2.default.getSugar(username);
        res.status(result.statusCode).send(result.body);
    });

    return function getSugarByID(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let deleteSugar = exports.deleteSugar = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const createdTs = req.swagger.params.createdTs.value;
        const result = yield _sugarModel2.default.deleteSugar(username, createdTs);
        res.status(result.statusCode).send(result.body);
    });

    return function deleteSugar(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _sugarModel = require('../../lib/models/sugar-model');

var _sugarModel2 = _interopRequireDefault(_sugarModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;;