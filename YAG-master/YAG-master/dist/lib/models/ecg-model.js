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
    getECG: (() => {
      var _ref = _asyncToGenerator(function* (username) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/${username}`,
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

      function getECG(_x) {
        return _ref.apply(this, arguments);
      }

      return getECG;
    })(),
    getecgbyobjid: (() => {
      var _ref2 = _asyncToGenerator(function* (id) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/get/ecg/${id}`,
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

      function getecgbyobjid(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getecgbyobjid;
    })(),
    getEcgByDate: (() => {
      var _ref3 = _asyncToGenerator(function* (username, start, end) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/${username}/${start}/${end}`,
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

      function getEcgByDate(_x3, _x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return getEcgByDate;
    })(),
    getEcgByDeviceIdPagination: (() => {
      var _ref4 = _asyncToGenerator(function* (deviceId, index) {
        console.log('pagination' + deviceId + " " + index);
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/lab/devicedata/${deviceId}/${index}`,
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

      function getEcgByDeviceIdPagination(_x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return getEcgByDeviceIdPagination;
    })(),
    getEcgByDevice: (() => {
      var _ref5 = _asyncToGenerator(function* (deviceId, start, end) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/device/${deviceId}/${start}/${end}`,
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

      function getEcgByDevice(_x8, _x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return getEcgByDevice;
    })(),
    saveECG: (() => {
      var _ref6 = _asyncToGenerator(function* (body, username) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/${username}`,
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
          // console.log(err);
          if (err.statusCode) {
            return {
              "statusCode": err.statusCode,
              "body": err.title
            };
          }
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function save(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return save;
    })(),
    saveRawECG: (() => {
      var _ref7 = _asyncToGenerator(function* (body, username) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecgRaw/${username}`,
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
          // console.log(err);
          console.log(err.statusCode);
          if (err.statusCode) {
            return {
              "statusCode": err.statusCode,
              "body": err.title
            };
          }
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function saveRawECG(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return saveRawECG;
    })(),
    deleteECG: (() => {
      var _ref8 = _asyncToGenerator(function* (username, createdTs) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/${username}/${createdTs}`,
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

      function deleteECG(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return deleteECG;
    })(),
    updatesymptom: (() => {
      var _ref9 = _asyncToGenerator(function* (id, body) {
        const options = {
          uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/ecg/updatesymptom/${id}`,
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

      function updatesymptom(_x17, _x18) {
        return _ref9.apply(this, arguments);
      }

      return updatesymptom;
    })()
  };
}