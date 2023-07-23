'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reportissue = exports.fetchreport = exports.fetchBlob = exports.deleteBlob = exports.uploadpdf = undefined;

let uploadpdf = exports.uploadpdf = (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
        const file = req.swagger.params.ecgpdf.value;
        const deviceId = req.swagger.params.deviceId.value;
        const patientId = req.swagger.params.patientId.value;
        const labusername = req.swagger.params.labusername.value;
        try {
            let patient = yield _sdklab2.default.findPatientId(patientId);
            if (labusername === "healthians") {
                if (patient.length > 0) {
                    console.log(file, deviceId, patientId, labusername);
                    console.log('Duplicate');
                    res.status(200).send(patient[0]);
                } else {
                    let filePath = __dirname + '/' + file.originalname;
                    fs.writeFileSync(filePath, file.buffer);
                    uploadToAzure(filePath, deviceId, patientId, (() => {
                        var _ref2 = _asyncToGenerator(function* (url) {
                            console.log(url);
                            let obj = {
                                username: labusername,
                                pdfUrl: url,
                                createdTs: new Date().toISOString(),
                                deviceId: deviceId,
                                patientId: patientId
                            };
                            sendToLiveHealth(obj);
                            const deserializeData = yield _sdklab2.default.create(obj);
                            res.status(200).send(deserializeData);
                        });

                        return function (_x3) {
                            return _ref2.apply(this, arguments);
                        };
                    })());
                }
            } else {
                let filePath = __dirname + '/' + file.originalname;
                fs.writeFileSync(filePath, file.buffer);
                uploadToAzure(filePath, deviceId, patientId, (() => {
                    var _ref3 = _asyncToGenerator(function* (url) {
                        console.log(url);
                        let obj = {
                            username: labusername,
                            pdfUrl: url,
                            createdTs: new Date().toISOString(),
                            deviceId: deviceId,
                            patientId: patientId
                        };
                        sendToLiveHealth(obj);
                        const deserializeData = yield _sdklab2.default.create(obj);
                        res.status(200).send(deserializeData);
                    });

                    return function (_x4) {
                        return _ref3.apply(this, arguments);
                    };
                })());
            }
        } catch (err) {
            console.log(err);
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else if (err.NoContent) {
                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.noContentFound);
                res.status(204).json(deserializeError);
            } else if (err.code) {
                const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
                res.status(409).json(deserializeError);
            } else {
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function uploadpdf(_x, _x2) {
        return _ref.apply(this, arguments);
    };
})();

