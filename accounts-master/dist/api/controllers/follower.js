'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delete = exports.Accept = exports.Add = exports.searchAll = undefined;

let searchAll = exports.searchAll = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log("Search all - " + req.swagger.params.user.value);
    try {
      const allAccountResponse = yield _account2.default.findAllByID(req.swagger.params.user.value);
      res.status(200).json((yield _accountSerializer2.default.serialize(allAccountResponse)));
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function searchAll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let Add = exports.Add = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const reqbody = req.swagger.params.linkObject.value;
    console.log("Adding follower to - " + req.swagger.params.user.value);
    try {
      const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
      const allAccountResponse = yield _account2.default.Add(deserializeData, req.swagger.params.user.value);
      res.status(201).json((yield _accountSerializer2.default.serialize(allAccountResponse)));
    } catch (err) {
      console.log(err);
      if (err.Already) {
        const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function Add(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let Accept = exports.Accept = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const reqbody = req.swagger.params.linkObject.value;
    console.log("Accept request - " + req.swagger.params.user.value);
    try {
      const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
      const allAccountResponse = yield _account2.default.Accept(deserializeData, req.swagger.params.user.value);
      res.status(201).json((yield _accountSerializer2.default.serialize(allAccountResponse)));
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function Accept(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let Delete = exports.Delete = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    const reqbody = req.swagger.params.linkObject.value;
    console.log("Deleting linked user - " + req.swagger.params.username.value);
    try {
      const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
      const allAccountResponse = yield _account2.default.Delete(deserializeData, req.swagger.params.username.value);
      res.status(201).json((yield _accountSerializer2.default.serialize(allAccountResponse)));
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function Delete(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

var _account = require('../../lib/models/account');

var _account2 = _interopRequireDefault(_account);

var _accountSerializer = require('../../lib/serializers/accountSerializer');

var _accountSerializer2 = _interopRequireDefault(_accountSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }