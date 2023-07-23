'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateByID = exports.getallDatawithouttestingdata = exports.getHealthByID = exports.getAll = exports.create = undefined;

let create = exports.create = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const reqbody = req.swagger.params.account.value;
    try {
      const deserializeData = yield accountSerializer.deserialize(reqbody);
      deserializeData.map(function (v) {
        return v.username = req.swagger.params.username.value;
      });
      const accountResponse = yield account.createNew(deserializeData);
      res.status(201).send((yield accountSerializer.serialize(accountResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else {
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

      let data = [];

      let count = devices.length;
      devices.map((() => {
        var _ref3 = _asyncToGenerator(function* (item, index) {
          // setTimeout(async ()=>{
          let obj = {};
          obj.deviceId = item.deviceId;
          let lastecgdate = yield _ecg2.default.findLast(item.deviceId);
          let laststressdate = yield _stress2.default.findLast(item.deviceId);
          //console.log(lastecgdate)
          lastecgdate.map(function (ite) {
            if (lastecgdate.createdTs) {
              objEcg.lastecgdate = ite.createdTs;
            } else {
              //console.log('no data')
              objEcg.lastecgdate = "";
            }
          });

          if (laststressdate.createdTs) {
            //console.log('no data')
            obj.laststressdate = laststressdate.createdTs.split('T')[0];
          } else {
            obj.laststressdate = "";
          }
          // },1000*index)
          data.push(obj);
          //console.log(data)
          count--;
          console.log(count);
          console.log(devices.length);
        });

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      })());
      setTimeout(function () {
        res.json({ data: data }).status(200);
      }, 20000);
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function getAll(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

let getHealthByID = exports.getHealthByID = (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      const username = req.swagger.params.username.value;
      console.log("Getting All Health Data by username - " + username);
      const healthResponse = {};
      healthResponse.ecg = yield _ecg2.default.getByID(username);
      healthResponse.bp = yield _bp2.default.getByID(username);
      healthResponse.sugar = yield _sugar2.default.getByID(username);
      healthResponse.cholesterol = yield _cholesterol2.default.getByID(username);
      healthResponse.stress = yield _stress2.default.getByID(username);
      res.status(200).json((yield _healthSerializer2.default.serialize(healthResponse)));
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function getHealthByID(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

let getallDatawithouttestingdata = exports.getallDatawithouttestingdata = (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      const username = req.swagger.params.username.value;
      const deviceId = req.swagger.params.deviceId.value;
      console.log("Getting All Health Data by username - " + username, deviceId);
      const healthResponse = {};
      healthResponse.ecg = yield _ecg2.default.getByIDAndUsername(username, deviceId);
      healthResponse.stress = yield _stress2.default.getByIDAndUsername(username, deviceId);
      res.status(200).json((yield _healthSerializer2.default.serialize(healthResponse)));
    } catch (err) {
      console.log(err);
      res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
    }
  });

  return function getallDatawithouttestingdata(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

let updateByID = exports.updateByID = (() => {
  var _ref6 = _asyncToGenerator(function* (req, res) {
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

  return function updateByID(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})();

var _bp = require('../../lib/models/bp');

var _bp2 = _interopRequireDefault(_bp);

var _sugar = require('../../lib/models/sugar');

var _sugar2 = _interopRequireDefault(_sugar);

var _cholesterol = require('../../lib/models/cholesterol');

var _cholesterol2 = _interopRequireDefault(_cholesterol);

var _ecg = require('../../lib/models/ecg');

var _ecg2 = _interopRequireDefault(_ecg);

var _stress = require('../../lib/models/stress');

var _stress2 = _interopRequireDefault(_stress);

var _healthSerializer = require('../../lib/serializers/healthSerializer');

var _healthSerializer2 = _interopRequireDefault(_healthSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }