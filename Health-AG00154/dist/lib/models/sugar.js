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

exports.default = sugarModel();


function sugarModel() {
  const Schema = _mongoose2.default.Schema;

  const SugarSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true

    },
    createdTs: Date,
    creationDate: Date,
    modificationDate: Date
  });

  return {
    createNew: (() => {
      var _ref = _asyncToGenerator(function* (sugar) {
        SugarSchema.pre('save', function (next) {
          this.creationDate = new Date();
          this.modificationDate = new Date();
          next();
        });

        SugarSchema.set('toJSON', {
          transform: function transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
        });
        const SugarModel = _mongoose2.default.model('sugar', SugarSchema);
        return yield _datastore2.default.addToStore(new SugarModel(sugar));
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    getAll: (() => {
      var _ref2 = _asyncToGenerator(function* () {
        const SugarModel = _mongoose2.default.model('sugar', SugarSchema);
        return yield _datastore2.default.findAll(SugarModel);
      });

      function getAll() {
        return _ref2.apply(this, arguments);
      }

      return getAll;
    })(),
    deleteSugar: (() => {
      var _ref3 = _asyncToGenerator(function* (username, createdTs) {
        const SugarModel = _mongoose2.default.model('sugar', SugarSchema);
        return yield _datastore2.default.remove(SugarModel, username, createdTs);
      });

      function deleteSugar(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return deleteSugar;
    })(),
    getByID: (() => {
      var _ref4 = _asyncToGenerator(function* (id) {
        const SugarModel = _mongoose2.default.model('sugar', SugarSchema);
        return yield _datastore2.default.findOne(SugarModel, id);
      });

      function getSugarByID(_x4) {
        return _ref4.apply(this, arguments);
      }

      return getSugarByID;
    })(),
    updateByID: (() => {
      var _ref5 = _asyncToGenerator(function* (updateAccount, id) {
        const SugarModel = _mongoose2.default.model('sugar', SugarSchema);
        return yield _datastore2.default.upsert(SugarModel, id, updateAccount);
      });

      function updateByID(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return updateByID;
    })(),
    authenticate: (() => {
      var _ref6 = _asyncToGenerator(function* (credentials) {
        const SugarModel = _mongoose2.default.model('sugar', SugarSchema);
        return yield _datastore2.default.authenticate(SugarModel, credentials);
      });

      function authenticate(_x7) {
        return _ref6.apply(this, arguments);
      }

      return authenticate;
    })()
  };
}