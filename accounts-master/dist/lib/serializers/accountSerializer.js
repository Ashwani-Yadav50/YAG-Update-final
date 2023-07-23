'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var Transformer = _interopRequireWildcard(_jsonapiSerializer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = transform();


function transform() {
  return {
    serialize: (() => {
      var _ref = _asyncToGenerator(function* (accoutDocument) {
        return yield new Transformer.Serializer('accounts', {
          attributes: ['name', 'lastname', 'type', 'username', 'gender', 'userType', 'dob', 'profilePic', 'primaryUser', 'bloodGroup', 'symptoms', 'height', 'weight', 'patientId', 'email', 'countrycode', 'mobile', 'smoker', 'diabetic', 'alcoholic', 'isHeartPatient', 'following', 'follower', 'linkedAccounts', 'links', 'secondary'],
          dataMeta: { 'creationDate': accoutDocument.creationDate, 'modificationDate': accoutDocument.modificationDate },
          keyForAttribute: 'camelCase'
        }).serialize(accoutDocument);
      });

      function serialize(_x) {
        return _ref.apply(this, arguments);
      }

      return serialize;
    })(),
    deserialize: (() => {
      var _ref2 = _asyncToGenerator(function* (accountDocument) {
        return yield new Transformer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(accountDocument);
        // console.log("request in deserializer"+ accountDocument)
      });

      function deserialize(_x2) {
        return _ref2.apply(this, arguments);
      }

      return deserialize;
    })(),
    error: (() => {
      var _ref3 = _asyncToGenerator(function* (errorDocument) {
        return yield new Transformer.Error(errorDocument);
      });

      function error(_x3) {
        return _ref3.apply(this, arguments);
      }

      return error;
    })()
  };
}