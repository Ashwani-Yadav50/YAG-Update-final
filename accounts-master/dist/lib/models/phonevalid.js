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

exports.default = validModal();


function validModal() {
    const Schema = _mongoose2.default.Schema;

    const ValidSchema = new Schema({
        phone: { type: Number },
        otp: { type: Number }
    });

    return {
        createOtp: (() => {
            var _ref = _asyncToGenerator(function* (phone, otp) {
                let obj = {
                    "phone": phone,
                    "otp": otp
                };
                const ValidModel = _mongoose2.default.model('valid', ValidSchema);
                const doc = yield _datastore2.default.createOtp(ValidModel, new ValidModel(obj));
                let phonee = phone + "";
                let cc = phonee.slice(0, -10);
                console.log("cc = " + cc);
                if (cc == 1) {
                    console.log("usa phone number :- " + phone);
                    _nexmosms2.default.sendUsSMS(phone, otp);
                } else if (cc == 91) {
                    phone = phonee.slice(-10);
                    console.log("phone number :- " + phone);
                    _nexmosms2.default.sendIndSms(phone, otp);
                } else {
                    console.log("usa phone number :- " + phone);
                    _nexmosms2.default.sendUsSMS(phone, otp);
                }
                return doc;
            });

            function createOtp(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return createOtp;
        })()
    };
}