let deleteBlob = exports.deleteBlob = (() => {
    var _ref4 = _asyncToGenerator(function* (req, res) {
        const blobUrl = req.swagger.params.blobUrl.value;
        try {
            console.log(blobUrl);
            deleteBlobUrl(blobUrl.blobUrl);
            const deserializeData = yield _sdklab2.default.changeIsDelete(blobUrl.blobUrl);
            res.status(200).send(deserializeData);
        } catch (err) {
            console.log(err);
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else if (err.NoContent) {
                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.noContentFound);
                res.status(204).json(deserializeError);
            } else if (err.code) {
                const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
                res.status(409).json(deserializeError);
            } else {
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function deleteBlob(_x5, _x6) {
        return _ref4.apply(this, arguments);
    };
})();

let fetchBlob = exports.fetchBlob = (() => {
    var _ref5 = _asyncToGenerator(function* (req, res) {
        const deviceId = req.swagger.params.deviceId.value;
        const patientId = req.swagger.params.patientId.value;
        try {
            let containerName = deviceId + '-' + patientId;
            fetchblobs(deviceId, patientId, function (data) {
                let pdfList = [];
                data.entries.map(function (item) {
                    pdfList.push("https://sdklab.blob.core.windows.net/" + containerName + "/" + item.name);
                });
                return res.json({ data: pdfList });
            });
        } catch (err) {
            console.log(err);
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else if (err.NoContent) {
                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.noContentFound);
                res.status(204).json(deserializeError);
            } else if (err.code) {
                const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
                res.status(409).json(deserializeError);
            } else {
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function fetchBlob(_x7, _x8) {
        return _ref5.apply(this, arguments);
    };
})();

let fetchreport = exports.fetchreport = (() => {
    var _ref6 = _asyncToGenerator(function* (req, res) {
        const deviceId = req.swagger.params.deviceId.value;
        const labusername = req.swagger.params.labusername.value;
        try {
            const deserializeData = yield _sdklab2.default.findreportlab(labusername, deviceId);
            res.status(200).json({ data: deserializeData });
        } catch (err) {
            console.log(err);
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else if (err.NoContent) {
                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.noContentFound);
                res.status(204).json(deserializeError);
            } else if (err.code) {
                const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
                res.status(409).json(deserializeError);
            } else {
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function fetchreport(_x9, _x10) {
        return _ref6.apply(this, arguments);
    };
})();

let reportissue = exports.reportissue = (() => {
    var _ref7 = _asyncToGenerator(function* (req, res) {
        const file = req.swagger.params.pdf.value;
        const deviceId = req.swagger.params.deviceId.value;
        const reportType = req.swagger.params.reportType.value;
        const username = req.swagger.params.username.value;
        const reportid = req.swagger.params.reportid.value;
        const firmwareVersion = req.swagger.params.firmwareVersion.value;
        const appVersion = req.swagger.params.appVersion.value;
        const phoneModel = req.swagger.params.phoneModel.value;
        const osVersion = req.swagger.params.osVersion.value;
        const createdTs = req.swagger.params.createdTs.value;
        const comment = req.swagger.params.comment.value;
        console.log(file, deviceId, reportType, reportid, username, firmwareVersion, appVersion, phoneModel, osVersion, createdTs, comment);
        try {
            if (file) {
                let filePath = __dirname + '/' + file.originalname;
                fs.writeFileSync(filePath, file.buffer);
                uploadToAzure(filePath, deviceId, reportid, (() => {
                    var _ref8 = _asyncToGenerator(function* (url) {
                        console.log(url);
                        let obj = {
                            username: username,
                            pdfUrl: url,
                            createdTs: new Date().toISOString(),
                            deviceId: deviceId,
                            reportType: reportType,
                            reportid: reportid,
                            firmwareVersion: firmwareVersion,
                            appVersion: appVersion,
                            phoneModel: phoneModel,
                            osVersion: osVersion,
                            comment: comment
                        };
                        const deserializeData = yield _reportIssue2.default.create(obj);
                        res.status(200).json({ data: deserializeData });
                    });

                    return function (_x13) {
                        return _ref8.apply(this, arguments);
                    };
                })());
            } else {
                let obj = {
                    username: username,
                    createdTs: new Date().toISOString(),
                    deviceId: deviceId,
                    reportType: reportType,
                    reportid: reportid,
                    firmwareVersion: firmwareVersion,
                    appVersion: appVersion,
                    phoneModel: phoneModel,
                    osVersion: osVersion,
                    comment: comment
                };
                const deserializeData = yield _reportIssue2.default.create(obj);
                res.status(200).json({ data: deserializeData });
            }
        } catch (err) {
            console.log(err);
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else if (err.NoContent) {
                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.noContentFound);
                res.status(204).json(deserializeError);
            } else if (err.code) {
                const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
                res.status(409).json(deserializeError);
            } else {
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function reportissue(_x11, _x12) {
        return _ref7.apply(this, arguments);
    };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _sdklab = require('../../lib/models/sdklab');

var _sdklab2 = _interopRequireDefault(_sdklab);

var _reportIssue = require('../../lib/models/reportIssue');

var _reportIssue2 = _interopRequireDefault(_reportIssue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const path = require('path');
const storage = require('azure-storage');
const fs = require('fs');

var request = require("request");

const blobService = storage.createBlobService('DefaultEndpointsProtocol=https;AccountName=sdklab;AccountKey=DHB1HVTMOqegTnYQ/479JpxZFs8SLlGpzodfOGb++QbeRETw94iYEu/ZiBaSKqKQ7/9+SjWxPz+/S5sP+36o8A==;EndpointSuffix=core.windows.net');

function uploadToAzure(filePath, deviceId, patientId, cb) {
    const fullPath = path.resolve(filePath);
    const blobName = path.basename(filePath);
    console.log(fullPath, blobName);
    blobService.createContainerIfNotExists(deviceId + '-' + patientId, { publicAccessLevel: 'blob' }, err => {
        if (err) {
            reject(err);
        } else {
            blobService.createBlockBlobFromLocalFile(deviceId + '-' + patientId, blobName, fullPath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(data);
                    fs.unlinkSync(fullPath);
                    cb("https://sdklab.blob.core.windows.net/" + data.container + "/" + data.name);
                }
            });
        }
    });
}

function deleteBlobUrl(blobUrl) {
    console.log(blobUrl.split('/'));
    let containerName = blobUrl.split('/')[3];
    let blobName = blobUrl.split('/')[4];
    blobService.deleteBlobIfExists(containerName, blobName, {}, (err, data) => {
        if (err) {
            return err;
        } else {
            console.log(data);
            return data;
        }
    });
}

function fetchblobs(deviceId, patientId, cb) {
    blobService.listBlobsSegmented(deviceId + '-' + patientId, null, (err, data) => {
        if (err) {
            return err;
        } else {
            console.log(data);
            cb(data);
        }
    });
}

function sendToLiveHealth(obj) {
    var options = {
        method: 'POST',
        url: 'http://35.231.219.186:7005/lab/sendtolivehealth',
        // url: 'http://localhost:7005/lab/sendtolivehealth',
        headers: {
            'Content-Type': 'application/json'
        },
        body: obj,
        json: true
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        console.log(body);
    });
    return true;
}