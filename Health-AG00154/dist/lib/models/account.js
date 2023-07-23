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

exports.default = accountModel();


function accountModel() {
  const Schema = _mongoose2.default.Schema;

  const AccountSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true

    },
    password: {
      type: String,
      required: true
    },
    mobile: Number,
    email: String,
    dob: String,
    gender: String,
    creationDate: Date,
    modificationDate: Date
  });

  return {
    createNew: (() => {
      var _ref = _asyncToGenerator(function* (account) {
        AccountSchema.pre('save', function (next) {
          this.creationDate = new Date();
          this.modificationDate = new Date();
          next();
        });

        AccountSchema.set('toJSON', {
          transform: function transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
        });
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.addToStore(new AccountModel(account));
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    getAll: (() => {
      var _ref2 = _asyncToGenerator(function* () {
        return yield _datastore2.default.findAll();
      });

      function getAll() {
        return _ref2.apply(this, arguments);
      }

      return getAll;
    })(),
    getByID: (() => {
      var _ref3 = _asyncToGenerator(function* (id) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.findOne(AccountModel, id);
      });

      function getByID(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getByID;
    })(),
    updateByID: (() => {
      var _ref4 = _asyncToGenerator(function* (updateAccount, id) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.upsert(AccountModel, id, updateAccount);
      });

      function updateByID(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return updateByID;
    })(),
    authenticate: (() => {
      var _ref5 = _asyncToGenerator(function* (credentials) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.authenticate(AccountModel, credentials);
      });

      function authenticate(_x5) {
        return _ref5.apply(this, arguments);
      }

      return authenticate;
    })()
  };
}