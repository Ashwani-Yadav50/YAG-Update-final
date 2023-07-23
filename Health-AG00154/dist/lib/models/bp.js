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

exports.default = bpModel();


function bpModel() {
  const Schema = _mongoose2.default.Schema;

  const BPSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    diastolic: {
      type: Number,
      required: true
    },
    systolic: {
      type: Number,
      required: true
    },
    diastolicArray: [Number],
    systolicArray: [Number],
    createdTs: {
      type: String
    },
    creationDate: Date,
    modificationDate: Date,
    deviceId: String,
    firmwareVersion: String,
    appVersion: String,
    phoneModel: String,
    osVersion: String,
    batteryLevel: Number,
    bpCondition: String,
    bpRawArray: [Number],
    systolicManualCalib: String,
    diastolicManualCalib: String,
    systolicSystemCalib: String,
    diastolicSystemCalib: String
  });

  return {
    createNew: (() => {
      var _ref = _asyncToGenerator(function* (Bp) {
        BPSchema.pre('save', function (next) {
          this.creationDate = new Date();
          this.modificationDate = new Date();
          next();
        });

        BPSchema.set('toJSON', {
          transform: function transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
        });
        _mongoose2.default.set('debug', true);
        const bpModel = _mongoose2.default.model('BP', BPSchema);
        return yield _datastore2.default.addToStore(new bpModel(Bp));
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    getAll: (() => {
      var _ref2 = _asyncToGenerator(function* () {
        const bpModel = _mongoose2.default.model('BP', BPSchema);
        return yield _datastore2.default.findAll(bpModel);
      });

      function getAll() {
        return _ref2.apply(this, arguments);
      }

      return getAll;
    })(),
    getByID: (() => {
      var _ref3 = _asyncToGenerator(function* (id) {
        const bpModel = _mongoose2.default.model('BP', BPSchema);
        return yield _datastore2.default.findOne(bpModel, id);
      });

      function getByID(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getByID;
    })(),
    getallbyusername: (() => {
      var _ref4 = _asyncToGenerator(function* (id) {
        console.log('modal');
        const bpModel = _mongoose2.default.model('BP', BPSchema);
        return yield _datastore2.default.getallbyusername(bpModel, id);
      });

      function getallbyusername(_x3) {
        return _ref4.apply(this, arguments);
      }

      return getallbyusername;
    })(),
    getallbydeviceId: (() => {
      var _ref5 = _asyncToGenerator(function* (id) {
        console.log('modal');
        const bpModel = _mongoose2.default.model('BP', BPSchema);
        return yield _datastore2.default.getallbydeviceId(bpModel, id);
      });

      function getallbydeviceId(_x4) {
        return _ref5.apply(this, arguments);
      }

      return getallbydeviceId;
    })(),
    deleteBp: (() => {
      var _ref6 = _asyncToGenerator(function* (username, createdTs) {
        const bpModel = _mongoose2.default.model('BP', BPSchema);
        return yield _datastore2.default.remove(bpModel, username, createdTs);
      });

      function deleteBp(_x5, _x6) {
        return _ref6.apply(this, arguments);
      }

      return deleteBp;
    })(),
    updateByID: (() => {
      var _ref7 = _asyncToGenerator(function* (updateAccount, id) {
        const bpModel = _mongoose2.default.model('BP', BPSchema);
        return yield _datastore2.default.upsert(bpModel, id, updateAccount);
      });

      function updateByID(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return updateByID;
    })(),
    authenticate: (() => {
      var _ref8 = _asyncToGenerator(function* (credentials) {
        const bpModel = _mongoose2.default.model('BP', BPSchema);
        return yield _datastore2.default.authenticate(bpModel, credentials);
      });

      function authenticate(_x9) {
        return _ref8.apply(this, arguments);
      }

      return authenticate;
    })(),
    getCountByUsername: (() => {
      var _ref9 = _asyncToGenerator(function* (id) {
        const bpModel = _mongoose2.default.model('BP', BPSchema);
        return yield _datastore2.default.getCountByUsername(bpModel, id);
      });

      function getCountByUsername(_x10) {
        return _ref9.apply(this, arguments);
      }

      return getCountByUsername;
    })()
  };
}