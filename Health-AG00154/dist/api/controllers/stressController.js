'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.getStressByDeviceId = exports.deleteStress = exports.updateByID = exports.getStressBystressid = exports.getStressByID = exports.getStressByDevice = exports.getStressByDate = exports.getHealthByID = exports.getallstress = exports.updatesymptomstress = exports.createstress = undefined;

let createstress = exports.createstress = (() => {
        var _ref = _asyncToGenerator(function* (req, res) {
                console.log('Data Entry - Stress , username - ' + req.swagger.params.username.value);
                const reqbody = req.swagger.params.stressBody.value;
                console.log(reqbody);
                try {
                        let stressResponse = {};
                        const deserializeData = yield _stressSerializer2.default.deserialize(reqbody);
                        console.log(deserializeData);
                        deserializeData.map(function (v) {
                                return v.username = req.swagger.params.username.value;
                        });
                        if (deserializeData[0].id === "0" || deserializeData[0].id === "string" || deserializeData[0].id === "String") {
                                console.log('if else 1st for new');
                                var options = {
                                        method: 'GET',
                                        url: 'http://35.231.219.186:7005/wallet/addtransaction/stress/' + deserializeData[0].deviceId,
                                        // url: 'http://localhost:7005/wallet/addtransaction/stress/' + deserializeData[0].deviceId,
                                        headers: {
                                                'Postman-Token': 'aa74fda4-e9cf-48cf-aab9-e05f12000959',
                                                'cache-control': 'no-cache'
                                        }
                                };
                                (0, _request2.default)(options, (() => {
                                        var _ref2 = _asyncToGenerator(function* (error, response, body) {
                                                if (error) throw new Error(error);
                                                console.log('on to wallet');
                                                console.log(response.statusCode);
                                                if (response.statusCode === 200) {
                                                        stressResponse = yield _stress2.default.createNew(deserializeData[0]);
                                                        let isReport = stressResponse;
                                                        body = JSON.parse(body);
                                                        // console.log(body)
                                                        stressResponse.usageCount = body.data.usageCount;
                                                        stressResponse.reviewCount = body.data.reviewCount;
                                                        stressResponse.lastRecharge = body.data.lastRecharge;
                                                        //posting label start
                                                        var options = {
                                                                method: 'GET',
                                                                // url: 'http://localhost:1339/label/create/' + stressResponse._id + '/stress/' + stressResponse.username,
                                                                url: 'http://35.231.83.234:1339/label/create/' + stressResponse._id + '/stress/' + stressResponse.username,
                                                                headers: {
                                                                        'Postman-Token': '52970832-761e-4461-b0e7-a810fe377f7f',
                                                                        'cache-control': 'no-cache'
                                                                }
                                                        };
                                                        (0, _request2.default)(options, function (error, response, body) {
                                                                if (error) {
                                                                        console.log(error);
                                                                }
                                                                console.log('Posted Label');
                                                        });
                                                        //posting label end
                                                        // http://35.244.48.66:8003/ecg
                                                        // let monitorOptions = {
                                                        //         'method': 'POST',
                                                        //         'url': 'http://35.228.111.244:8011/stress',
                                                        //         'headers': {
                                                        //                 'Content-Type': 'application/json'
                                                        //         },
                                                        //         body: JSON.stringify(isReport)
                                                        // };
                                                        // Added by Saurabh
                                                        let monitorOptions = {
                                                                'method': 'POST',
                                                                'url': 'http://35.244.48.66:8003/stress',
                                                                'headers': {
                                                                        'Content-Type': 'application/json'
                                                                },
                                                                body: JSON.stringify(isReport)
                                                        };

                                                        (0, _request2.default)(monitorOptions, function (error, response) {
                                                                if (error) throw new Error(error);
                                                                console.log(response.body);
                                                        });
                                                        res.status(201).send((yield _stressSerializer2.default.serialize(stressResponse)));
                                                } else if (response.statusCode === 404) {
                                                        res.status(404).json({
                                                                "msg": "wallet does not exist"
                                                        });
                                                } else {
                                                        res.status(429).json({
                                                                "msg": "Limit Exceeded"
                                                        });
                                                }
                                        });

                                        return function (_x3, _x4, _x5) {
                                                return _ref2.apply(this, arguments);
                                        };
                                })());
                        } else {
                                stressResponse = yield _stress2.default.updateStress(deserializeData[0].id, deserializeData[0]);
                        }
                } catch (err) {
                        if (err.statusCode) {
                                res.status(err.statusCode).json(err.error);
                        } else {
                                console.log(err);
                                res.status(500).json(_errorsList.errorsList.accountServiceError);
                        }
                }
        });

        return function createstress(_x, _x2) {
                return _ref.apply(this, arguments);
        };
})();

