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

exports.default = bpmodel();

function bpmodel() {
  return {
    getBp: (() => {
      var _ref = _asyncToGenerator(function* (username) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/bp/${username}`,
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
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function getBp(_x) {
        return _ref.apply(this, arguments);
      }

      return getBp;
    })(),
    save: (() => {
      var _ref2 = _asyncToGenerator(function* (body, username, authheader) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/bp/${username}`,
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

      function save(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return save;
    })(),
    deleteBP: (() => {
      var _ref3 = _asyncToGenerator(function* (username, createdTs) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/bp/${username}/${createdTs}`,
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

      function deleteBP(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return deleteBP;
    })(),
    bpall: (() => {
      var _ref4 = _asyncToGenerator(function* (username) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/bpall/${username}`,
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
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function bpall(_x7) {
        return _ref4.apply(this, arguments);
      }

      return bpall;
    })(),
    bpalldevice: (() => {
      var _ref5 = _asyncToGenerator(function* (deviceId) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/bpalldevice/${deviceId}`,
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
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function bpalldevice(_x8) {
        return _ref5.apply(this, arguments);
      }

      return bpalldevice;
    })()
  };
}