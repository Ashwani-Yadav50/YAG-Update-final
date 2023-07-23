'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _datastore = require('../../lib/service/db/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nexmosms = require('../../lib/service/sms/nexmosms');

var _nexmosms2 = _interopRequireDefault(_nexmosms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = version();


function version() {
    const Schema = _mongoose2.default.Schema;

    const VersionSchema = new Schema({
        "sanketDocAndroid": { type: String },
        "sanketLifeAndroid": { type: String },
        "sanketDocIos": { type: String },
        "sanketLifeIos": { type: String },
        "banner": { type: String },
        "url": { type: String }
    });

    return {
        createVersion: (() => {
            var _ref = _asyncToGenerator(function* (docAndroid, docIos, lifeAndroid, lifeIos, banner, url) {
                let obj = {
                    "sanketDocAndroid": docAndroid,
                    "sanketLifeAndroid": lifeAndroid,
                    "sanketDocIos": docIos,
                    "sanketLifeIos": lifeIos,
                    "banner": banner,
                    "url": url
                };
                const VersionModel = _mongoose2.default.model('version', VersionSchema);
                const doc = yield _datastore2.default.createVersion(VersionModel, new VersionModel(obj));
                return doc;
            });

            function createVersion(_x, _x2, _x3, _x4, _x5, _x6) {
                return _ref.apply(this, arguments);
            }

            return createVersion;
        })(),
        getVersion: (() => {
            var _ref2 = _asyncToGenerator(function* () {
                const VersionModel = _mongoose2.default.model('version', VersionSchema);
                return yield _datastore2.default.getVersion(VersionModel);
            });

            function getVersion() {
                return _ref2.apply(this, arguments);
            }

            return getVersion;
        })()
    };
}