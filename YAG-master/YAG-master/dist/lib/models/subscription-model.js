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

const SUBSCRIPTION_HOST = _config2.default.get('SUBSCRIPTION_HOST');
const SUBSCRIPTION_PORT = _config2.default.get('SUBSCRIPTION_PORT');

exports.default = subscriptionmodel();

function subscriptionmodel() {
  return {
    getAllAccount: (() => {
      var _ref = _asyncToGenerator(function* (authheader) {
        const options = {
          uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscriptions`,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8',
            'Authorization': authheader
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

      function getAllAccount(_x) {
        return _ref.apply(this, arguments);
      }

      return getAllAccount;
    })(),
    getAccountByID: (() => {
      var _ref2 = _asyncToGenerator(function* (username) {
        const options = {
          uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/${username}`,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
            // 'Authorization':authheader
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

      function getAccountByID(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getAccountByID;
    })(),
    save: (() => {
      var _ref3 = _asyncToGenerator(function* (body) {
        const options = {
          uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscriptions`,
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

      function save(_x3) {
        return _ref3.apply(this, arguments);
      }

      return save;
    })(),
    update: (() => {
      var _ref4 = _asyncToGenerator(function* (username, body) {
        const options = {
          uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/${username}`,
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
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function update(_x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return update;
    })(),
    getMasterAccountByID: (() => {
      var _ref5 = _asyncToGenerator(function* (username) {
        const options = {
          uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/master/${username}`,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
            // 'Authorization':authheader
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

      function getAccountByID(_x6) {
        return _ref5.apply(this, arguments);
      }

      return getAccountByID;
    })(),
    saveMaster: (() => {
      var _ref6 = _asyncToGenerator(function* (body) {
        const options = {
          uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscriptions/master`,
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

      function saveMaster(_x7) {
        return _ref6.apply(this, arguments);
      }

      return saveMaster;
    })(),
    updateMaster: (() => {
      var _ref7 = _asyncToGenerator(function* (username, body) {
        const options = {
          uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/master/${username}`,
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
          console.log('errorstatuscode:' + err.statusCode);
        });
      });

      function updateMaster(_x8, _x9) {
        return _ref7.apply(this, arguments);
      }

      return updateMaster;
    })(),
    share: (() => {
      var _ref8 = _asyncToGenerator(function* (username, body) {
        const options = {
          uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/share/${username}`,
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

      function share(_x10, _x11) {
        return _ref8.apply(this, arguments);
      }

      return share;
    })()
  };
}