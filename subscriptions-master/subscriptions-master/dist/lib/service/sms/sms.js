'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const sinchSms = require('sinch-sms')({
    key: '20ed497b-eedb-4e30-a6bb-f9d28c940563',
    secret: 'lesOqGhfO0GZrgiis9iuqA=='
});

exports.default = sms();

function sms() {
    return {
        sendSMS: (() => {
            var _ref = _asyncToGenerator(function* (username, no, token) {
                sinchSms.send(no, token).then(function (response) {
                    sinchSms.send(no, 'Dear Sanket User, ' + username + ' wants to link your sanket app. Enter the key received through second SMS in the link section of Sanket user app.Download sanket app  now  Android - https://goo.gl/BGy67f     iOS - https://goo.gl/9YNSb2 ').then(function (response) {
                        console.log(response);
                    }).fail(function (error) {
                        // Some type of error, see error object
                        console.log(error);
                    });

                    console.log(response);
                }).fail(function (error) {
                    // Some type of error, see error object
                    console.log(error);
                });
            });

            function sendSMS(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return sendSMS;
        })()
    };
}