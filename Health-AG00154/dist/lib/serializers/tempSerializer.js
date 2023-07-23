'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonapiSerializer = require('jsonapi-serializer');

var Transformer = _interopRequireWildcard(_jsonapiSerializer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

exports.default = transform();


function transform() {
  return {
    serialize: (() => {
      var _ref = _asyncToGenerator(function* (tempDocument) {
        return yield new Transformer.Serializer('temp', {
          keyForAttribute: 'camelCase',
          attributes: ['username', 'temp', 'tempArray', 'createdTs', 'deviceId', 'firmwareVersion', 'appVersion', 'phoneModel', 'osVersion', 'batteryLevel'],
          dataMeta: { 'creationDate': tempDocument.creationDate, 'modificationDate': tempDocument.modificationDate }
        }).serialize(tempDocument);
      });

      function serialize(_x) {
        return _ref.apply(this, arguments);
      }

      return serialize;
    })(),
    deserialize: (() => {
      var _ref2 = _asyncToGenerator(function* (tempDocument) {
        return yield new Transformer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(tempDocument);
        // console.log("request in deserializer"+ bpDocument)
      });

      function deserialize(_x2) {
        return _ref2.apply(this, arguments);
      }

      return deserialize;
    })()
  };
}