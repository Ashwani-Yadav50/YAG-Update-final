'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: '7fd8a21d',
    apiSecret: 'CyCjFpaQfdqZ23Vc'
});

exports.default = sms();


function sms() {
    return {
        sendSMS: (() => {
            var _ref = _asyncToGenerator(function* (username, no, key) {
                console.log('Sending key of -' + username + " to - " + no);
                const from = 'AGATSA';
                const to = '918076185132';
                const text = "Dear Sanket user, Enter the given key in the link section of sanket app. \r\n\nYour Key :- " + key;
                console.log(text);
                nexmo.message.sendSms(from, to, text, function (err, data) {
                    if (err) return err;
                    console.log(data);
                });
                return "sent";
            });

            function sendSMS(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return sendSMS;
        })()
    };
}