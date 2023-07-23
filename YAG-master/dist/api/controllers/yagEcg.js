'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteECG = exports.getEcgByDevice = exports.getEcgByDate = exports.getEcgByDeviceIdPagination = exports.getEcgByID = exports.saveECGRaw = exports.updatesymptom = exports.getecgbyobjid = exports.saveECG = undefined;

// YAG function to save the user's BP data

let saveECG = exports.saveECG = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const authheader = req.swagger.params.Authorization.value;
        const body = req.swagger.params.HealthDataDocument.value;
        const result = yield _ecgModel2.default.saveECG(body, username, authheader);
        res.status(result.statusCode).send(result.body);
    });

    return function saveECG(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let getecgbyobjid = exports.getecgbyobjid = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const id = req.swagger.params.ecgid.value;
        const result = yield _ecgModel2.default.getecgbyobjid(id);
        res.status(result.statusCode).send(result.body);
    });

    return function getecgbyobjid(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let updatesymptom = exports.updatesymptom = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const id = req.swagger.params.ecgid.value;
        const body = req.swagger.params.updatesym.value;
        const result = yield _ecgModel2.default.updatesymptom(id, body);
        res.status(result.statusCode).send(result.body);
    });

    return function updatesymptom(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

let saveECGRaw = exports.saveECGRaw = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const body = req.swagger.params.HealthDataDocument.value;
        var temp = body.data[0];
        console.log(temp.attributes.isConverted);
        // console.log(body.data[0])
        let username = temp.attributes.username;
        let rawECG = {
            "username": temp.attributes.username,
            "hr": temp.attributes.hr,
            "pr": temp.attributes.pr,
            "qt": temp.attributes.qt,
            "qtc": temp.attributes.qtc,
            "qrs": temp.attributes.qrs,
            "lead1": temp.attributes.rawLead1,
            "lead2": temp.attributes.rawLead2,
            "v1": temp.attributes.rawV1,
            "v2": temp.attributes.rawV2,
            "v3": temp.attributes.rawV3,
            "v4": temp.attributes.rawV4,
            "v5": temp.attributes.rawV5,
            "v6": temp.attributes.rawV6,
            "longLead": temp.attributes.longLead,
            "batteryLevel": temp.attributes.batteryLevel,
            "deviceId": temp.attributes.deviceId,
            "leadCount": temp.attributes.leadCount,
            "lat": temp.attributes.lat,
            "long": temp.attributes.long,
            "pdfurl": temp.attributes.pdfurl,
            "createdTs": temp.attributes.createdTs,
            "symptoms": temp.attributes.symptoms,
            "firmwareVersion": temp.attributes.firmwareVersion,
            "appVersion": temp.attributes.appVersion,
            "phoneModel": temp.attributes.phoneModel,
            "osVersion": temp.attributes.osVersion
        };
        let isConverted = temp.attributes.isConverted === 0 ? false : true;

        console.log('is Converted = ' + isConverted);
        console.log(temp.attributes.rrInt);
        let convertedEcg = {
            "username": temp.attributes.username,
            "hr": temp.attributes.hr,
            "pr": temp.attributes.pr,
            "qt": temp.attributes.qt,
            "qtc": temp.attributes.qtc,
            "qrs": temp.attributes.qrs,
            "maxHr": temp.attributes.maxHr,
            "minHr": temp.attributes.minHr,
            "nn150": temp.attributes.nn150,
            "nn2k": temp.attributes.nn2k,
            "nn150arr": temp.attributes.nn150arr,
            "nn2karr": temp.attributes.nn2karr,
            "lead1": temp.attributes.convertedLead1,
            "lead2": temp.attributes.convertedLead2,
            "lead3": temp.attributes.convertedLead3,
            "v1": temp.attributes.convertedV1,
            "v2": temp.attributes.convertedV2,
            "v3": temp.attributes.convertedV3,
            "v4": temp.attributes.convertedV4,
            "v5": temp.attributes.convertedV5,
            "v6": temp.attributes.convertedV6,
            "avL": temp.attributes.convertedavL,
            "avF": temp.attributes.convertedavF,
            "avR": temp.attributes.convertedavR,
            "longLead": temp.attributes.longLead,
            "deviceId": temp.attributes.deviceId,
            "leadCount": temp.attributes.leadCount,
            "lat": temp.attributes.lat,
            "long": temp.attributes.long,
            "batteryLevel": temp.attributes.batteryLevel,
            "createdTs": temp.attributes.createdTs,
            "arrHr": temp.attributes.arrHr,
            "rrInterval": temp.attributes.rrInterval,
            "rrInt": temp.attributes.rrInt,
            "symptoms": temp.attributes.symptoms,
            "deviceType": temp.attributes.deviceType,
            "fullReport": temp.attributes.fullReport,
            "firmwareVersion": temp.attributes.firmwareVersion,
            "appVersion": temp.attributes.appVersion,
            "phoneModel": temp.attributes.phoneModel,
            "osVersion": temp.attributes.osVersion,
            "isConverted": isConverted,
            "isFromPython": true,
            "mcodeLeadavL": temp.attributes.mcodeLeadavL,
            "mcodeLeadavR": temp.attributes.mcodeLeadavR,
            "mcodeLeadavF": temp.attributes.mcodeLeadavF,
            "mcodeLead1": temp.attributes.mcodeLead1,
            "mcodeLead2": temp.attributes.mcodeLead2,
            "mcodeLead3": temp.attributes.mcodeLead3,
            "mcodeLeadv1": temp.attributes.mcodeLeadv1,
            "mcodeLeadv2": temp.attributes.mcodeLeadv2,
            "mcodeLeadv3": temp.attributes.mcodeLeadv3,
            "mcodeLeadv4": temp.attributes.mcodeLeadv4,
            "mcodeLeadv5": temp.attributes.mcodeLeadv5,
            "mcodeLeadv6": temp.attributes.mcodeLeadv6,
            "patientId": temp.attributes.patientId
        };
        let rawEcgData = {
            data: [{
                type: 'ecg',
                id: 'string',
                attributes: rawECG
            }],
            meta: {},
            include: {}
        };

        let ecgData = {
            data: [{
                type: 'ecg',
                id: 'string',
                attributes: convertedEcg
            }],
            meta: {},
            include: {}
        };
        console.log('raw ecg saving yag call');
        // console.log(rawEcgData.data[0]);
        // console.log(ecgData.data[0])
        const result = yield _ecgModel2.default.saveECG(ecgData, username);
        const resultraw = yield _ecgModel2.default.saveRawECG(rawEcgData, username);
        // res.status(200).json({ "data":"result"})
        // console.log(result)
        res.status(result.statusCode).json({ "data": result });
    });

    return function saveECGRaw(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

let getEcgByID = exports.getEcgByID = (() => {
    var _ref5 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const result = yield _ecgModel2.default.getECG(username);
        res.status(result.statusCode).send(result.body);
    });

    return function getEcgByID(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
})();

