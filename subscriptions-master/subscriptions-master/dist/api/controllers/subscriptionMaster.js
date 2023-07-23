'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.share = exports.updateMasterByID = exports.getMasterByID = exports.getAllMaster = exports.createMaster = undefined;

let createMaster = exports.createMaster = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log("Creating master user");
    const reqbody = req.swagger.params.subscriptions.value;
    try {
      const deserializeData = yield _masterSubscriptionSerializer2.default.deserialize(reqbody);
      let keyss = [];
      const username = deserializeData.username;
      console.log("Creating with - " + username);
      const name = deserializeData.name;
      const count = deserializeData.keyCounts.count;
      const portal = deserializeData.keyCounts.portal;
      for (var a = 1; a <= count; a++) {
        let key = username + ":" + name + ":" + a + ":" + portal + ":" + Date.now();
        keyss.push(Buffer.from(key).toString('base64'));
      }
      deserializeData.keys = keyss;
      const subscriptionResponse = yield _masterSubscription2.default.createNew(deserializeData);
      res.status(201).send((yield _masterSubscriptionSerializer2.default.serialize(subscriptionResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _masterSubscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function createMaster(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let getAllMaster = exports.getAllMaster = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log("Getting all masters");
    try {
      const allSubscriptionResponse = yield _masterSubscription2.default.getAll();
      res.status(200).json((yield _masterSubscriptionSerializer2.default.serialize(allSubscriptionResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _masterSubscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getAllMaster(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let getMasterByID = exports.getMasterByID = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    console.log("Getting a master user - " + req.swagger.params.username.value);
    try {
      const subscriptionByIdResponse = yield _masterSubscription2.default.getByID(req.swagger.params.username.value);
      res.status(200).json((yield _masterSubscriptionSerializer2.default.serialize(subscriptionByIdResponse)));
    } catch (err) {
      //console.log(err)
      if (err.NoContent) {
        const deserializeError = yield _masterSubscriptionSerializer2.default.error(_errorsList.errorsList.noContentFound);
        res.status(204).json(deserializeError);
      } else if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _masterSubscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getMasterByID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let updateMasterByID = exports.updateMasterByID = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    console.log("Updating a master user - " + req.swagger.params.username.value);
    const reqbody = req.swagger.params.updateSubscription.value;
    try {
      const deserializeData = yield _masterSubscriptionSerializer2.default.deserialize(reqbody);
      const subscriptionUpdateResponse = yield _masterSubscription2.default.updateByID(deserializeData, req.swagger.params.username.value);
      res.status(200).json((yield _masterSubscriptionSerializer2.default.serialize(subscriptionUpdateResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _masterSubscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function updateMasterByID(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

let share = exports.share = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    console.log("Sharing master link key of - " + req.swagger.params.username.value);
    const reqbody = req.swagger.params.shareSub.value;
    const username = req.swagger.params.username.value;
    try {
      const subscriptionUpdateResponse = yield _masterSubscription2.default.share(reqbody, username);
      _nexmo2.default.sendSMS(username, reqbody.number, reqbody.key);
      res.status(200).json(subscriptionUpdateResponse);
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _masterSubscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else if (err.Already) {
        const deserializeError = yield _masterSubscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(208).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function share(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

var _masterSubscription = require('../../lib/models/masterSubscription');

var _masterSubscription2 = _interopRequireDefault(_masterSubscription);

var _sms = require('../../lib/service/sms/sms');

var _sms2 = _interopRequireDefault(_sms);

var _nexmo = require('../../lib/service/sms/nexmo');

var _nexmo2 = _interopRequireDefault(_nexmo);

var _masterSubscriptionSerializer = require('../../lib/serializers/masterSubscriptionSerializer');

var _masterSubscriptionSerializer2 = _interopRequireDefault(_masterSubscriptionSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }