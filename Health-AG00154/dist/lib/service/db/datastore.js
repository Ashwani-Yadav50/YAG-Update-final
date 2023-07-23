'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = datastore();


function datastore() {
        const mongoDBHost = _config2.default.get('MONGODB_HOST');
        const mongoDBPort = _config2.default.get('MONGODB_PORT');
        var options = {
                poolSize: 50,
                useMongoClient: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000
        };
        _mongoose2.default.Promise = _bluebird2.default;
        _mongoose2.default.set('debug', true);
        // Mongoose.connect(`mongodb://${mongoDBHost}:${mongoDBPort}/sanket`, options, function (err, cb) {
        //      if (err) return console.log(err);
        //      console.log('Health API connected to Database')
        // })

        // _mongoose2.default.connect("mongodb://agatsa62:jksparkle0605@40.83.251.117:4000/sanket?authSource=admin", options, function (err, cb) {
        //         if (err) return console.log(err);
        //         console.log('Health API connected to Database');
        // });

        // _mongoose2.default.connect("mongodb+srv://agatsa62:OD9sykKylSNhND6y@cluster0.vnegceg.mongodb.net/sanket?authSource=admin", options, function (err, cb) {
        //         if (err) return console.log(err);
        //         console.log('Health API connected to Database');
        // });

        //below code for handle custom error in database 

        const mongooseOptions = {
                useNewUrlParser: true, // Use the new URL string parser
                useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
              };
              // MongoDB connection URI      
              const mongoURI = 'mongodb+srv://agatsa62:OD9sykKylSNhND6y@cluster0.vnegceg.mongodb.net/sanket?authSource=admin';
              // Connect to MongoDB
              _mongoose2.default.connect(mongoURI, mongooseOptions)
                .then(() => {
                  console.log('MongoDB connected successfully!');
                  // ... Your application code ...
                })
                .catch((err) => {
                  console.error('Error connecting to MongoDB:', err.message);
                });


        return {
                addToStore: (() => {
                        var _ref = _asyncToGenerator(function* (obj) {
                                return new Promise(function (resolve, reject) {
                                        obj.save(function (err, doc) {
                                                if (err) {
                                                        reject(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function addToStore(_x) {
                                return _ref.apply(this, arguments);
                        }

                        return addToStore;
                })(),
                addToStoreRaw: (() => {
                        var _ref2 = _asyncToGenerator(function* (obj) {
                                console.log('raw db');
                                return new Promise(function (resolve, reject) {
                                        obj.save(function (err, doc) {
                                                if (err) {
                                                        reject(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function addToStoreRaw(_x2) {
                                return _ref2.apply(this, arguments);
                        }

                        return addToStoreRaw;
                })(),
                findAll: (() => {
                        var _ref3 = _asyncToGenerator(function* (obj, s, e) {
                                return new Promise(function (resolve, reject) {
                                        obj.find({}, { limit: 10 }, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                        // console.log(s,e)
                                        // obj.count({createdTs:{$gte:s,$lte:e}}, (err, doc) => {
                                        //      if (err) {
                                        //              throw new Error(err)
                                        //      } else {
                                        //              doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        //      }
                                        // })
                                });
                        });

                        function findAll(_x3, _x4, _x5) {
                                return _ref3.apply(this, arguments);
                        }

                        return findAll;
                })(),
                getEcgByDate: (() => {
                        var _ref4 = _asyncToGenerator(function* (obj, username, start, end) {
                                return new Promise(function (resolve, reject) {
                                        console.log(username, start, end);
                                        obj.find({
                                                "username": username, createdTs: {
                                                        $gte: start,
                                                        $lte: end
                                                }
                                        }, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id:  not found!' });
                                                }
                                        });
                                });
                        });

                        function getEcgByDate(_x6, _x7, _x8, _x9) {
                                return _ref4.apply(this, arguments);
                        }

                        return getEcgByDate;
                })(),
                getEcgByDevice: (() => {
                        var _ref5 = _asyncToGenerator(function* (obj, deviceId, start, end) {
                                return new Promise(function (resolve, reject) {
                                        console.log(deviceId, start, end);
                                        obj.count({
                                                "deviceId": deviceId, createdTs: {
                                                        $gte: start,
                                                        $lte: end
                                                }
                                        }, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: not found!' });
                                                }
                                        });
                                });
                        });

                        function getEcgByDevice(_x10, _x11, _x12, _x13) {
                                return _ref5.apply(this, arguments);
                        }

                        return getEcgByDevice;
                })(),
                getStressByDate: (() => {
                        var _ref6 = _asyncToGenerator(function* (obj, username, start, end) {
                                return new Promise(function (resolve, reject) {
                                        console.log(username, start, end);
                                        obj.find({
                                                "username": username, createdTs: {
                                                        $gte: start,
                                                        $lte: end
                                                }
                                        }, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' });
                                                }
                                        });
                                });
                        });

                        function getStressByDate(_x14, _x15, _x16, _x17) {
                                return _ref6.apply(this, arguments);
                        }

                        return getStressByDate;
                })(),
                getStressByDevice: (() => {
                        var _ref7 = _asyncToGenerator(function* (obj, deviceId, start, end) {
                                return new Promise(function (resolve, reject) {
                                        console.log(deviceId, start, end);
                                        obj.count({
                                                "deviceId": deviceId, createdTs: {
                                                        $gte: start,
                                                        $lte: end
                                                }
                                        }, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' });
                                                }
                                        });
                                });
                        });

                        function getStressByDevice(_x18, _x19, _x20, _x21) {
                                return _ref7.apply(this, arguments);
                        }

                        return getStressByDevice;
                })(),
                findOne: (() => {
                        var _ref8 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        acc.find({ "username": id }, function (err, doc) {
                                                if (err) {
                                                        // reject(err)
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function findOne(_x22, _x23) {
                                return _ref8.apply(this, arguments);
                        }

                        return findOne;
                })(),
                getallbyusername: (() => {
                        var _ref9 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        console.log(id);
                                        acc.find({ "username": new RegExp(id) }, function (err, doc) {
                                                if (err) {
                                                        // reject(err)
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function getallbyusername(_x24, _x25) {
                                return _ref9.apply(this, arguments);
                        }

                        return getallbyusername;
                })(),
                getallbydeviceId: (() => {
                        var _ref10 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        console.log(id);
                                        acc.find({ "deviceId": new RegExp(id) }, function (err, doc) {
                                                console.log(doc);
                                                if (err) {
                                                        // reject(err)
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function getallbydeviceId(_x26, _x27) {
                                return _ref10.apply(this, arguments);
                        }

                        return getallbydeviceId;
                })(),
                getEcgByecgid: (() => {
                        var _ref11 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        acc.findOne({ "_id": id }, function (err, doc) {
                                                if (err) {
                                                        // reject(err)
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function getEcgByecgid(_x28, _x29) {
                                return _ref11.apply(this, arguments);
                        }

                        return getEcgByecgid;
                })(),
                getByIDAndUsername: (() => {
                        var _ref12 = _asyncToGenerator(function* (modal, username, deviceId) {
                                return new Promise(function (resolve, reject) {
                                        modal.find({ "username": username, "deviceId": deviceId }, function (err, doc) {
                                                if (err) {
                                                        // reject(err)
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function getByIDAndUsername(_x30, _x31, _x32) {
                                return _ref12.apply(this, arguments);
                        }

                        return getByIDAndUsername;
                })(),
                findOneByLimit: (() => {
                        var _ref13 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        acc.find({ "username": id }, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        }).limit(20).sort({ "createdTs": -1 });
                                });
                        });

                        function findOneByLimit(_x33, _x34) {
                                return _ref13.apply(this, arguments);
                        }

                        return findOneByLimit;
                })(),
                remove: (() => {
                        var _ref14 = _asyncToGenerator(function* (obj, username, createdTs) {
                                return new Promise(function (resolve, reject) {
                                        obj.remove({ "username": username, "createdTs": createdTs }, function (err, data) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        data ? resolve(data) : reject('ECG with ts: ' + createdTs + ' not found!');
                                                }
                                        });
                                });
                        });

                        function remove(_x35, _x36, _x37) {
                                return _ref14.apply(this, arguments);
                        }

                        return remove;
                })(),
                remove: (() => {
                        var _ref15 = _asyncToGenerator(function* (obj, username, createdTs) {
                                return new Promise(function (resolve, reject) {
                                        obj.remove({ "username": username, "createdTs": createdTs }, function (err, data) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        data ? resolve(data) : reject('ECG with ts: ' + createdTs + ' not found!');
                                                }
                                        });
                                });
                        });

                        function remove(_x38, _x39, _x40) {
                                return _ref15.apply(this, arguments);
                        }

                        return remove;
                })(),
                upsert: (() => {
                        var _ref16 = _asyncToGenerator(function* (acc, id, data) {
                                return new Promise(function (resolve, reject) {
                                        acc.findByIdAndUpdate(id, data, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!');
                                                }
                                        });
                                });
                        });

                        function upsert(_x41, _x42, _x43) {
                                return _ref16.apply(this, arguments);
                        }

                        return upsert;
                })(),
                changeStatus: (() => {
                        var _ref17 = _asyncToGenerator(function* (acc, id, data) {
                                return new Promise(function (resolve, reject) {
                                        acc.findByIdAndUpdate(id, data, { new: true }, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject('Ecg with this id not found!');
                                                }
                                        });
                                });
                        });

                        function changeStatus(_x44, _x45, _x46) {
                                return _ref17.apply(this, arguments);
                        }

                        return changeStatus;
                })(),
                findLast: (() => {
                        var _ref18 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        acc.find({ deviceId: id }, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        //console.log(doc)
                                                        doc ? resolve(doc) : resolve(1);
                                                }
                                        });
                                });
                        });

                        function findLast(_x47, _x48) {
                                return _ref18.apply(this, arguments);
                        }

                        return findLast;
                })(),
                findfw: (() => {
                        var _ref19 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        acc.findOne({ deviceId: id }, { "username": 1, "firmwareVersion": 1, "deviceId": 1 }, function (err, doc) {
                                                if (err) {
                                                        throw new Error(err);
                                                } else {
                                                        //console.log(doc)
                                                        doc ? resolve(doc) : resolve(1);
                                                }
                                        }).sort({ "_id": -1 }).limit(1);
                                });
                        });

                        function findfw(_x49, _x50) {
                                return _ref19.apply(this, arguments);
                        }

                        return findfw;
                })(),
                updatesymptom: (() => {
                        var _ref20 = _asyncToGenerator(function* (acc, id, sys) {
                                return new Promise(function (resolve, reject) {
                                        acc.findByIdAndUpdate(id, { $set: { "symptoms": sys.symptoms } }, { new: true }, function (err, doc) {
                                                if (err) {
                                                        // reject(err)
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function updatesymptom(_x51, _x52, _x53) {
                                return _ref20.apply(this, arguments);
                        }

                        return updatesymptom;
                })(),
                addTosdkpdf: (() => {
                        var _ref21 = _asyncToGenerator(function* (obj) {
                                console.log('raw db');
                                return new Promise(function (resolve, reject) {
                                        obj.save(function (err, doc) {
                                                if (err) {
                                                        reject(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function addTosdkpdf(_x54) {
                                return _ref21.apply(this, arguments);
                        }

                        return addTosdkpdf;
                })(),
                changedeletestate: (() => {
                        var _ref22 = _asyncToGenerator(function* (modal, url) {
                                console.log('raw db');
                                return new Promise(function (resolve, reject) {
                                        modal.update({ "pdfUrl": url }, { $set: { isDeleted: true } }, function (err, doc) {
                                                if (err) {
                                                        reject(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function changedeletestate(_x55, _x56) {
                                return _ref22.apply(this, arguments);
                        }

                        return changedeletestate;
                })(),
                findreportlab: (() => {
                        var _ref23 = _asyncToGenerator(function* (modal, labusername, deviceId) {
                                // console.log('raw db')
                                return new Promise(function (resolve, reject) {
                                        modal.find({ "username": labusername, "deviceId": deviceId }, function (err, doc) {
                                                if (err) {
                                                        reject(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        }).sort({ "_id": -1 });
                                });
                        });

                        function findreportlab(_x57, _x58, _x59) {
                                return _ref23.apply(this, arguments);
                        }

                        return findreportlab;
                })(),
                findPatientId: (() => {
                        var _ref24 = _asyncToGenerator(function* (modal, patientId) {
                                console.log('Patient ID - ' + patientId);
                                return new Promise(function (resolve, reject) {
                                        modal.find({ "patientId": patientId }, function (err, doc) {
                                                if (err) {
                                                        reject(err);
                                                } else {
                                                        console.log(doc);
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function findPatientId(_x60, _x61) {
                                return _ref24.apply(this, arguments);
                        }

                        return findPatientId;
                })(),
                getEcgsByDeviceId: (() => {
                        var _ref25 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        acc.find({ "deviceId": id }, { "username": 1, "createdTs": 1, "_id": 1 }, function (err, doc) {
                                                if (err) {
                                                        // reject(err)
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function getEcgsByDeviceId(_x62, _x63) {
                                return _ref25.apply(this, arguments);
                        }

                        return getEcgsByDeviceId;
                })(),
                getStressByDeviceId: (() => {
                        var _ref26 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        acc.find({ "deviceId": id }, { "username": 1, "createdTs": 1, "_id": 1 }, function (err, doc) {
                                                if (err) {
                                                        // reject(err)
                                                        throw new Error(err);
                                                } else {
                                                        doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
                                                }
                                        });
                                });
                        });

                        function getStressByDeviceId(_x64, _x65) {
                                return _ref26.apply(this, arguments);
                        }

                        return getStressByDeviceId;
                })(),
                getCountByUsername: (() => {
                        var _ref27 = _asyncToGenerator(function* (acc, id) {
                                return new Promise(function (resolve, reject) {
                                        acc.count({ "username": new RegExp(id) }, function (err, doc) {
                                                if (err) {
                                                        // reject(err)
                                                        throw new Error(err);
                                                } else {
                                                        // (doc) ? : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                                        resolve(doc);
                                                }
                                        });
                                });
                        });

                        function getCountByUsername(_x66, _x67) {
                                return _ref27.apply(this, arguments);
                        }

                        return getCountByUsername;
                })(),
                authenticate: (() => {
                        var _ref28 = _asyncToGenerator(function* (acc, credentials) {
                                let temp = credentials.split(" ");
                                let buf = new Buffer(temp[1], 'base64');
                                let plain_auth = buf.toString();
                                let cred = plain_auth.split(':');
                                return new Promise(function (resolve, reject) {
                                        acc.findOne({ username: cred[0] }, function (err, doc) {
                                                if (err) {
                                                        console.log("datastore error " + err);
                                                } else {
                                                        if (doc) {
                                                                if (doc.password === cred[1]) {
                                                                        resolve(doc);
                                                                } else {
                                                                        reject("Not autherize");
                                                                }
                                                        } else reject("Not autherize");
                                                }
                                        });
                                });
                        });

                        function authenticate(_x68, _x69) {
                                return _ref28.apply(this, arguments);
                        }

                        return authenticate;
                })()
        };
}