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

exports.default = spo2Model();


function spo2Model() {
    const Schema = _mongoose2.default.Schema;

    const spo2Schema = new Schema({
        username: {
            type: String,
            required: true
        },
        spo2: Number,
        spo2Array: [Number],
        spo2RawArray: [Number],
        createdTs: Date,
        deviceId: String,
        firmwareVersion: String,
        appVersion: String,
        phoneModel: String,
        osVersion: String,
        batteryLevel: Number
    });

    return {
        createNew: (() => {
            var _ref = _asyncToGenerator(function* (account) {
                spo2Schema.pre('save', function (next) {
                    this.creationDate = new Date();
                    this.modificationDate = new Date();
                    next();
                });

                spo2Schema.set('toJSON', {
                    transform: function transform(doc, ret, options) {
                        ret.id = ret._id;
                        delete ret._id;
                        delete ret.__v;
                    }
                });
                const spo2Model = _mongoose2.default.model('spo2', spo2Schema);
                return yield _datastore2.default.addToStore(new spo2Model(account));
            });

            function createNew(_x) {
                return _ref.apply(this, arguments);
            }

            return createNew;
        })(),
        getAll: (() => {
            var _ref2 = _asyncToGenerator(function* () {
                const spo2Model = _mongoose2.default.model('spo2', spo2Schema);
                return yield _datastore2.default.findAll(spo2Model);
            });

            function getAll() {
                return _ref2.apply(this, arguments);
            }

            return getAll;
        })(),
        updatesymptom: (() => {
            var _ref3 = _asyncToGenerator(function* (id, symptom) {
                const spo2Model = _mongoose2.default.model('spo2', spo2Schema);
                return yield _datastore2.default.updatesymptom(spo2Model, id, symptom);
            });

            function updatesymptom(_x2, _x3) {
                return _ref3.apply(this, arguments);
            }

            return updatesymptom;
        })(),
        getByID: (() => {
            var _ref4 = _asyncToGenerator(function* (id) {
                const spo2Model = _mongoose2.default.model('spo2', spo2Schema);
                return yield _datastore2.default.findOne(spo2Model, id);
            });

            function getByID(_x4) {
                return _ref4.apply(this, arguments);
            }

            return getByID;
        })(),
        getallbyusername: (() => {
            var _ref5 = _asyncToGenerator(function* (id) {
                console.log('modal');
                const spo2Model = _mongoose2.default.model('spo2', spo2Schema);
                return yield _datastore2.default.getallbyusername(spo2Model, id);
            });

            function getallbyusername(_x5) {
                return _ref5.apply(this, arguments);
            }

            return getallbyusername;
        })(),
        getallbydeviceId: (() => {
            var _ref6 = _asyncToGenerator(function* (id) {
                console.log('modal');
                const spo2Model = _mongoose2.default.model('spo2', spo2Schema);
                return yield _datastore2.default.getallbydeviceId(spo2Model, id);
            });

            function getallbydeviceId(_x6) {
                return _ref6.apply(this, arguments);
            }

            return getallbydeviceId;
        })(),
        getCountByUsername: (() => {
            var _ref7 = _asyncToGenerator(function* (id) {
                const spo2Model = _mongoose2.default.model('spo2', spo2Schema);
                return yield _datastore2.default.getCountByUsername(spo2Model, id);
            });

            function getCountByUsername(_x7) {
                return _ref7.apply(this, arguments);
            }

            return getCountByUsername;
        })()
    };
}