'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateByID = exports.getByID = exports.getAll = exports.create = undefined;

let create = exports.create = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const reqbody = req.swagger.params.account.value;
    try {
      console.log(reqbody);
      const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
      const accountResponse = yield _account2.default.createNew(deserializeData);
      res.status(201).send((yield _accountSerializer2.default.serialize(accountResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else {
        // TODO: do something better here
        console.log(err);
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
    try {
      const allAccountResponse = yield pricingPlan.getAll();
      res.status(200).json(allAccountResponse);
    } catch (err) {
      // TODO: do something better here
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function getAll(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let getByID = exports.getByID = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      console.log("sequrityyyy  " + req.swagger.security);
      const accountByIdResponse = yield _account2.default.getByID(req.swagger.params.userId.value);
      res.status(200).json((yield _accountSerializer2.default.serialize(accountByIdResponse)));
    } catch (err) {
      // TODO: do something better here
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function getByID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let updateByID = exports.updateByID = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    const reqbody = req.swagger.params.updateAccount.value;
    try {
      const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
      const accountUpdateResponse = yield _account2.default.updateByID(deserializeData, req.swagger.params.userId.value);
      res.status(200).json((yield _accountSerializer2.default.serialize(accountUpdateResponse)));
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function updateByID(_x7, _x8) {
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