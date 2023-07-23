'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tempalldevice = exports.tempall = exports.deleteBP = exports.getTempByID = exports.savetemp = undefined;

// YAG function to save the user's BP data

let savetemp = exports.savetemp = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const body = req.swagger.params.HealthDataDocument.value;
        const result = yield _tempModal2.default.save(body, username);
        res.status(result.statusCode).send(result.body);
    });

    return function savetemp(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

// YAG function to fetch user's BP data

let getTempByID = exports.getTempByID = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const result = yield _tempModal2.default.getTemp(username);
        res.status(result.statusCode).send(result.body);
    });

    return function getTempByID(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let deleteBP = exports.deleteBP = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const createdTs = req.swagger.params.createdTs.value;
        const result = yield _tempModal2.default.deleteBP(username, createdTs);
        res.status(result.statusCode).send(result.body);
    });

    return function deleteBP(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

let tempall = exports.tempall = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const result = yield _tempModal2.default.tempall(username);
        res.status(result.statusCode).send(result.body);
    });

    return function tempall(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

let tempalldevice = exports.tempalldevice = (() => {
    var _ref5 = _asyncToGenerator(function* (req, res) {
        const deviceId = req.swagger.params.deviceId.value;
        const result = yield _tempModal2.default.tempalldevice(deviceId);
        res.status(result.statusCode).send(result.body);
    });

    return function tempalldevice(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _tempModal = require('../../lib/models/temp-modal');

var _tempModal2 = _interopRequireDefault(_tempModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;;