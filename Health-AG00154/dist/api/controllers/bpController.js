'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getallbpbydeviceId = exports.getallbpbyusername = exports.deleteBP = exports.updateByID = exports.getBpByID = exports.getallbp = exports.createbp = undefined;

let createbp = exports.createbp = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log('Data Entry - BP , username - ' + req.swagger.params.username.value);
    const reqbody = req.swagger.params.bpBody.value;
    try {
      const deserializeData = yield _bpSerializer2.default.deserialize(reqbody);
      deserializeData.map(function (v) {
        return v.username = req.swagger.params.username.value;
      });
      const bpResponse = yield _bp2.default.createNew(deserializeData[0]);

      // Commented by Saurabh
      // var options = {
      //   'method': 'POST',
      //   'url': 'http://35.228.111.244:8011/bp',
      //   'headers': {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(bpResponse)
      // };
      // request(options, function (error, response) {
      //   if (error) throw new Error(error);
      //   console.log(response.body);
      // });

      res.status(201).send((yield _bpSerializer2.default.serialize(bpResponse)));
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else {
        console.log(err);
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function createbp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let getallbp = exports.getallbp = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log("Getting all BPs");
    try {
      const allBpResponse = yield _bp2.default.getAll();
      res.status(200).json((yield _bpSerializer2.default.serialize(allBpResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield _bpSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getallbp(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let getBpByID = exports.getBpByID = (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    console.log("Getting BPs by username - " + req.swagger.params.username.value);
    try {
      const accountByIdResponse = yield _bp2.default.getByID(req.swagger.params.username.value);
      res.status(200).json((yield _bpSerializer2.default.serialize(accountByIdResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield accountSerializer.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getBpByID(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

let updateByID = exports.updateByID = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    console.log("fake as fake");
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

let deleteBP = exports.deleteBP = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    console.log("Deleting BP by createdTs - " + req.swagger.params.createdTs.value + " By username - " + req.swagger.params.username.value);
    try {
      const username = req.swagger.params.username.value;
      const createdTs = req.swagger.params.createdTs.value;
      const deleteBpResponse = yield _bp2.default.deleteBp(username, createdTs);
      res.status(200).json(deleteBpResponse);
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function deleteBP(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

//get all data by username


let getallbpbyusername = exports.getallbpbyusername = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    console.log("Getting BPs by username - " + req.swagger.params.username.value);
    try {
      const accountByIdResponse = yield _bp2.default.getallbyusername(req.swagger.params.username.value);
      res.status(200).json((yield _bpSerializer2.default.serialize(accountByIdResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield accountSerializer.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getallbpbyusername(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})();

let getallbpbydeviceId = exports.getallbpbydeviceId = (() => {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    console.log("Getting BPs by username - " + req.swagger.params.deviceId.value);
    try {
      const accountByIdResponse = yield _bp2.default.getallbydeviceId(req.swagger.params.deviceId.value);
      res.status(200).json((yield _bpSerializer2.default.serialize(accountByIdResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.code) {
        const deserializeError = yield accountSerializer.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function getallbpbydeviceId(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
})();

var _bp = require('../../lib/models/bp');

var _bp2 = _interopRequireDefault(_bp);

var _bpSerializer = require('../../lib/serializers/bpSerializer');

var _bpSerializer2 = _interopRequireDefault(_bpSerializer);

var _errorsList = require('../../lib/errors/errorsList');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }