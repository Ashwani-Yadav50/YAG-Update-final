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

const HEALTH_HOST = _config2.default.get('HEALTH_HOST');
const HEALTH_PORT = _config2.default.get('HEALTH_PORT');

exports.default = cholesterolmodel();

function cholesterolmodel() {
  return {
    getCholesterolByID: (() => {
      var _ref = _asyncToGenerator(function* (username) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/cholesterol/${username}`,
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
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function getCholesterol(_x) {
        return _ref.apply(this, arguments);
      }

      return getCholesterol;
    })(),
    saveCholesterol: (() => {
      var _ref2 = _asyncToGenerator(function* (body, username) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/cholesterol/${username}`,
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
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function save(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return save;
    })(),
    deleteCholesterol: (() => {
      var _ref3 = _asyncToGenerator(function* (username, createdTs) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/cholesterol/${username}/${createdTs}`,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
          },
          method: 'DELETE'
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

      function deleteBP(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return deleteBP;
    })()
  };
}