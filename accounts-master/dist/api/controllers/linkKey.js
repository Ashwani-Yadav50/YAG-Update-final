'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkAccKey = exports.LinkKey = undefined;

let LinkKey = exports.LinkKey = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log("Generating Key for - " + req.swagger.params.username.value);
    let keys = [];
    const reqbody = req.swagger.params.linkObject.value;
    const name = req.swagger.params.username.value;
    var count = 10;
    for (var a = 1; a <= count; a++) {
      let key = reqbody.data.attributes.username + ":" + reqbody.data.attributes.name + ":" + count + ":" + Date.now();
      keys.push(Buffer.from(key).toString('base64'));
    }
    res.status(200).json(keys);
  });

  return function LinkKey(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let LinkAccKey = exports.LinkAccKey = (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log("Link user creation");
    const reqbody = req.swagger.params.linkObject.value;
    try {
      const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
      const accountResponse = yield _account2.default.createNew(deserializeData);
      res.status(201).send((yield _accountSerializer2.default.serialize(accountResponse)));
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else {
        console.log(err);
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function LinkAccKey(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

var _account = require('../../lib/models/account');

var _account2 = _interopRequireDefault(_account);

var _accountSerializer = require('../../lib/serializers/accountSerializer');

var _accountSerializer2 = _interopRequireDefault(_accountSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }