'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStressByDevice = exports.getStressByDate = exports.deleteStress = exports.getstressbyobjid = exports.getStressByID = exports.updatesymptomstress = exports.saveStress = undefined;

// YAG function to save the user's BP data

let saveStress = exports.saveStress = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const body = req.swagger.params.HealthDataDocument.value;
        const result = yield _stressModel2.default.save(body, username);
        res.status(result.statusCode).send(result.body);
    });

    return function saveStress(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let updatesymptomstress = exports.updatesymptomstress = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const id = req.swagger.params.stressid.value;
        const body = req.swagger.params.updatesym.value;
        const result = yield _stressModel2.default.updatesymptom(id, body);
        res.status(result.statusCode).send(result.body);
    });

    return function updatesymptomstress(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

// YAG function to fetch user's BP data

let getStressByID = exports.getStressByID = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const result = yield _stressModel2.default.getStress(username);
        res.status(result.statusCode).send(result.body);
    });

    return function getStressByID(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

let getstressbyobjid = exports.getstressbyobjid = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const id = req.swagger.params.stressid.value;
        const result = yield _stressModel2.default.getstressbyobjid(id);
        res.status(result.statusCode).send(result.body);
    });

    return function getstressbyobjid(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

let deleteStress = exports.deleteStress = (() => {
    var _ref5 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const createdTs = req.swagger.params.createdTs.value;
        const result = yield _stressModel2.default.deleteStress(username, createdTs);
        res.status(result.statusCode).send(result.body);
    });

    return function deleteStress(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
})();

let getStressByDate = exports.getStressByDate = (() => {
    var _ref6 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const start = req.swagger.params.start.value;
        const end = req.swagger.params.end.value;
        console.log(username, start, end);
        const result = yield _stressModel2.default.getStressByDate(username, start, end);
        res.status(result.statusCode).send(result.body);
        //res.status(200).send({"msg":true})
    });

    return function getStressByDate(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
})();

let getStressByDevice = exports.getStressByDevice = (() => {
    var _ref7 = _asyncToGenerator(function* (req, res) {
        const deviceId = req.swagger.params.deviceId.value;
        const start = req.swagger.params.start.value;
        const end = req.swagger.params.end.value;
        console.log(deviceId, start, end);
        const result = yield _stressModel2.default.getStressByDevice(deviceId, start, end);
        // res.status(result.statusCode).send(result.body)
        res.status(200).send({ "data": result });
    });

    return function getStressByDevice(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _stressModel = require('../../lib/models/stress-model');

var _stressModel2 = _interopRequireDefault(_stressModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

;;

;

;

;