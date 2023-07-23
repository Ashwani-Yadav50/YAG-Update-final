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

exports.default = tempModel();


function tempModel() {
    const Schema = _mongoose2.default.Schema;

    const tempSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        temp: Number,
        tempArray: [Number],
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
                tempSchema.pre('save', function (next) {
                    this.creationDate = new Date();
                    this.modificationDate = new Date();
                    next();
                });

                tempSchema.set('toJSON', {
                    transform: function transform(doc, ret, options) {
                        ret.id = ret._id;
                        delete ret._id;
                        delete ret.__v;
                    }
                });
                const tempModel = _mongoose2.default.model('temperature', tempSchema);
                return yield _datastore2.default.addToStore(new tempModel(account));
            });

            function createNew(_x) {
                return _ref.apply(this, arguments);
            }

            return createNew;
        })(),
        getByID: (() => {
            var _ref2 = _asyncToGenerator(function* (id) {
                const tempModel = _mongoose2.default.model('temperature', tempSchema);
                return yield _datastore2.default.findOne(tempModel, id);
            });

            function getByID(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getByID;
        })(),
        getallbyusername: (() => {
            var _ref3 = _asyncToGenerator(function* (id) {
                console.log('modal');
                const tempModel = _mongoose2.default.model('temperature', tempSchema);
                return yield _datastore2.default.getallbyusername(tempModel, id);
            });

            function getallbyusername(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getallbyusername;
        })(),
        getallbydeviceId: (() => {
            var _ref4 = _asyncToGenerator(function* (id) {
                console.log('modal');
                const tempModel = _mongoose2.default.model('temperature', tempSchema);
                return yield _datastore2.default.getallbydeviceId(tempModel, id);
            });

            function getallbydeviceId(_x4) {
                return _ref4.apply(this, arguments);
            }

            return getallbydeviceId;
        })(),
        getCountByUsername: (() => {
            var _ref5 = _asyncToGenerator(function* (id) {
                const tempModel = _mongoose2.default.model('temperature', tempSchema);
                return yield _datastore2.default.getCountByUsername(tempModel, id);
            });

            function getCountByUsername(_x5) {
                return _ref5.apply(this, arguments);
            }

            return getCountByUsername;
        })()
    };
}