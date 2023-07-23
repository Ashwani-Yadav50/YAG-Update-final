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

exports.default = EcgModel();


function EcgModel() {
  const Schema = _mongoose2.default.Schema;

  const EcgSchema = new Schema({
    username: {
      type: String,
      required: true

    },
    hr: Number,
    pr: Number,
    qrs: Number,
    qt: Number,
    qtc: Number,
    nn150: Number,
    nn2k: Number,
    nn150arr: [{
      leadName: String,
      value: [Number]
    }],
    nn2karr: [{
      leadName: String,
      value: [Number]
    }],
    minHr: Number,
    maxHr: Number,
    lead1: [Number],
    lead2: [Number],
    lead3: [Number],
    rrInterval: [Number],
    rrInt: [{
      leadName: String,
      value: [Number]
    }],
    arrHr: [Number],
    v1: [Number],
    v2: [Number],
    v3: [Number],
    v4: [Number],
    v5: [Number],
    v6: [Number],
    avL: [Number],
    avR: [Number],
    avF: [Number],
    symptoms: String,
    mcodeLead1: [Number],
    mcodeLead2: [Number],
    mcodeLead3: [Number],
    mcodeLeadavR: [Number],
    mcodeLeadavF: [Number],
    mcodeLeadavL: [Number],
    mcodeLeadv1: [Number],
    mcodeLeadv2: [Number],
    mcodeLeadv3: [Number],
    mcodeLeadv4: [Number],
    mcodeLeadv5: [Number],
    mcodeLeadv6: [Number],
    longLead: [Number],
    deviceId: String,
    batteryLevel: Number,
    leadCount: Number,
    lat: String,
    long: String,
    pdfurl: String,
    createdTs: Date,
    deviceType: String,
    fullReport: Boolean,
    creationDate: Date,
    modificationDate: Date,
    firmwareVersion: String,
    appVersion: String,
    phoneModel: String,
    osVersion: String,
    isConverted: Boolean,
    patientId: String
  });

  return {
    createNew: (() => {
      var _ref = _asyncToGenerator(function* (ecg) {
        EcgSchema.pre('save', function (next) {
          this.creationDate = new Date();
          this.modificationDate = new Date();
          next();
        });

        EcgSchema.set('toJSON', {
          transform: function transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
        });
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.addToStore(new EcgModel(ecg));
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    getAll: (() => {
      var _ref2 = _asyncToGenerator(function* (s, e) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.findAll(EcgModel, s, e);
      });

      function getAll(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return getAll;
    })(),
    getEcgByDate: (() => {
      var _ref3 = _asyncToGenerator(function* (username, start, end) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.getEcgByDate(EcgModel, username, start, end);
      });

      function getEcgByDate(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getEcgByDate;
    })(),
    getEcgByDevice: (() => {
      var _ref4 = _asyncToGenerator(function* (deviceId, start, end) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.getEcgByDevice(EcgModel, deviceId, start, end);
      });

      function getEcgByDevice(_x7, _x8, _x9) {
        return _ref4.apply(this, arguments);
      }

      return getEcgByDevice;
    })(),
    getByID: (() => {
      var _ref5 = _asyncToGenerator(function* (id) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.findOne(EcgModel, id);
      });

      function getByID(_x10) {
        return _ref5.apply(this, arguments);
      }

      return getByID;
    })(),
    getEcgByecgid: (() => {
      var _ref6 = _asyncToGenerator(function* (id) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.getEcgByecgid(EcgModel, id);
      });

      function getEcgByecgid(_x11) {
        return _ref6.apply(this, arguments);
      }

      return getEcgByecgid;
    })(),
    updatesymptom: (() => {
      var _ref7 = _asyncToGenerator(function* (id, symptom) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.updatesymptom(EcgModel, id, symptom);
      });

      function updatesymptom(_x12, _x13) {
        return _ref7.apply(this, arguments);
      }

      return updatesymptom;
    })(),
    getByIDAndUsername: (() => {
      var _ref8 = _asyncToGenerator(function* (username, deviceId) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.getByIDAndUsername(EcgModel, username, deviceId);
      });

      function getByIDAndUsername(_x14, _x15) {
        return _ref8.apply(this, arguments);
      }

      return getByIDAndUsername;
    })(),
    getHealthByID: (() => {
      var _ref9 = _asyncToGenerator(function* (id) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.findOneByLimit(EcgModel, id);
      });

      function getHealthByID(_x16) {
        return _ref9.apply(this, arguments);
      }

      return getHealthByID;
    })(),
    updateByID: (() => {
      var _ref10 = _asyncToGenerator(function* (updateECG, id) {
        const EcgModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.upsert(EcgModel, id, updateECG);
      });

      function updateByID(_x17, _x18) {
        return _ref10.apply(this, arguments);
      }

      return updateByID;
    })(),
    deleteECG: (() => {
      var _ref11 = _asyncToGenerator(function* (username, createdTs) {
        console.log("delete ecg name " + createdTs);
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.remove(EcgModel, username, createdTs);
      });

      function deleteECG(_x19, _x20) {
        return _ref11.apply(this, arguments);
      }

      return deleteECG;
    })(),
    authenticate: (() => {
      var _ref12 = _asyncToGenerator(function* (credentials) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.authenticate(AccountModel, credentials);
      });

      function authenticate(_x21) {
        return _ref12.apply(this, arguments);
      }

      return authenticate;
    })(),
    updateEcg: (() => {
      var _ref13 = _asyncToGenerator(function* (ecgId, data) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.changeStatus(EcgModel, ecgId, data);
      });

      function updateEcg(_x22, _x23) {
        return _ref13.apply(this, arguments);
      }

      return updateEcg;
    })(),
    findLast: (() => {
      var _ref14 = _asyncToGenerator(function* (deviceId) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.findLast(EcgModel, deviceId);
      });

      function findLast(_x24) {
        return _ref14.apply(this, arguments);
      }

      return findLast;
    })(),
    findfw: (() => {
      var _ref15 = _asyncToGenerator(function* (deviceId) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.findfw(EcgModel, deviceId);
      });

      function findfw(_x25) {
        return _ref15.apply(this, arguments);
      }

      return findfw;
    })(),
    getEcgsByDeviceId: (() => {
      var _ref16 = _asyncToGenerator(function* (id) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.getEcgsByDeviceId(EcgModel, id);
      });

      function getEcgsByDeviceId(_x26) {
        return _ref16.apply(this, arguments);
      }

      return getEcgsByDeviceId;
    })(),
    getCountByUsername: (() => {
      var _ref17 = _asyncToGenerator(function* (id) {
        const EcgModel = _mongoose2.default.model('ecg', EcgSchema);
        return yield _datastore2.default.getCountByUsername(EcgModel, id);
      });

      function getCountByUsername(_x27) {
        return _ref17.apply(this, arguments);
      }

      return getCountByUsername;
    })()
  };
}