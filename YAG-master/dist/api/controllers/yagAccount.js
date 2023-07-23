'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getlablist = exports.createVersion = exports.getversion = exports.resetUsername = exports.resetPassword = exports.createOtp = exports.resetKey = exports.resetIDNew = exports.resetID = exports.removeSec = exports.updateByID = exports.getAllAccount = exports.getAccountByPhone = exports.getAccountByID = exports.saveAccount = undefined;

// YAG function to save the user's BP data

let saveAccount = exports.saveAccount = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const body = req.swagger.params.HealthDataDocument.value;
    const result = yield _accountModel2.default.save(body);
    if (result.statusCode === 201) {
      const defaultBody = {
        "data": {
          "type": "prime",
          "id": "string",
          "attributes": {
            "name": "default",
            "username": body.data.attributes.username
          },
          "links": {
            "self": "string",
            "next": "string",
            "last": "string"
          },
          "meta": {
            "creationDate": "2017-08-17T12:14:44.358Z",
            "modificationDate": "2017-08-17T12:14:44.358Z"
          },
          "relationships": {},
          "included": {}
        }
      };
      const subscription = yield _subscriptionModel2.default.save(defaultBody);
      res.status(subscription.statusCode).send(result.body);
    } else {
      res.status(result.statusCode).send(result.body);
    }
  });

  return function saveAccount(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let getAccountByID = exports.getAccountByID = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const authheader = req.headers.authorization;
    const username = req.swagger.params.username.value;
    const result = yield _accountModel2.default.getAccountByID(username, authheader);
    if (result.statusCode === 200) {
      const subscription = yield _subscriptionModel2.default.getAccountByID(username);
      if (subscription.statusCode === 204) {
        let attributes = {
          "name": "string",
          "username": username,
          "type": "string",
          "subId": 1,
          "ecgCounts": 15,
          "usersAllow": 5
        };
        result.body.data.attributes.relationships = attributes;
        res.status(result.statusCode).send(result.body);
      } else {
        result.body.data.attributes.relationships = subscription.body.data.attributes;
        res.status(result.statusCode).send(result.body);
      }
    } else {
      res.status(result.statusCode).send(result.body);
    }
  });

  return function getAccountByID(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let getAccountByPhone = exports.getAccountByPhone = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const phone = req.swagger.params.phone.value;
    const result = yield _accountModel2.default.getAccountByPhone(phone);
    res.status(result.statusCode).send(result.body);
  });

  return function getAccountByPhone(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

// YAG function to fetch user's BP data

let getAllAccount = exports.getAllAccount = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    const authheader = "Basic YWJoaTAwNTphYmhpbmF2";
    const result = yield _accountModel2.default.getAllAccount(authheader);
    res.status(result.statusCode).send(result.body);
  });

  return function getAllAccount(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

let updateByID = exports.updateByID = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    const username = req.swagger.params.username.value;
    const body = req.swagger.params.updateAccount.value;
    const result = yield _accountModel2.default.update(username, body);
    res.status(result.statusCode).send(result.body);
  });

  return function updateByID(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

let removeSec = exports.removeSec = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    const primary = req.swagger.params.primary.value;
    const secondary = req.swagger.params.secondary.value;
    const result = yield _accountModel2.default.removeSec(primary, secondary);
    //console.log(primary,secondary)
    res.status(result.statusCode).send(result.body);
    //res.status(200).send(true)
  });

  return function removeSec(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})();

let resetID = exports.resetID = (() => {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    const username = req.swagger.params.username.value;
    const result = yield _accountModel2.default.resetID(username);
    console.log(result.body);
    res.status(result.statusCode).send(result.body);
  });

  return function resetID(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
})();

let resetIDNew = exports.resetIDNew = (() => {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    const username = req.swagger.params.username.value;
    const phone = req.swagger.params.phone.value;
    const result = yield _accountModel2.default.resetIDNew(username, phone);
    console.log(result.body);
    res.status(result.statusCode).send(result.body);
  });

  return function resetIDNew(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
})();

let resetKey = exports.resetKey = (() => {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    const key = req.swagger.params.key.value;
    const result = yield _accountModel2.default.resetKey(key);
    res.status(result.statusCode).send(result.body);
  });

  return function resetKey(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
})();

let createOtp = exports.createOtp = (() => {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    const key = req.swagger.params.phonenumber.value;
    const result = yield _accountModel2.default.createOtp(key);
    res.status(result.statusCode).send(result.body);
  });

  return function createOtp(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
})();

let resetPassword = exports.resetPassword = (() => {
  var _ref11 = _asyncToGenerator(function* (req, res) {
    const username = req.swagger.params.username.value;
    const passwordBody = req.swagger.params.passwordBody.value;
    const result = yield _accountModel2.default.resetPassword(username, passwordBody);
    res.status(result.statusCode).send(result.body);
  });

  return function resetPassword(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
})();

let resetUsername = exports.resetUsername = (() => {
  var _ref12 = _asyncToGenerator(function* (req, res) {
    const mobile = req.swagger.params.mobile.value;
    const result = yield _accountModel2.default.resetUsername(mobile);
    res.status(result.statusCode).send(result.body);
  });

  return function resetUsername(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
})();

let getversion = exports.getversion = (() => {
  var _ref13 = _asyncToGenerator(function* (req, res) {
    const result = yield _accountModel2.default.getversion();
    res.status(result.statusCode).send(result.body);
  });

  return function getversion(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
})();

let createVersion = exports.createVersion = (() => {
  var _ref14 = _asyncToGenerator(function* (req, res) {
    const obj = req.swagger.params.versionbody.value;
    const result = yield _accountModel2.default.createVersion(obj);
    res.status(result.statusCode).send(result.body);
  });

  return function createVersion(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
})();

let getlablist = exports.getlablist = (() => {
  var _ref15 = _asyncToGenerator(function* (req, res) {
    const result = yield _accountModel2.default.getlablist();
    res.status(result.statusCode).send(result.body);
  });

  return function getlablist(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
})();

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _accountModel = require('../../lib/models/account-model');

var _accountModel2 = _interopRequireDefault(_accountModel);

var _subscriptionModel = require('../../lib/models/subscription-model');

var _subscriptionModel2 = _interopRequireDefault(_subscriptionModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }