'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accountService = accountService;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = accountService();

// Use the template below to call the REST APIs of other microservices.

function accountService() {
  const accountsHost = _config2.default.get('MS_ACCOUNTS_HOST');
  const accountsPort = _config2.default.get('MS_ACCOUNTS_PORT');
  return {
    getAccountById: (() => {
      var _ref = _asyncToGenerator(function* (accountId) {
        return (0, _requestPromise2.default)({
          uri: `http://${accountsHost}:${accountsPort}/api/v1/accounts/` + accountId,
          json: true,
          resolveWithFullResponse: true,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
          },
          method: 'GET'
        }).then(function (res) {
          return true;
        }).catch(function (err) {
          if (err.statusCode === 404) {
            return false;
          } else {
            console.log(err);
          }
        });
      });

      function getAccountById(_x) {
        return _ref.apply(this, arguments);
      }

      return getAccountById;
    })()
  };
}