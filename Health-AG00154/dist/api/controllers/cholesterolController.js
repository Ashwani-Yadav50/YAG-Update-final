'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateByID = exports.getCholesterolByID = exports.deleteCholesterol = exports.getallcholesterol = exports.createCholesterol = undefined;

let createCholesterol = exports.createCholesterol = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log('Data Entry - cholesterol , username - ' + req.swagger.params.username.value);
    const reqbody = req.swagger.params.cholesterolBody.value;
    try {
      const deserializeData = yield _cholesterolSerializer2.default.deserialize(reqbody);
      deserializeData.map(function (v) {
        return v.username = req.swagger.params.username.value;
      });
      const cholesterolResponse = yield _cholesterol2.default.createNew(deserializeData[0]);
      res.status(201).send((yield _cholesterolSerializer2.default.serialize(cholesterolResponse)));
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function createCholesterol(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let getallcholesterol = exports.getallcholesterol = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log('Getting all cholesterol');
    try {
      const allCholesterolResponse = yield _cholesterol2.default.getAll();
      res.status(200).json((yield _cholesterolSerializer2.default.serialize(allCholesterolResponse)));
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function getallcholesterol(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let deleteCholesterol = exports.deleteCholesterol = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    console.log("Deleting cholesterol by createdTs - " + req.swagger.params.createdTs.value + " By username - " + req.swagger.params.username.value);
    try {
      const username = req.swagger.params.username.value;
      const createdTs = req.swagger.params.createdTs.value;
      const deleteCholesterolRequest = yield _cholesterol2.default.deleteCholesterol(username, createdTs);
      res.status(200).json(deleteCholesterolRequest);
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function deleteCholesterol(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let getCholesterolByID = exports.getCholesterolByID = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    console.log("Getting cholesterol by username - " + req.swagger.params.username.value);
    try {
      const accountByIdResponse = yield _cholesterol2.default.getByID(req.swagger.params.username.value);
      res.status(200).json((yield _cholesterolSerializer2.default.serialize(accountByIdResponse)));
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getCholesterolByID(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

let updateByID = exports.updateByID = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
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

  return function updateByID(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

var _cholesterol = require('../../lib/models/cholesterol');

var _cholesterol2 = _interopRequireDefault(_cholesterol);

var _cholesterolSerializer = require('../../lib/serializers/cholesterolSerializer');

var _cholesterolSerializer2 = _interopRequireDefault(_cholesterolSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }