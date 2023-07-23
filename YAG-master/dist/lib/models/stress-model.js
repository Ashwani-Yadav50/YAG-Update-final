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

exports.default = ecgmodel();

function ecgmodel() {
  return {
    getStress: (() => {
      var _ref = _asyncToGenerator(function* (username) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/stress/${username}`,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
          },
          method: 'GET'
        };
        return (0, _requestPromise2.default)(options).then(function (response) {
          console.log(response.statusCode);
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

      function getECG(_x) {
        return _ref.apply(this, arguments);
      }

      return getECG;
    })(),
    getstressbyobjid: (() => {
      var _ref2 = _asyncToGenerator(function* (id) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/get/stress/${id}`,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
          },
          method: 'GET'
        };
        return (0, _requestPromise2.default)(options).then(function (response) {
          console.log(response.statusCode);
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

      function getstressbyobjid(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getstressbyobjid;
    })(),
    save: (() => {
      var _ref3 = _asyncToGenerator(function* (body, username, authheader) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/stress/${username}`,
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

      function save(_x3, _x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return save;
    })(),
    getStressByDate: (() => {
      var _ref4 = _asyncToGenerator(function* (username, start, end) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/stress/${username}/${start}/${end}`,
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
          if (err.statusCode) {
            return {
              "statusCode": err.statusCode,
              "body": err.title
            };
          }
        });
      });

      function getStressByDate(_x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return getStressByDate;
    })(),
    getStressByDevice: (() => {
      var _ref5 = _asyncToGenerator(function* (deviceId, start, end) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/stress/device/${deviceId}/${start}/${end}`,
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
          if (err.statusCode) {
            return {
              "statusCode": err.statusCode,
              "body": err.title
            };
          }
        });
      });

      function getStressByDevice(_x9, _x10, _x11) {
        return _ref5.apply(this, arguments);
      }

      return getStressByDevice;
    })(),
    deleteStress: (() => {
      var _ref6 = _asyncToGenerator(function* (username, createdTs) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/Stress/${username}/${createdTs}`,
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

      function deleteStress(_x12, _x13) {
        return _ref6.apply(this, arguments);
      }

      return deleteStress;
    })(),
    updatesymptom: (() => {
      var _ref7 = _asyncToGenerator(function* (id, body) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/stress/updatesymptom/${id}`,
          body: body,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
          },
          method: 'PUT'
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

      function updatesymptom(_x14, _x15) {
        return _ref7.apply(this, arguments);
      }

      return updatesymptom;
    })()
  };
}