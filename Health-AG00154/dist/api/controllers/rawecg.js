'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRawEcg = undefined;

let createRawEcg = exports.createRawEcg = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    console.log("raw");
    console.log('Data Entry - ECG , username - ' + req.swagger.params.username.value);
    const reqbody = req.swagger.params.ecgBody.value;
    try {
      let ecgResponse = {};
      const deserializeData = yield _ecgSerializer2.default.deserialize(reqbody);
      deserializeData.map(function (v) {
        return v.username = req.swagger.params.username.value;
      });
      ecgResponse = yield _rawEcg2.default.createNew(deserializeData[0]);
      res.status(201).json(deserializeData);
      // res.send('200')
    } catch (err) {
      // console.log(err)
      if (err.statusCode) {
        res.status(err.statusCode).json(err.error);
      } else if (err.NoContent) {
        const deserializeError = yield accountSerializer.error(_errorsList.errorsList.noContentFound);
        res.status(204).json(deserializeError);
      } else if (err.code) {
        const deserializeError = yield bpSerializer.error(_errorsList.errorsList.duplicateIDFound);
        res.status(409).json(deserializeError);
      } else {
        res.status(500).json(_errorsList.errorsList.accountServiceError);
      }
    }
  });

  return function createRawEcg(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _rawEcg = require('../../lib/models/rawEcg');

var _rawEcg2 = _interopRequireDefault(_rawEcg);

var _ecgSerializer = require('../../lib/serializers/ecgSerializer');

var _ecgSerializer2 = _interopRequireDefault(_ecgSerializer);

var _errorsList = require('../../lib/errors/errorsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }