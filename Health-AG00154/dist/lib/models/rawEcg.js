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

exports.default = EcgRawModel();


function EcgRawModel() {
  const Schema = _mongoose2.default.Schema;

  const EcgRawSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    hr: Number,
    pr: Number,
    qrs: Number,
    qt: Number,
    qtc: Number,
    lead1: [Number],
    lead2: [Number],
    lead3: [Number],
    v1: [Number],
    v2: [Number],
    v3: [Number],
    v4: [Number],
    v5: [Number],
    v6: [Number],
    avL: [Number],
    avR: [Number],
    avF: [Number],
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
    modificationDate: Date
  });

  return {
    createNew: (() => {
      var _ref = _asyncToGenerator(function* (ecg) {
        console.log('raw modal');
        EcgRawSchema.pre('save', function (next) {
          this.creationDate = new Date();
          this.modificationDate = new Date();
          next();
        });

        EcgRawSchema.set('toJSON', {
          transform: function transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
        });
        const EcgRawModel = _mongoose2.default.model('ecgRaw', EcgRawSchema);
        return yield _datastore2.default.addToStoreRaw(new EcgRawModel(ecg));
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })()
  };
}