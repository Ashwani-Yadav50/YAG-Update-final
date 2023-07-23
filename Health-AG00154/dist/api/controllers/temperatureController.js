'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getalltempbydeviceId = exports.getalltempbyusername = exports.deleteBP = exports.getTempByID = exports.createTemp = undefined;

let createTemp = exports.createTemp = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const reqbody = req.swagger.params.spo2body.value;
        try {
            const deserializeData = yield _tempSerializer2.default.deserialize(reqbody);
            deserializeData.map(function (v) {
                return v.username = req.swagger.params.username.value;
            });
            const tempResponse = yield _temperature2.default.createNew(deserializeData[0]);
            // Commented by Saurabh
            // var options = {
            //     'method': 'POST',
            //     'url': 'http://35.228.111.244:8011/temp',
            //     'headers': {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(tempResponse)
            // };
            // request(options, function (error, response) {
            //     if (error) throw new Error(error);
            //     console.log(response.body);
            // });

            res.status(201).send((yield _tempSerializer2.default.serialize(tempResponse)));
        } catch (err) {
            console.log(err);
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else {
                console.log(err);
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function createTemp(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let getTempByID = exports.getTempByID = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        try {
            console.log(req.swagger.params.username.value);
            const tempResponse = yield _temperature2.default.getByID(req.swagger.params.username.value);
            console.log(tempResponse);
            res.status(200).json((yield _tempSerializer2.default.serialize(tempResponse)));
        } catch (err) {
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else if (err.code) {
                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.duplicateIDFound);
                res.status(409).json(deserializeError);
            } else {
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function getTempByID(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let deleteBP = exports.deleteBP = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        console.log("Deleting BP by createdTs - " + req.swagger.params.createdTs.value + " By username - " + req.swagger.params.username.value);
        try {
            const username = req.swagger.params.username.value;
            const createdTs = req.swagger.params.createdTs.value;
            const deleteBpResponse = yield bp.deleteBp(username, createdTs);
            res.status(200).json(deleteBpResponse);
        } catch (err) {
            console.log(err);
            res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
        }
    });

    return function deleteBP(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

//get all data by username


let getalltempbyusername = exports.getalltempbyusername = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        console.log("Getting BPs by username - " + req.swagger.params.username.value);
        try {
            const accountByIdResponse = yield _temperature2.default.getallbyusername(req.swagger.params.username.value);
            res.status(200).json((yield _tempSerializer2.default.serialize(accountByIdResponse)));
        } catch (err) {
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else if (err.code) {
                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.duplicateIDFound);
                res.status(409).json(deserializeError);
            } else {
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function getalltempbyusername(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

let getalltempbydeviceId = exports.getalltempbydeviceId = (() => {
    var _ref5 = _asyncToGenerator(function* (req, res) {
        console.log("Getting BPs by username - " + req.swagger.params.deviceId.value);
        try {
            const accountByIdResponse = yield _temperature2.default.getallbydeviceId(req.swagger.params.deviceId.value);
            res.status(200).json((yield _tempSerializer2.default.serialize(accountByIdResponse)));
        } catch (err) {
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else if (err.code) {
                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.duplicateIDFound);
                res.status(409).json(deserializeError);
            } else {
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function getalltempbydeviceId(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
})();

var _temperature = require('../../lib/models/temperature');

var _temperature2 = _interopRequireDefault(_temperature);

var _tempSerializer = require('../../lib/serializers/tempSerializer');

var _tempSerializer2 = _interopRequireDefault(_tempSerializer);

var _errorsList = require('../../lib/errors/errorsList');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }