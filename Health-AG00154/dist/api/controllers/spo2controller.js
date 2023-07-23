'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getallspo2bydeviceId = exports.getallspo2byusername = exports.deleteBP = exports.getSpo2ByID = exports.createspo2 = undefined;

let createspo2 = exports.createspo2 = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const reqbody = req.swagger.params.spo2body.value;
        try {
            const deserializeData = yield _spo2serializer2.default.deserialize(reqbody);
            deserializeData.map(function (v) {
                return v.username = req.swagger.params.username.value;
            });
            const spo2Response = yield _spo2.default.createNew(deserializeData[0]);
            // Commented By Saurabh
            // var options = {
            //     'method': 'POST',
            //     'url': 'http://35.228.111.244:8011/spo2',
            //     'headers': {
            //       'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(spo2Response)
            //   };
            //   request(options, function (error, response) {
            //     if (error) throw new Error(error);
            //     console.log(response.body);
            //   });
            res.status(201).send((yield _spo2serializer2.default.serialize(spo2Response)));
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

    return function createspo2(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let getSpo2ByID = exports.getSpo2ByID = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        try {
            console.log(req.swagger.params.username.value);
            const spo2Response = yield _spo2.default.getByID(req.swagger.params.username.value);
            res.status(200).json((yield _spo2serializer2.default.serialize(spo2Response)));
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

    return function getSpo2ByID(_x3, _x4) {
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


let getallspo2byusername = exports.getallspo2byusername = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        console.log("Getting BPs by username - " + req.swagger.params.username.value);
        try {
            const accountByIdResponse = yield _spo2.default.getallbyusername(req.swagger.params.username.value);
            res.status(200).json((yield _spo2serializer2.default.serialize(accountByIdResponse)));
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

    return function getallspo2byusername(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

let getallspo2bydeviceId = exports.getallspo2bydeviceId = (() => {
    var _ref5 = _asyncToGenerator(function* (req, res) {
        console.log("Getting BPs by username - " + req.swagger.params.deviceId.value);
        try {
            const accountByIdResponse = yield _spo2.default.getallbydeviceId(req.swagger.params.deviceId.value);
            res.status(200).json((yield _spo2serializer2.default.serialize(accountByIdResponse)));
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

    return function getallspo2bydeviceId(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
})();

var _spo = require('../../lib/models/spo02');

var _spo2 = _interopRequireDefault(_spo);

var _spo2serializer = require('../../lib/serializers/spo2serializer');

var _spo2serializer2 = _interopRequireDefault(_spo2serializer);

var _errorsList = require('../../lib/errors/errorsList');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }