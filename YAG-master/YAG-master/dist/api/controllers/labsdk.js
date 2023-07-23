'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reportissue = exports.fetchReport = exports.fetchBlob = exports.deleteBlob = exports.uploadpdf = undefined;

let uploadpdf = exports.uploadpdf = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const file = req.swagger.params.ecgpdf.value;
        const deviceId = req.swagger.params.deviceId.value;
        const patientId = req.swagger.params.patientId.value;
        const labusername = req.swagger.params.labusername.value;
        console.log(file);
        let filePath = __dirname + '/' + file.originalname;
        console.log(filePath);
        _fs2.default.writeFileSync(filePath, file.buffer);
        let result = yield _labsdk2.default.uploadpdf(filePath, file.originalname, deviceId, patientId, labusername);
        _fs2.default.unlinkSync(filePath);
        res.status(result.statusCode).send(result.body);
    });

    return function uploadpdf(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let deleteBlob = exports.deleteBlob = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        const blobUrl = req.swagger.params.blobUrl.value;
        const result = yield _labsdk2.default.deleteBlob(blobUrl);
        res.status(result.statusCode).send(result.body);
    });

    return function deleteBlob(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})();

let fetchBlob = exports.fetchBlob = (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
        const deviceId = req.swagger.params.deviceId.value;
        const patientId = req.swagger.params.patientId.value;
        const result = yield _labsdk2.default.fetchBlob(deviceId, patientId);
        res.status(result.statusCode).send(result.body);
    });

    return function fetchBlob(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
})();

let fetchReport = exports.fetchReport = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const deviceId = req.swagger.params.deviceId.value;
        const labusername = req.swagger.params.labusername.value;
        const result = yield _labsdk2.default.fetchReport(deviceId, labusername);
        res.status(result.statusCode).send(result.body);
    });

    return function fetchReport(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
})();

let reportissue = exports.reportissue = (() => {
    var _ref5 = _asyncToGenerator(function* (req, res) {
        const file = req.swagger.params.pdf.value;
        const deviceId = req.swagger.params.deviceId.value;
        const username = req.swagger.params.username.value;
        const reportType = req.swagger.params.reportType.value;
        const reportid = req.swagger.params.reportid.value;
        const firmwareVersion = req.swagger.params.firmwareVersion.value;
        const appVersion = req.swagger.params.appVersion.value;
        const phoneModel = req.swagger.params.phoneModel.value;
        const osVersion = req.swagger.params.osVersion.value;
        const createdTs = req.swagger.params.createdTs.value;
        const comment = req.swagger.params.comment.value;
        console.log(file, deviceId, username, reportType);
        if (file) {
            let filePath = __dirname + '/' + file.originalname;
            console.log(filePath);
            _fs2.default.writeFileSync(filePath, file.buffer);
            let result = yield _labsdk2.default.reportissue(filePath, file.originalname, deviceId, username, reportType, reportid, firmwareVersion, appVersion, phoneModel, osVersion, createdTs, comment);
            _fs2.default.unlinkSync(filePath);
            res.status(result.statusCode).send(result.body);
        } else {
            let result = yield _labsdk2.default.reportissue(null, null, deviceId, username, reportType, reportid, firmwareVersion, appVersion, phoneModel, osVersion, createdTs, comment);
            res.status(result.statusCode).send(result.body);
        }
    });

    return function reportissue(_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
})();

var _labsdk = require('../../lib/models/labsdk');

var _labsdk2 = _interopRequireDefault(_labsdk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;

;