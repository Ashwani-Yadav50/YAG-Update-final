'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.getEcgsByDeviceId = exports.getEcgByUsernamePagination = exports.deleteECG = exports.updatesymptom = exports.getEcgByecgid = exports.updateByID = exports.getEcgByID = exports.getHealthByID = exports.getEcgByDeviceIdPagination = exports.getEcgByDevice = exports.getEcgByDate = exports.getallecg = exports.createEcg = undefined;

let createEcg = exports.createEcg = (() => {
        var _ref = _asyncToGenerator(function* (req, res) {
                console.log(' health Data Entry - ECG , username - ' + req.swagger.params.username.value);
                const reqbody = req.swagger.params.ecgBody.value;
                try {
                        let ecgResponse = {};
                        console.log(ecgResponse);
                        const deserializeData = yield _ecgSerializer2.default.deserialize(reqbody);
                        console.log(deserializeData);
                        deserializeData.map(function (v) {
                                return v.username = req.swagger.params.username.value;
                        });
                        // res.send('200')
                        if (deserializeData[0].id === "0" || deserializeData[0].id === "string" || deserializeData[0].id === "String") {
                                console.log(deserializeData[0].isConverted);
                                if (deserializeData[0].isFromPython) {
                                        if (deserializeData[0].isConverted === false) {
                                                console.log('running isconverted = 0');
                                                res.status(400).json({
                                                        msg: "Ecg not Saved on server"
                                                });
                                        } else {
                                                console.log('everything is good');
                                                var options = {
                                                        method: 'GET',
                                                        url: 'http://35.231.219.186:7005/wallet/addtransaction/ecg/' + deserializeData[0].deviceId,
                                                        // url: 'http://localhost:7005/wallet/addtransaction/ecg/' + deserializeData[0].deviceId,
                                                        headers: {
                                                                'Postman-Token': 'aa74fda4-e9cf-48cf-aab9-e05f12000959',
                                                                'cache-control': 'no-cache'
                                                        }
                                                };
                                                (0, _request2.default)(options, (() => {
                                                        var _ref2 = _asyncToGenerator(function* (error, response, body) {
                                                                console.log('right here');
                                                                if (error) throw new Error(error);
                                                                console.log(response.statusCode);
                                                                if (response.statusCode === 200) {
                                                                        ecgResponse = yield _ecg2.default.createNew(deserializeData[0]);
                                                                        let toRecord = ecgResponse;
                                                                        body = JSON.parse(body);
                                                                        ecgResponse.usageCount = body.data.usageCount;
                                                                        ecgResponse.reviewCount = body.data.reviewCount;
                                                                        ecgResponse.lastRecharge = body.data.lastRecharge;
                                                                        //posting label start
                                                                        var option = {
                                                                                method: 'GET',
                                                                                // url: 'http://localhost:1339/label/create/' + ecgResponse._id + '/ecg/'+ecgResponse.username,
                                                                                url: 'http://35.231.83.234:1339/label/create/' + ecgResponse._id + '/ecg/' + ecgResponse.username,
                                                                                headers: {
                                                                                        'Postman-Token': '52970832-761e-4461-b0e7-a810fe377f7f',
                                                                                        'cache-control': 'no-cache'
                                                                                }
                                                                        };
                                                                        (0, _request2.default)(option, function (error, response, body) {
                                                                                if (error) {
                                                                                        console.log(error);
                                                                                }
                                                                                console.log('Posted Label');
                                                                        });
                                                                        //posting label end
                                                                        // res.send(toRecord)
                                                                        // var options = {
                                                                        //         'method': 'POST',
                                                                        //         'url': 'http://35.228.111.244:8011/ecg',
                                                                        //         'headers': {
                                                                        //                 'Content-Type': 'application/json'
                                                                        //         },
                                                                        //         body: JSON.stringify(toRecord)
                                                                        // };

                                                                        var options = {
                                                                                'method': 'POST',
                                                                                'url': 'http://35.244.48.66:8003/ecg',
                                                                                'headers': {
                                                                                        'Content-Type': 'application/json'
                                                                                },
                                                                                body: JSON.stringify(toRecord)
                                                                        };

                                                                        (0, _request2.default)(options, function (error, response) {
                                                                                if (error) throw new Error(error);
                                                                                console.log(response.body);
                                                                        });
                                                                        res.status(201).send((yield _ecgSerializer2.default.serialize(ecgResponse)));
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
                                        }
                                } else {
                                        console.log('everything is good isConverted = ' + deserializeData[0].isConverted);
                                        var options = {
                                                method: 'GET',
                                                url: 'http://35.231.219.186:7005/wallet/addtransaction/ecg/' + deserializeData[0].deviceId,
                                                // url: 'http://localhost:7005/wallet/addtransaction/ecg/' + deserializeData[0].deviceId,
                                                headers: {
                                                        'Postman-Token': 'aa74fda4-e9cf-48cf-aab9-e05f12000959',
                                                        'cache-control': 'no-cache'
                                                }
                                        };
                                        (0, _request2.default)(options, (() => {
                                                var _ref3 = _asyncToGenerator(function* (error, response, body) {
                                                        console.log('right here');
                                                        if (error) throw new Error(error);
                                                        console.log(response.statusCode);
                                                        if (response.statusCode === 200) {
                                                                ecgResponse = yield _ecg2.default.createNew(deserializeData[0]);
                                                                let toRecord = ecgResponse;
                                                                body = JSON.parse(body);
                                                                ecgResponse.usageCount = body.data.usageCount;
                                                                ecgResponse.reviewCount = body.data.reviewCount;
                                                                ecgResponse.lastRecharge = body.data.lastRecharge;
                                                                //posting label start
                                                                var option = {
                                                                        method: 'GET',
                                                                        // url: 'http://localhost:1339/label/create/' + ecgResponse._id + '/ecg/'+ecgResponse.username,
                                                                        url: 'http://35.231.83.234:1339/label/create/' + ecgResponse._id + '/ecg/' + ecgResponse.username,
                                                                        headers: {
                                                                                'Postman-Token': '52970832-761e-4461-b0e7-a810fe377f7f',
                                                                                'cache-control': 'no-cache'
                                                                        }
                                                                };
                                                                (0, _request2.default)(option, function (error, response, body) {
                                                                        if (error) {
                                                                                console.log(error);
                                                                        }
                                                                        console.log('Posted Label');
                                                                });
                                                                //posting label end
                                                                // console.log(toRecord)
                                                                // res.send(toRecord)
                                                                // Commented By Saurabh
                                                                // var options = {
                                                                //         'method': 'POST',
                                                                //         'url': 'http://35.228.111.244:8011/ecg',
                                                                //         'headers': {
                                                                //                 'Content-Type': 'application/json'
                                                                //         },
                                                                //         body: JSON.stringify(toRecord)
                                                                // };

                                                                // Replace by Saurabh
                                                                var options = {
                                                                        'method': 'POST',
                                                                        'url': 'http://35.244.48.66:8003/ecg',
                                                                        'headers': {
                                                                                'Content-Type': 'application/json'
                                                                        },
                                                                        body: JSON.stringify(toRecord)
                                                                };
                                                                (0, _request2.default)(options, function (error, response) {
                                                                        if (error) throw new Error(error);
                                                                        console.log(response.body);
                                                                });

                                                                res.status(201).send((yield _ecgSerializer2.default.serialize(ecgResponse)));
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

                                                return function (_x6, _x7, _x8) {
                                                        return _ref3.apply(this, arguments);
                                                };
                                        })());
                                }
                        } else {
                                ecgResponse = yield _ecg2.default.updateEcg(deserializeData[0].id, deserializeData[0]);
                        }
                } catch (err) {
                        // console.log(err)
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

        return function createEcg(_x, _x2) {
                return _ref.apply(this, arguments);
        };
})();

let getallecg = exports.getallecg = (() => {
        var _ref4 = _asyncToGenerator(function* (req, res) {
                console.log("Getting all ECGs");
                try {
                        let startDate = new Date("2020-01-20T00:00:00.000Z");
                        startDate.setUTCHours(0, 0, 0);
                        let endDate = new Date("2020-01-26T23:59:59.000Z");
                        endDate.setUTCHours(23, 59, 59);
                        console.log(startDate, endDate);
                        const allEcgResponse = yield _ecg2.default.getAll(startDate, endDate);
                        res.status(200).json((yield _ecgSerializer2.default.serialize(allEcgResponse)));
                        // res.status(200).json({ count: allEcgResponse })
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function getallecg(_x9, _x10) {
                return _ref4.apply(this, arguments);
        };
})();

let getEcgByDate = exports.getEcgByDate = (() => {
        var _ref5 = _asyncToGenerator(function* (req, res) {
                console.log("Getting all ECGs");
                let username = req.swagger.params.username.value;
                let startDate = req.swagger.params.start.value;
                let endDate = req.swagger.params.end.value;
                startDate = new Date(startDate);
                startDate.setUTCHours(0, 0, 0);
                endDate = new Date(endDate);
                endDate.setUTCHours(23, 59, 59);
                console.log(username, startDate, endDate);
                try {
                        const allEcgResponse = yield _ecg2.default.getEcgByDate(username, startDate, endDate);
                        res.status(200).json((yield _ecgSerializer2.default.serialize(allEcgResponse)));
                        //res.status(200).json({"msg":true})
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function getEcgByDate(_x11, _x12) {
                return _ref5.apply(this, arguments);
        };
})();

let getEcgByDevice = exports.getEcgByDevice = (() => {
        var _ref6 = _asyncToGenerator(function* (req, res) {
                console.log("Getting all ECGs");
                let deviceId = req.swagger.params.deviceId.value;
                let startDate = req.swagger.params.start.value;
                let endDate = req.swagger.params.end.value;
                startDate = new Date(startDate);
                startDate.setUTCHours(0, 0, 0);
                endDate = new Date(endDate);
                endDate.setUTCHours(23, 59, 59);
                console.log(deviceId, startDate, endDate);
                try {
                        const allEcgResponse = yield _ecg2.default.getEcgByDevice(deviceId, startDate, endDate);
                        //res.status(200).json(await ecgSerializer.serialize(allEcgResponse))
                        res.status(200).json({
                                "count": allEcgResponse
                        });
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function getEcgByDevice(_x13, _x14) {
                return _ref6.apply(this, arguments);
        };
})();

let getEcgByDeviceIdPagination = exports.getEcgByDeviceIdPagination = (() => {
        var _ref7 = _asyncToGenerator(function* (req, res) {
                console.log("getEcgByDeviceIdPagination");
                let deviceId = req.swagger.params.deviceId.value;
                let index = req.swagger.params.index.value;

                console.log(deviceId, index);
                try {
                        // const allEcgResponse = await ecg.getEcgByDevice(deviceId, startDate, endDate)
                        //res.status(200).json(await ecgSerializer.serialize(allEcgResponse))
                        res.status(200).json({
                                "count": "allEcgResponse"
                        });
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function getEcgByDeviceIdPagination(_x15, _x16) {
                return _ref7.apply(this, arguments);
        };
})();

let getHealthByID = exports.getHealthByID = (() => {
        var _ref8 = _asyncToGenerator(function* (req, res) {
                console.log("Getting Health by username - " + req.swagger.params.username.value);
                try {
                        const accountByIdResponse = yield _ecg2.default.getByID(req.swagger.params.username.value);
                        res.status(200).json((yield _ecgSerializer2.default.serialize(accountByIdResponse)));
                } catch (err) {
                        console.log(err);
                        if (err.statusCode) {
                                res.status(err.statusCode).json(err.error);
                        } else if (err.code) {
                                const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
                                res.status(409).json(deserializeError);
                        } else if (err.NoContent) {
                                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.noContentFound);
                                res.status(204).json(deserializeError);
                        } else {
                                res.status(500).json(_errorsList.errorsList.accountServiceError);
                        }
                }
        });

        return function getHealthByID(_x17, _x18) {
                return _ref8.apply(this, arguments);
        };
})();

let getEcgByID = exports.getEcgByID = (() => {
        var _ref9 = _asyncToGenerator(function* (req, res) {
                console.log("Getting ECGs by username - " + req.swagger.params.username.value);
                try {
                        const accountByIdResponse = yield _ecg2.default.getByID(req.swagger.params.username.value);
                        res.status(200).json((yield _ecgSerializer2.default.serialize(accountByIdResponse)));
                } catch (err) {
                        console.log(err);
                        if (err.statusCode) {
                                res.status(err.statusCode).json(err.error);
                        } else if (err.code) {
                                const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
                                res.status(409).json(deserializeError);
                        } else if (err.NoContent) {
                                const deserializeError = yield accountSerializer.error(_errorsList.errorsList.noContentFound);
                                res.status(204).json(deserializeError);
                        } else {
                                res.status(500).json(_errorsList.errorsList.accountServiceError);
                        }
                }
        });

        return function getEcgByID(_x19, _x20) {
                return _ref9.apply(this, arguments);
        };
})();

let updateByID = exports.updateByID = (() => {
        var _ref10 = _asyncToGenerator(function* (req, res) {
                const reqbody = req.swagger.params.updateAccount.value;
                try {
                        const deserializeData = yield accountSerializer.deserialize(reqbody);
                        const accountUpdateResponse = yield account.updateByID(deserializeData, req.swagger.params.userId.value);
                        res.status(200).json((yield accountSerializer.serialize(accountUpdateResponse)));
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function updateByID(_x21, _x22) {
                return _ref10.apply(this, arguments);
        };
})();

let getEcgByecgid = exports.getEcgByecgid = (() => {
        var _ref11 = _asyncToGenerator(function* (req, res) {
                const objid = req.swagger.params.ecgid.value;
                console.log(objid);
                try {
                        const accountByIdResponse = yield _ecg2.default.getEcgByecgid(objid);
                        res.status(200).json((yield _ecgSerializer2.default.serialize(accountByIdResponse)));
                        //res.status(200).json({msg:true})
                        //res.status(200).json(await ecgSerializer.serialize(allEcgResponse))
                } catch (err) {
                        console.log(err);
                        res.status(404).json({
                                "msg": "No ecg found"
                        });
                }
        });

        return function getEcgByecgid(_x23, _x24) {
                return _ref11.apply(this, arguments);
        };
})();

let updatesymptom = exports.updatesymptom = (() => {
        var _ref12 = _asyncToGenerator(function* (req, res) {
                const objid = req.swagger.params.ecgid.value;
                const symbody = req.swagger.params.symbody.value;
                console.log(objid, symbody);
                try {
                        const accountByIdResponse = yield _ecg2.default.updatesymptom(objid, symbody);
                        res.status(200).json((yield _ecgSerializer2.default.serialize(accountByIdResponse)));
                        //res.status(200).json({msg:true})
                        //res.status(200).json(await ecgSerializer.serialize(allEcgResponse))
                } catch (err) {
                        console.log(err);
                        res.status(404).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function updatesymptom(_x25, _x26) {
                return _ref12.apply(this, arguments);
        };
})();

let deleteECG = exports.deleteECG = (() => {
        var _ref13 = _asyncToGenerator(function* (req, res) {
                console.log("Deleting ECG by createdTs - " + req.swagger.params.createdTs.value + " By username - " + req.swagger.params.username.value);
                try {
                        const username = req.swagger.params.username.value;
                        const createdTs = req.swagger.params.createdTs.value;
                        const ecgDeleteResponse = yield _ecg2.default.deleteECG(username, createdTs);
                        res.status(200).json((yield ecgDeleteResponse));
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function deleteECG(_x27, _x28) {
                return _ref13.apply(this, arguments);
        };
})();

let getEcgByUsernamePagination = exports.getEcgByUsernamePagination = (() => {
        var _ref14 = _asyncToGenerator(function* (req, res) {
                console.log("Getting all ECGs");
                let username = req.swagger.params.username.value;
                let startDate = req.swagger.params.start.value;
                let endDate = req.swagger.params.end.value;

                console.log(username, startDate, endDate);
                try {
                        const allEcgResponse = yield _ecg2.default.getEcgByDate(username, startDate, endDate);
                        res.status(200).json((yield _ecgSerializer2.default.serialize(allEcgResponse)));
                        //res.status(200).json({"msg":true})
                } catch (err) {
                        console.log(err);
                        res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
                }
        });

        return function getEcgByUsernamePagination(_x29, _x30) {
                return _ref14.apply(this, arguments);
        };
})();

let getEcgsByDeviceId = exports.getEcgsByDeviceId = (() => {
        var _ref15 = _asyncToGenerator(function* (req, res) {
                const objid = req.swagger.params.deviceId.value;
                console.log(objid);
                try {
                        const accountByIdResponse = yield _ecg2.default.getEcgsByDeviceId(objid);
                        // const ecgCount = await ecg.getCountByUsername(objid)
                        // const stressCount = await stress.getCountByUsername(objid)
                        // const spo2Count = await spo2.getCountByUsername(objid)
                        // const bpCount = await bp.getCountByUsername(objid)
                        // const tempCount = await temp.getCountByUsername(objid)
                        // res.json({
                        //      ecgCount,
                        //      stressCount,
                        //      spo2Count,
                        //      bpCount,
                        //      tempCount
                        // })
                        res.status(200).json((yield _ecgSerializer2.default.serialize(accountByIdResponse)));
                } catch (err) {
                        console.log(err);
                        res.status(404).json({
                                "msg": "No ecg found"
                        });
                }
        });

        return function getEcgsByDeviceId(_x31, _x32) {
                return _ref15.apply(this, arguments);
        };
})();

var _ecg = require('../../lib/models/ecg');

var _ecg2 = _interopRequireDefault(_ecg);

var _ecgSerializer = require('../../lib/serializers/ecgSerializer');

var _ecgSerializer2 = _interopRequireDefault(_ecgSerializer);

var _errorsList = require('../../lib/errors/errorsList');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let user = ["12345678", "9634348474", "aaa", "abcd11", "abcde", "abcdef", "abhi008", "abhidev", "abhi", "abhi008", "abhi011", "agatsa4125", "akash01", "akash100", "akash1990", "akash011", "akash012", "akash123", "akash007", "anand9889", "an5196", "akash19901", "alv", "ambika", "ag54", "arpitk", "arpit92", "arpitkz", "arrow", "attia5", "adixit", "avadhvashisth", "ambitest", "an121", "ap9", "an8669", "android", "batman", "badma12345", "bhupesh2", "bhupesh3", "bhupeshmehta", "bmehta", "bhupesh47", "b47mehta", "bug", "chandani", "demo", "demoagatsa", "demobulk", "demosanket", "divya", "diwali", "diwaliz", "fbabutton", "ficci", "first", "gautam007", "jose", "iosfinal", "ijkl", "linkaccount", "lmno", "manish12jain", "mike", "mike007", "mohan", "mohdsajid", "nehag1", "neha0506", "neharastogi", "novice", "november", "nups04", "nups0409", "october", "pg", "pqrst", "prachi", "pratibha1311", "qqqq", "qwerty", "qwe", "qwer", "qwertyuiop", "rahulamu2", "rastogi", "rchandani", "rchandni", "rishav", "rishav1", "rishav2308", "riya", "robin93", "sajid", "sajidt", "sanjay", "sank", "sanket01", "sanketuser", "sankit1", "satnambhathal", "satnambhathal2", "satnambhatha", "satnamshambal", "sunil1", "shrayam", "shruti121", "shru", "shesh", "sheshnath", "shivam", "test", "testac", "testacc", "testagatsa", "testing", "testnew", "testrnd", "username", "vip009", "vishalagar", "vishalk", "vishk", "vm4125", "wishfoundationindia", "wishtest1", "wishtest2", "xyz", "yoga", "victor009", "vmohan", "mohan112", "batman", "tony", "one", "vip", "batman", "vinay1234", "sanket", "megacamp4", "testvikky2", "finaltest", "nupurtest", "testayushh", "testdivya", "testversha", "hardwaretest", "mohdsajid", "fbabutton", "lupintest"];

function checkUsername(username) {
        username = username.split("-")[0];
        let rx = new RegExp(username);
        // let n = user.indexOf(username);
        // return n
        let flag = false; //default not testing user
        user.map(item => {
                let index = item.match(rx);
                if (index) {
                        flag = true;
                }
        });
        return flag;
}