let getEcgByDeviceIdPagination = exports.getEcgByDeviceIdPagination = (() => {
    var _ref6 = _asyncToGenerator(function* (req, res) {
        console.log('pagination');
        const deviceId = req.swagger.params.deviceId.value;
        const index = req.swagger.params.index.value;
        console.log("yag controller " + deviceId, index);
        const result = yield _ecgModel2.default.getEcgByDeviceIdPagination(deviceId, index);
        // res.status(result.statusCode).send(result.body)
        res.status(200).send({ "msg": true });
    });

    return function getEcgByDeviceIdPagination(_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
})();

let getEcgByDate = exports.getEcgByDate = (() => {
    var _ref7 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const start = req.swagger.params.start.value;
        const end = req.swagger.params.end.value;
        console.log(username, start, end);
        const result = yield _ecgModel2.default.getEcgByDate(username, start, end);
        res.status(result.statusCode).send(result.body);
        //res.status(200).send({"msg":true})
    });

    return function getEcgByDate(_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
})();

let getEcgByDevice = exports.getEcgByDevice = (() => {
    var _ref8 = _asyncToGenerator(function* (req, res) {
        const deviceId = req.swagger.params.deviceId.value;
        const start = req.swagger.params.start.value;
        const end = req.swagger.params.end.value;
        console.log(deviceId, start, end);
        const result = yield _ecgModel2.default.getEcgByDevice(deviceId, start, end);
        // res.status(result.statusCode).send(result.body)
        res.status(200).send({ "data": result });
    });

    return function getEcgByDevice(_x15, _x16) {
        return _ref8.apply(this, arguments);
    };
})();

let deleteECG = exports.deleteECG = (() => {
    var _ref9 = _asyncToGenerator(function* (req, res) {
        const username = req.swagger.params.username.value;
        const createdTs = req.swagger.params.createdTs.value;
        const result = yield _ecgModel2.default.deleteECG(username, createdTs);
        res.status(result.statusCode).send(result.body);
    });

    return function deleteECG(_x17, _x18) {
        return _ref9.apply(this, arguments);
    };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _ecgModel = require('../../lib/models/ecg-model');

var _ecgModel2 = _interopRequireDefault(_ecgModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

;

;

;

;

;

;

;