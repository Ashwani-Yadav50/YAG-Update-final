'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getlist = undefined;

let getlist = exports.getlist = (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
        console.log("get labuser list");
        try {
            console.log("Secondary");
            getuser(function (data) {
                res.status(200).json({ data: JSON.parse(data) });
            });
        } catch (err) {
            if (err.statusCode) {
                res.status(err.statusCode).json(err.error);
            } else if (err.code) {
                const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
                res.status(409).json(deserializeError);
            } else {
                res.status(500).json(_errorsList.errorsList.accountServiceError);
            }
        }
    });

    return function getlist(_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
})();

var _account = require('../../lib/models/account');

var _account2 = _interopRequireDefault(_account);

var _phonevalid = require('../../lib/models/phonevalid');

var _phonevalid2 = _interopRequireDefault(_phonevalid);

var _verison = require('../../lib/models/verison');

var _verison2 = _interopRequireDefault(_verison);

var _accountSerializer = require('../../lib/serializers/accountSerializer');

var _accountSerializer2 = _interopRequireDefault(_accountSerializer);

var _keyDeserializer = require('../../lib/serializers/keyDeserializer');

var _keyDeserializer2 = _interopRequireDefault(_keyDeserializer);

var _errorsList = require('../../lib/errors/errorsList');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _nexmosms = require('../../lib/service/sms/nexmosms');

var _nexmosms2 = _interopRequireDefault(_nexmosms);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//for git

function getuser(cb) {
    var options = {
        method: 'GET',
        url: 'https://sdklab.blob.core.windows.net/users/labuser.json',
        headers: {
            'Postman-Token': 'd3c18ed9-d7da-4a23-80a1-3bd13182b101',
            'cache-control': 'no-cache'
        }
    };

    (0, _request2.default)(options, (() => {
        var _ref = _asyncToGenerator(function* (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            cb(body);
        });

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    })());
}