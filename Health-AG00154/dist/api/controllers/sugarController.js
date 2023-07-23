'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSugar = exports.updateByID = exports.getSugarByID = exports.getallsugar = exports.createsugar = undefined;

let createsugar = exports.createsugar = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log('Data Entry - Sugar , username - ' + req.swagger.params.username.value);
    const reqbody = req.swagger.params.SugarBody.value;
    try {
      const deserializeData = yield _sugarSerializer2.default.deserialize(reqbody);
      deserializeData.map(function (v) {
        return v.username = req.swagger.params.username.value;
      });
      const sugarResponse = yield _sugar2.default.createNew(deserializeData[0]);
      res.status(201).send((yield _sugarSerializer2.default.serialize(sugarResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else {
        console.log(err);
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function createsugar(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let getallsugar = exports.getallsugar = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log('Getting all sugar data');
    try {
      const allSugarResponse = yield _sugar2.default.getAll();
      res.status(200).json((yield _sugarSerializer2.default.serialize(allSugarResponse)));
    } catch (err) {
      // TODO: do something better here
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function getallsugar(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let getSugarByID = exports.getSugarByID = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    console.log("Getting sugar by username - " + req.swagger.params.username.value);
    try {
      const accountByIdResponse = yield _sugar2.default.getByID(req.swagger.params.username.value);
      res.status(200).json((yield _sugarSerializer2.default.serialize(accountByIdResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else {
        console.log(err);
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getSugarByID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let updateByID = exports.updateByID = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    const reqbody = req.swagger.params.updateAccount.value;
    try {
      const deserializeData = yield accountSerializer.deserialize(reqbody);
      const accountUpdateResponse = yield account.updateByID(deserializeData, req.swagger.params.userId.value);
      res.status(200).json((yield accountSerializer.serialize(accountUpdateResponse)));
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function updateByID(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

let deleteSugar = exports.deleteSugar = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    console.log("Deleting Stress by createdTs - " + req.swagger.params.createdTs.value + " By username - " + req.swagger.params.username.value);
    try {
      const username = req.swagger.params.username.value;
      const createdTs = req.swagger.params.createdTs.value;
      const deleteSugarResponse = yield _sugar2.default.deleteSugar(username, createdTs);
      res.status(200).json(deleteSugarResponse);
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function deleteSugar(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

var _sugar = require('../../lib/models/sugar');

var _sugar2 = _interopRequireDefault(_sugar);

var _sugarSerializer = require('../../lib/serializers/sugarSerializer');

var _sugarSerializer2 = _interopRequireDefault(_sugarSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }