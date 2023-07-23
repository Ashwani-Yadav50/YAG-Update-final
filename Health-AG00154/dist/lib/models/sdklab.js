'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _datastore = require('../../lib/service/db/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = sdklabModel();


function sdklabModel() {
        const Schema = _mongoose2.default.Schema;

        const SdkLabSchema = new Schema({
                username: {
                        type: String,
                        required: true
                },
                pdfUrl: {
                        type: String,
                        required: true
                },
                createdTs: {
                        type: Date,
                        required: true

                },
                isDeleted: {
                        type: Boolean,
                        default: false
                },
                deviceId: {
                        type: Number
                },
                patientId: {
                        type: String
                }
        });

        return {
                create: (() => {
                        var _ref = _asyncToGenerator(function* (obj) {
                                const sdklabModel = _mongoose2.default.model('sdklabpdf', SdkLabSchema);
                                return yield _datastore2.default.addTosdkpdf(new sdklabModel(obj));
                        });

                        function create(_x) {
                                return _ref.apply(this, arguments);
                        }

                        return create;
                })(),
                changeIsDelete: (() => {
                        var _ref2 = _asyncToGenerator(function* (url) {
                                const sdklabModel = _mongoose2.default.model('sdklabpdf', SdkLabSchema);
                                return yield _datastore2.default.changedeletestate(sdklabModel, url);
                        });

                        function changeIsDelete(_x2) {
                                return _ref2.apply(this, arguments);
                        }

                        return changeIsDelete;
                })(),
                findreportlab: (() => {
                        var _ref3 = _asyncToGenerator(function* (labusername, deviceId) {
                                const sdklabModel = _mongoose2.default.model('sdklabpdf', SdkLabSchema);
                                return yield _datastore2.default.findreportlab(sdklabModel, labusername, deviceId);
                        });

                        function findreportlab(_x3, _x4) {
                                return _ref3.apply(this, arguments);
                        }

                        return findreportlab;
                })(),
                findPatientId: (() => {
                        var _ref4 = _asyncToGenerator(function* (patientId) {
                                const sdklabModel = _mongoose2.default.model('sdklabpdf', SdkLabSchema);
                                return yield _datastore2.default.findPatientId(sdklabModel, patientId);
                        });

                        function findPatientId(_x5) {
                                return _ref4.apply(this, arguments);
                        }

                        return findPatientId;
                })()
        };
}