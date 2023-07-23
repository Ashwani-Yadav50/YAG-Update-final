'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datastore = require('../../lib/service/db/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mailer = require('../../lib/service/mail/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _sms = require('../../lib/service/sms/sms');

var _sms2 = _interopRequireDefault(_sms);

var _pushNotification = require('../../lib/service/mail/pushNotification');

var _pushNotification2 = _interopRequireDefault(_pushNotification);

var _msg = require('../../lib/service/sms/msg91');

var _msg2 = _interopRequireDefault(_msg);

var _nexmosms = require('../../lib/service/sms/nexmosms');

var _nexmosms2 = _interopRequireDefault(_nexmosms);

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
      required: true,
      unique: true,
      dropDups: true
    },
    lastname: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    countrycode: { type: String },
    mobile: Number,
    email: String,
    dob: String,
    bloodGroup: String,
    gender: String,
    height: Number,
    weight: Number,
    userType: String,
    profilePic: String,
    smoker: Boolean,
    diabetic: Boolean,
    alcoholic: Boolean,
    isHeartPatient: Boolean,
    primaryUser: String,
    symptoms: String,
    patientId: String,
    secondary: [{
      username: { type: String, required: true },
      name: { type: String, required: false },
      lastname: { type: String, required: false },
      password: { type: String },
      countrycode: { type: String },
      mobile: { type: Number },
      deleted: {
        type: Boolean,
        default: false
      }
    }],
    follower: [{
      username: { type: String, required: true },
      name: { type: String, required: true },
      state: { type: Number, required: true, default: 0 }
    }],
    following: [{
      username: { type: String, required: true },
      name: { type: String, required: true },
      state: { type: Number, required: true, default: 0 }
    }],
    links: [{
      username: { type: String, required: true },
      name: { type: String, required: true },
      key: { type: String, required: true },
      portal: { type: Boolean, required: false }
    }],
    linkedAccounts: [{
      username: { type: String, required: true },
      name: { type: String, required: true },
      key: { type: String, required: true }
    }],
    linkedUsers: [{
      username: { type: String, required: false },
      name: { type: String, required: false },
      key: { type: String, required: false },
      state: { type: Number, required: false, default: 0 }
    }],
    subscribers: [{
      username: { type: String, required: false },
      name: { type: String, required: false },
      key: { type: String, required: false }
    }],
    creationDate: Date,
    modificationDate: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    otp: { type: Number },
    authPhone: { type: Number }
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
        return yield _datastore2.default.addToStore(AccountModel, new AccountModel(account));
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    createNewSecondary: (() => {
      var _ref2 = _asyncToGenerator(function* (account) {
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
        return yield _datastore2.default.addToStoreSecondary(new AccountModel(account), AccountModel);
      });

      function createNewSecondary(_x2) {
        return _ref2.apply(this, arguments);
      }

      return createNewSecondary;
    })(),
    getAll: (() => {
      var _ref3 = _asyncToGenerator(function* () {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.findAll(AccountModel);
      });

      function getAll() {
        return _ref3.apply(this, arguments);
      }

      return getAll;
    })(),
    getByID: (() => {
      var _ref4 = _asyncToGenerator(function* (id) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.findOne(AccountModel, id);
      });

      function getByID(_x3) {
        return _ref4.apply(this, arguments);
      }

      return getByID;
    })(),

    pushSec: (() => {
      var _ref5 = _asyncToGenerator(function* (secondary) {
        console.log(secondary);
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.pushSecond(AccountModel, secondary);
      });

      function pushSec(_x4) {
        return _ref5.apply(this, arguments);
      }

      return pushSec;
    })(),

    getByPhone: (() => {
      var _ref6 = _asyncToGenerator(function* (id) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.findPhone(AccountModel, id);
      });

      function getByPhone(_x5) {
        return _ref6.apply(this, arguments);
      }

      return getByPhone;
    })(),

    findAllByID: (() => {
      var _ref7 = _asyncToGenerator(function* (id) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.findAllToFollow(AccountModel, id);
      });

      function findAllByID(_x6) {
        return _ref7.apply(this, arguments);
      }

      return findAllByID;
    })(),
    updateByID: (() => {
      var _ref8 = _asyncToGenerator(function* (updateAccount, id) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.upsert(AccountModel, id, updateAccount);
      });

      function updateByID(_x7, _x8) {
        return _ref8.apply(this, arguments);
      }

      return updateByID;
    })(),
    Add: (() => {
      var _ref9 = _asyncToGenerator(function* (link, user) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        _pushNotification2.default.universalPush(link.username, user + " has requested to follow you to monitor your Health data.");
        const doc = yield _datastore2.default.Add(AccountModel, link, user);
        return doc;
      });

      function Add(_x9, _x10) {
        return _ref9.apply(this, arguments);
      }

      return Add;
    })(),
    Delete: (() => {
      var _ref10 = _asyncToGenerator(function* (link, user) {
        _pushNotification2.default.universalPush(link.username, user + " has rejected your request.");
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.Delete(AccountModel, link, user);
      });

      function Delete(_x11, _x12) {
        return _ref10.apply(this, arguments);
      }

      return Delete;
    })(),
    Accept: (() => {
      var _ref11 = _asyncToGenerator(function* (link, user) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        _pushNotification2.default.universalPush(link.username, user + " has approved you to access his Health Data.");
        const doc = yield _datastore2.default.Accept(AccountModel, link, user);
        return doc;
      });

      function Accept(_x13, _x14) {
        return _ref11.apply(this, arguments);
      }

      return Accept;
    })(),
    Links: (() => {
      var _ref12 = _asyncToGenerator(function* (link, user) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.Links(AccountModel, link, user);
      });

      function Links(_x15, _x16) {
        return _ref12.apply(this, arguments);
      }

      return Links;
    })(),
    LinkAcc: (() => {
      var _ref13 = _asyncToGenerator(function* (link, user) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.LinkAcc(AccountModel, link, user);
      });

      function LinkAcc(_x17, _x18) {
        return _ref13.apply(this, arguments);
      }

      return LinkAcc;
    })(),
    authenticate: (() => {
      var _ref14 = _asyncToGenerator(function* (credentials) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.authenticate(AccountModel, credentials);
      });

      function authenticate(_x19) {
        return _ref14.apply(this, arguments);
      }

      return authenticate;
    })(),
    authenticatePhone: (() => {
      var _ref15 = _asyncToGenerator(function* (credentials) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.authenticatePhone(AccountModel, credentials);
      });

      function authenticatePhone(_x20) {
        return _ref15.apply(this, arguments);
      }

      return authenticatePhone;
    })(),
    checkPhone: (() => {
      var _ref16 = _asyncToGenerator(function* (phoneObj) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.checkPhone(AccountModel, phoneObj);
      });

      function checkPhone(_x21) {
        return _ref16.apply(this, arguments);
      }

      return checkPhone;
    })(),
    addPhoneLogin: (() => {
      var _ref17 = _asyncToGenerator(function* (phone, otp) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.addPhoneLogin(AccountModel, phone, otp);
      });

      function addPhoneLogin(_x22, _x23) {
        return _ref17.apply(this, arguments);
      }

      return addPhoneLogin;
    })(),
    findOtpUser: (() => {
      var _ref18 = _asyncToGenerator(function* (otp) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.findOtpUser(AccountModel, otp);
      });

      function findOtpUser(_x24) {
        return _ref18.apply(this, arguments);
      }

      return findOtpUser;
    })(),
    checkKey: (() => {
      var _ref19 = _asyncToGenerator(function* (key) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        return yield _datastore2.default.checkKey(AccountModel, key);
      });

      function checkKey(_x25) {
        return _ref19.apply(this, arguments);
      }

      return checkKey;
    })(),
    resetID: (() => {
      var _ref20 = _asyncToGenerator(function* (username, token) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        const doc = yield _datastore2.default.resetID(AccountModel, username, token);
        const smsno = (doc.countrycode + "" + doc.mobile).toString();
        if (!doc.email) {
          console.log('email not fount');
          console.log(smsno);
          _nexmosms2.default.passwordReset(smsno, token);
          // msg91.sendSMS(doc.countrycode,smsno,token)
          return { "NOEmail": "Email not found" };
        } else {
          console.log('email found');
          const read = yield _mailer2.default.read(token);
          const send = _mailer2.default.send(doc.email, read);
          console.log(smsno);
          _nexmosms2.default.passwordReset(smsno, token);
          return { "Email": "Mail send Successfuly" };
        }
      });

      function resetID(_x26, _x27) {
        return _ref20.apply(this, arguments);
      }

      return resetID;
    })(),
    sendOtpAccountUpdate: (() => {
      var _ref21 = _asyncToGenerator(function* (username, token) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        const doc = yield _datastore2.default.sendOtp(AccountModel, username, token);
        const smsno = (doc.countrycode + "" + doc.mobile).toString();
        _nexmosms2.default.sendSMS(smsno, token);
        return doc;
      });

      function sendOtpAccountUpdate(_x28, _x29) {
        return _ref21.apply(this, arguments);
      }

      return sendOtpAccountUpdate;
    })(),
    resetPassword: (() => {
      var _ref22 = _asyncToGenerator(function* (passwordBody, username) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        const doc = yield _datastore2.default.resetPassword(AccountModel, username, passwordBody);
        return doc;
      });

      function resetPassword(_x30, _x31) {
        return _ref22.apply(this, arguments);
      }

      return resetPassword;
    })(),
    removeSec: (() => {
      var _ref23 = _asyncToGenerator(function* (primary, secondary) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        const doc = yield _datastore2.default.removeSec(AccountModel, primary, secondary);
        return doc;
      });

      function removeSec(_x32, _x33) {
        return _ref23.apply(this, arguments);
      }

      return removeSec;
    })(),
    resetUsername: (() => {
      var _ref24 = _asyncToGenerator(function* (mobile) {
        const AccountModel = _mongoose2.default.model('account', AccountSchema);
        const res = yield _datastore2.default.resetUsername(AccountModel, mobile);
        let user = [];
        for (var x in res) {
          user.push(res[x].username);
        }
        _nexmosms2.default.usernameReset(res[0].countrycode + "" + res[0].mobile, user);
        return res;
      });

      function resetUsername(_x34) {
        return _ref24.apply(this, arguments);
      }

      return resetUsername;
    })()
  };
}