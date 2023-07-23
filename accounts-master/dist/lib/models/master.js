'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datastore = require('../../lib/service/db/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

var _mongoose = require('mongoose');
_mongoose.set('useFindAndModify', false);


var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = masterAccountModel();


function masterAccountModel() {
  const Schema = _mongoose2.default.Schema;

  const AccountSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true,
      default: "master"
    },
    username: {
      type: String,
      required: true

    },
    password: {
      type: String,
      required: true
    },
    linkedUsers: [{
      username: { type: String, required: false },
      name: { type: String, required: false },
      state: { type: Number, required: false, default: 0 }
    }],
    subscribers: [{
      username: { type: String, required: false },
      name: { type: String, required: false },
      key: { type: String, required: false }
    }],
    portal: Boolean,
    countrycode: String,
    mobile: Number,
    email: String,
    address: String,
    creationDate: Date,
    modificationDate: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
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
        const AccountModel = _mongoose2.default.model('master', AccountSchema, "accounts");
        return yield _datastore2.default.addToStore(AccountModel, new AccountModel(account));
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    getAll: (() => {
      var _ref2 = _asyncToGenerator(function* () {
        const AccountModel = _mongoose2.default.model('master', AccountSchema, "accounts");
        return yield _datastore2.default.findMaster(AccountModel);
      });

      function getAll() {
        return _ref2.apply(this, arguments);
      }

      return getAll;
    })(),
    getByID: (() => {
      var _ref3 = _asyncToGenerator(function* (id) {
        const AccountModel = _mongoose2.default.model('master', AccountSchema, "accounts");
        return yield _datastore2.default.findOne(AccountModel, id);
      });

      function getByID(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getByID;
    })(),
    getmasterID: (() => {
      var _ref4 = _asyncToGenerator(function* (id) {
        const AccountModel = _mongoose2.default.model('master', AccountSchema, "accounts");
        return yield _datastore2.default.findOnemaster(AccountModel, id);
      });

      function getmasterID(_x3) {
        return _ref4.apply(this, arguments);
      }

      return getmasterID;
    })(),
    updateByID: (() => {
      var _ref5 = _asyncToGenerator(function* (updateAccount, id) {
        console.log("data to update " + JSON.stringify(updateAccount) + "  " + id);
        const AccountModel = _mongoose2.default.model('master', AccountSchema, "accounts");
        return yield _datastore2.default.upsert(AccountModel, id, updateAccount);
      });

      function updateByID(_x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return updateByID;
    })()

  };
}