let updatesymptomstress = exports.updatesymptomstress = (() => {
        var _ref3 = _asyncToGenerator(function* (req, res) {
                const objid = req.swagger.params.stressid.value;
                const symbody = req.swagger.params.symbody.value;
                console.log(objid, symbody);
                try {
                        const accountByIdResponse = yield _stress2.default.updatesymptom(objid, symbody);
                        res.status(200).json((yield _stressSerializer2.default.serialize(accountByIdResponse)));
                } catch (err) {
                        console.log(err);
                        res.status(404).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function updatesymptomstress(_x6, _x7) {
                return _ref3.apply(this, arguments);
        };
})();

let getallstress = exports.getallstress = (() => {
        var _ref4 = _asyncToGenerator(function* (req, res) {
                console.log("Getting all Stress");
                try {
                        const stressResponse = yield _stress2.default.getAll();
                        res.status(200).json((yield _stressSerializer2.default.serialize(stressResponse)));
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function getallstress(_x8, _x9) {
                return _ref4.apply(this, arguments);
        };
})();

let getHealthByID = exports.getHealthByID = (() => {
        var _ref5 = _asyncToGenerator(function* (req, res) {
                console.log("Getting All Stress by username - " + req.swagger.params.username.value);
                try {
                        const accountByIdResponse = yield _stress2.default.getByID(req.swagger.params.username.value);
                        res.status(200).json((yield _stressSerializer2.default.serialize(accountByIdResponse)));
                } catch (err) {
                        console.log(err);
                        if (err.statusCode) {
                                res.status(err.statusCode).json(err.error);
                        } else if (err.code) {
                                const deserializeError = yield _stressSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
                                res.status(409).json(deserializeError);
                        } else {
                                res.status(500).json(_errorsList.errorsList.accountServiceError);
                        }
                }
        });

        return function getHealthByID(_x10, _x11) {
                return _ref5.apply(this, arguments);
        };
})();

let getStressByDate = exports.getStressByDate = (() => {
        var _ref6 = _asyncToGenerator(function* (req, res) {
                console.log("Getting all stress");
                let username = req.swagger.params.username.value;
                let startDate = req.swagger.params.start.value;
                let endDate = req.swagger.params.end.value;
                startDate = new Date(startDate);
                startDate.setUTCHours(0, 0, 0);
                endDate = new Date(endDate);
                endDate.setUTCHours(23, 59, 59);
                console.log(username, startDate, endDate);
                try {
                        const allStressResponse = yield _stress2.default.getStressByDate(username, startDate, endDate);
                        res.status(200).json((yield _stressSerializer2.default.serialize(allStressResponse)));
                        //res.status(200).json({"msg":true})
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function getStressByDate(_x12, _x13) {
                return _ref6.apply(this, arguments);
        };
})();

let getStressByDevice = exports.getStressByDevice = (() => {
        var _ref7 = _asyncToGenerator(function* (req, res) {
                console.log("Getting all stress");
                let deviceId = req.swagger.params.deviceId.value;
                let startDate = req.swagger.params.start.value;
                let endDate = req.swagger.params.end.value;
                startDate = new Date(startDate);
                startDate.setUTCHours(0, 0, 0);
                endDate = new Date(endDate);
                endDate.setUTCHours(23, 59, 59);
                console.log(deviceId, startDate, endDate);
                try {
                        const allStressResponse = yield _stress2.default.getStressByDevice(deviceId, startDate, endDate);
                        // res.status(200).json(await stressSerializer.serialize(allStressResponse))
                        res.status(200).json({
                                "count": allStressResponse
                        });
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function getStressByDevice(_x14, _x15) {
                return _ref7.apply(this, arguments);
        };
})();

let getStressByID = exports.getStressByID = (() => {
        var _ref8 = _asyncToGenerator(function* (req, res) {
                console.log("Getting All Stress by username - " + req.swagger.params.username.value);
                try {
                        const accountByIdResponse = yield _stress2.default.getByID(req.swagger.params.username.value);
                        res.status(200).json((yield _stressSerializer2.default.serialize(accountByIdResponse)));
                } catch (err) {
                        console.log(err);
                        if (err.statusCode) {
                                res.status(err.statusCode).json(err.error);
                        } else if (err.code) {
                                const deserializeError = yield _stressSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
                                res.status(409).json(deserializeError);
                        } else {
                                res.status(500).json(_errorsList.errorsList.accountServiceError);
                        }
                }
        });

        return function getStressByID(_x16, _x17) {
                return _ref8.apply(this, arguments);
        };
})();

let getStressBystressid = exports.getStressBystressid = (() => {
        var _ref9 = _asyncToGenerator(function* (req, res) {
                const objid = req.swagger.params.stressid.value;
                console.log(objid);
                try {
                        const accountByIdResponse = yield _stress2.default.getStressBystressid(objid);
                        res.status(200).json((yield _stressSerializer2.default.serialize(accountByIdResponse)));
                } catch (err) {
                        console.log(err);
                        if (err.statusCode) {
                                res.status(err.statusCode).json(err.error);
                        } else if (err.code) {
                                const deserializeError = yield _stressSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
                                res.status(409).json(deserializeError);
                        } else {
                                res.status(500).json(_errorsList.errorsList.accountServiceError);
                        }
                }
        });

        return function getStressBystressid(_x18, _x19) {
                return _ref9.apply(this, arguments);
        };
})();

let updateByID = exports.updateByID = (() => {
        var _ref10 = _asyncToGenerator(function* (req, res) {
                const reqbody = req.swagger.params.updateAccount.value;
                try {
                        const deserializeData = yield accountSerializer.deserialize(reqbody);
                        const accountUpdateResponse = yield account.updateByID(deserializeData, req.swagger.params.username.value);
                        res.status(200).json((yield accountSerializer.serialize(accountUpdateResponse)));
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function updateByID(_x20, _x21) {
                return _ref10.apply(this, arguments);
        };
})();

let deleteStress = exports.deleteStress = (() => {
        var _ref11 = _asyncToGenerator(function* (req, res) {
                console.log("Deleting Stress by createdTs - " + req.swagger.params.createdTs.value + " By username - " + req.swagger.params.username.value);
                try {
                        const username = req.swagger.params.username.value;
                        const createdTs = req.swagger.params.createdTs.value;
                        const deleteStressResponse = yield _stress2.default.deleteStress(username, createdTs);
                        res.status(200).json({
                                deleteStressResponse: deleteStressResponse
                        });
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function deleteStress(_x22, _x23) {
                return _ref11.apply(this, arguments);
        };
})();

let getStressByDeviceId = exports.getStressByDeviceId = (() => {
        var _ref12 = _asyncToGenerator(function* (req, res) {
                const objid = req.swagger.params.deviceId.value;
                try {
                        const accountByIdResponse = yield _stress2.default.getStressByDeviceId(objid);
                        res.status(200).json((yield _stressSerializer2.default.serialize(accountByIdResponse)));
                } catch (err) {
                        console.log(err);
                        res.status(404).json({
                                "msg": "No ecg found"
                        });
                }
        });

        return function getStressByDeviceId(_x24, _x25) {
                return _ref12.apply(this, arguments);
        };
})();

var _stress = require('../../lib/models/stress');

var _stress2 = _interopRequireDefault(_stress);

var _stressSerializer = require('../../lib/serializers/stressSerializer');

var _stressSerializer2 = _interopRequireDefault(_stressSerializer);

var _errorsList = require('../../lib/errors/errorsList');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }