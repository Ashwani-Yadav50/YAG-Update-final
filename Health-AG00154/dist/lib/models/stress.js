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

exports.default = stressModel();


function stressModel() {
  const Schema = _mongoose2.default.Schema;

  const stressSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    mrr: Number,
    hr: Number,
    rmssd: {
      type: Number,
      required: true
    },
    sdnn: Number,
    pnn50: Number,
    pr: Number,
    qrs: Number,
    qt: Number,
    qtc: Number,
    nn150: Number,
    nn2k: Number,
    minHr: Number,
    maxHr: Number,
    value: [Number],
    rrInterval: [Number],
    arrHr: [Number],
    createdTs: Date,
    lat: String,
    long: String,
    deviceId: String,
    batteryLevel: Number,
    deviceType: String,
    fullReport: Boolean,
    creationDate: Date,
    modificationDate: Date,
    symptoms: String,
    vmRatio: String,
    firmwareVersion: String,
    appVersion: String,
    phoneModel: String,
    osVersion: String,
    patientId: String
  });

  return {
    createNew: (() => {
      var _ref = _asyncToGenerator(function* (account) {
        stressSchema.pre('save', function (next) {
          this.creationDate = new Date();
          this.modificationDate = new Date();
          next();
        });

        stressSchema.set('toJSON', {
          transform: function transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
        });
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.addToStore(new stressModel(account));
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    getAll: (() => {
      var _ref2 = _asyncToGenerator(function* () {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.findAll(stressModel);
      });

      function getAll() {
        return _ref2.apply(this, arguments);
      }

      return getAll;
    })(),
    updatesymptom: (() => {
      var _ref3 = _asyncToGenerator(function* (id, symptom) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.updatesymptom(stressModel, id, symptom);
      });

      function updatesymptom(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return updatesymptom;
    })(),
    getByID: (() => {
      var _ref4 = _asyncToGenerator(function* (id) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.findOne(stressModel, id);
      });

      function getByID(_x4) {
        return _ref4.apply(this, arguments);
      }

      return getByID;
    })(),
    getStressBystressid: (() => {
      var _ref5 = _asyncToGenerator(function* (id) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.getEcgByecgid(stressModel, id);
      });

      function getStressBystressid(_x5) {
        return _ref5.apply(this, arguments);
      }

      return getStressBystressid;
    })(),
    getByIDAndUsername: (() => {
      var _ref6 = _asyncToGenerator(function* (username, deviceId) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.getByIDAndUsername(stressModel, username, deviceId);
      });

      function getByIDAndUsername(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return getByIDAndUsername;
    })(),
    getHealthByID: (() => {
      var _ref7 = _asyncToGenerator(function* (id) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.findOneByLimit(stressModel, id);
      });

      function getHealthByID(_x8) {
        return _ref7.apply(this, arguments);
      }

      return getHealthByID;
    })(),
    getStressByDate: (() => {
      var _ref8 = _asyncToGenerator(function* (username, start, end) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.getStressByDate(stressModel, username, start, end);
      });

      function getStressByDate(_x9, _x10, _x11) {
        return _ref8.apply(this, arguments);
      }

      return getStressByDate;
    })(),
    getStressByDevice: (() => {
      var _ref9 = _asyncToGenerator(function* (deviceId, start, end) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.getStressByDevice(stressModel, deviceId, start, end);
      });

      function getStressByDevice(_x12, _x13, _x14) {
        return _ref9.apply(this, arguments);
      }

      return getStressByDevice;
    })(),
    deleteStress: (() => {
      var _ref10 = _asyncToGenerator(function* (username, createdTs) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.remove(stressModel, username, createdTs);
      });

      function deleteStress(_x15, _x16) {
        return _ref10.apply(this, arguments);
      }

      return deleteStress;
    })(),
    updateByID: (() => {
      var _ref11 = _asyncToGenerator(function* (updateAccount, id) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.upsert(AccountModel, id, updateAccount);
      });

      function updateByID(_x17, _x18) {
        return _ref11.apply(this, arguments);
      }

      return updateByID;
    })(),
    authenticate: (() => {
      var _ref12 = _asyncToGenerator(function* (credentials) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.authenticate(AccountModel, credentials);
      });

      function authenticate(_x19) {
        return _ref12.apply(this, arguments);
      }

      return authenticate;
    })(),
    updateStress: (() => {
      var _ref13 = _asyncToGenerator(function* (ecgId, data) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.changeStatus(stressModel, ecgId, data);
      });

      function updateStress(_x20, _x21) {
        return _ref13.apply(this, arguments);
      }

      return updateStress;
    })(),
    findLast: (() => {
      var _ref14 = _asyncToGenerator(function* (deviceId) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.findLast(stressModel, deviceId);
      });

      function findLast(_x22) {
        return _ref14.apply(this, arguments);
      }

      return findLast;
    })(),
    getStressByDeviceId: (() => {
      var _ref15 = _asyncToGenerator(function* (id) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.getStressByDeviceId(stressModel, id);
      });

      function getStressByDeviceId(_x23) {
        return _ref15.apply(this, arguments);
      }

      return getStressByDeviceId;
    })(),
    getCountByUsername: (() => {
      var _ref16 = _asyncToGenerator(function* (id) {
        const stressModel = _mongoose2.default.model('stress', stressSchema);
        return yield _datastore2.default.getCountByUsername(stressModel, id);
      });

      function getCountByUsername(_x24) {
        return _ref16.apply(this, arguments);
      }

      return getCountByUsername;
    })()
  };
}