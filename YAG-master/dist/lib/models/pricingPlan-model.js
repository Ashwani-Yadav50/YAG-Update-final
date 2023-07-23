'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const PRICING_HOST = _config2.default.get('PRICING_HOST');
const PRICING_PORT = _config2.default.get('PRICING_PORT');

exports.default = pricingPlanmodel();

function pricingPlanmodel() {
  return {
    getPlans: (() => {
      var _ref = _asyncToGenerator(function* () {
        const options = {
          uri: `http://${PRICING_HOST}:${PRICING_PORT}/api/pricingPlans`,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
          },
          method: 'GET'
        };
        return (0, _requestPromise2.default)(options).then(function (response) {
          return {
            "statusCode": response.statusCode,
            "body": response.body
          };
        }).catch(function (err) {
          console.log(err);
          if (err.statusCode) {
            return {
              "statusCode": err.statusCode,
              "body": err.title
            };
          }
        });
      });

      function getPlans() {
        return _ref.apply(this, arguments);
      }

      return getPlans;
    })(),
    save: (() => {
      var _ref2 = _asyncToGenerator(function* (body) {
        const options = {
          uri: `http://${PRICING_HOST}:${PRICING_PORT}/api/pricingPlans`,
          body: body,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
          },
          method: 'POST'
        };
        return (0, _requestPromise2.default)(options).then(function (response) {
          return {
            "statusCode": response.statusCode,
            "body": response.body
          };
        }).catch(function (err) {
          console.log(err);
          if (err.statusCode) {
            return {
              "statusCode": err.statusCode,
              "body": err.title
            };
          }
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function save(_x) {
        return _ref2.apply(this, arguments);
      }

      return save;
    })(),
    getMasterPlans: (() => {
      var _ref3 = _asyncToGenerator(function* () {
        const options = {
          uri: `http://${PRICING_HOST}:${PRICING_PORT}/api/pricingPlans/master`,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
          },
          method: 'GET'
        };
        return (0, _requestPromise2.default)(options).then(function (response) {
          return {
            "statusCode": response.statusCode,
            "body": response.body
          };
        }).catch(function (err) {
          console.log(err);
          if (err.statusCode) {
            return {
              "statusCode": err.statusCode,
              "body": err.title
            };
          }
          //console.log('errorstatuscode:' + err.statusCode)
        });
      });

      function getMasterPlans() {
        return _ref3.apply(this, arguments);
      }

      return getMasterPlans;
    })(),
    saveMaster: (() => {
      var _ref4 = _asyncToGenerator(function* (body) {
        const options = {
          uri: `http://${PRICING_HOST}:${PRICING_PORT}/api/pricingPlans/master`,
          body: body,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
          },
          method: 'POST'
        };
        return (0, _requestPromise2.default)(options).then(function (response) {
          return {
            "statusCode": response.statusCode,
            "body": response.body
          };
        }).catch(function (err) {
          console.log(err);
          if (err.statusCode) {
            return {
              "statusCode": err.statusCode,
              "body": err.title
            };
          }
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function saveMaster(_x2) {
        return _ref4.apply(this, arguments);
      }

      return saveMaster;
    })()
  };
}