'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMasterByID = exports.getMasterID = exports.getAllMaster = exports.createMaster = undefined;

let createMaster = exports.createMaster = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log("Creating master account");
    const reqbody = req.swagger.params.account.value;
    try {
      const deserializeData = yield _masterSerializer2.default.deserialize(reqbody);
      const accountResponse = yield _master2.default.createNew(deserializeData);
      res.status(201).send((yield _masterSerializer2.default.serialize(accountResponse)));
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _masterSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
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
    console.log("Getting all master");
    try {
      const allAccountResponse = yield _master2.default.getAll();
      res.status(200).json((yield _masterSerializer2.default.serialize(allAccountResponse)));
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _masterSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        console.log("catchgetAll...");
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getAllMaster(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let getMasterID = exports.getMasterID = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    console.log("Find by master uername - " + req.swagger.params.userId.value);
    try {
      const accountByIdResponse = yield _master2.default.getmasterID(req.swagger.params.userId.value);
      res.status(200).json((yield _masterSerializer2.default.serialize(accountByIdResponse)));
    } catch (err) {
      console.log(err);
      if (err.NoContent) {
        const deserializeError = yield _masterSerializer2.default.error(_errorsList.errorsList.noContentFound);
        res.status(204).json(deserializeError);
      } else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function getMasterID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let updateMasterByID = exports.updateMasterByID = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    console.log("Updating master obj info - " + req.swagger.params.userId.value);
    const reqbody = req.swagger.params.updateAccount.value;
    try {
      const deserializeData = yield _masterSerializer2.default.deserialize(reqbody);
      const accountUpdateResponse = yield _master2.default.updateByID(deserializeData, req.swagger.params.userId.value);
      res.status(201).json((yield _masterSerializer2.default.serialize(accountUpdateResponse)));
    } catch (err) {
      console.log(err);
      if (err.NoContent) {
        const deserializeError = yield accountSerializer.error(_errorsList.errorsList.noContentFound);
        res.status(204).json(deserializeError);
      } else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function updateMasterByID(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

var _master = require('../../lib/models/master');

var _master2 = _interopRequireDefault(_master);

var _masterSerializer = require('../../lib/serializers/masterSerializer.js');

var _masterSerializer2 = _interopRequireDefault(_masterSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }