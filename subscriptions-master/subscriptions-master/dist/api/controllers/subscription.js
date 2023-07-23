'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateByID = exports.getByID = exports.getAll = exports.create = undefined;

let create = exports.create = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log("Creating user subscription");
    const reqbody = req.swagger.params.subscriptions.value;
    try {
      const deserializeData = yield _subscriptionSerializer2.default.deserialize(reqbody);
      const subscriptionResponse = yield _subscription2.default.createNew(deserializeData);
      res.status(201).send((yield _subscriptionSerializer2.default.serialize(subscriptionResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _subscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let getAll = exports.getAll = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log("Get all user subscription");
    try {
      const allSubscriptionResponse = yield _subscription2.default.getAll();
      res.status(200).json((yield _subscriptionSerializer2.default.serialize(allSubscriptionResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _subscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getAll(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let getByID = exports.getByID = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    console.log("Getting a user's subscription object");
    try {
      const subscriptionByIdResponse = yield _subscription2.default.getByID(req.swagger.params.username.value);
      res.status(200).json((yield _subscriptionSerializer2.default.serialize(subscriptionByIdResponse)));
    } catch (err) {
      if (err.NoContent) {
        const deserializeError = yield _subscriptionSerializer2.default.error(_errorsList.errorsList.noContentFound);
        res.status(204).json(deserializeError);
      } else if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _subscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getByID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let updateByID = exports.updateByID = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    console.log('updating user subcription object - ' + req.swagger.params.username.value);
    const reqbody = req.swagger.params.updateSubscription.value;
    try {
      const deserializeData = yield _subscriptionSerializer2.default.deserialize(reqbody);
      const subscriptionUpdateResponse = yield _subscription2.default.updateByID(deserializeData, req.swagger.params.username.value);
      res.status(200).json((yield _subscriptionSerializer2.default.serialize(subscriptionUpdateResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _subscriptionSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function updateByID(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

var _subscription = require('../../lib/models/subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _subscriptionSerializer = require('../../lib/serializers/subscriptionSerializer');

var _subscriptionSerializer2 = _interopRequireDefault(_subscriptionSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }