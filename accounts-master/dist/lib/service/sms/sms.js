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
            var _ref = _asyncToGenerator(function* (no, token) {
                sinchSms.send(no, 'Password change request. Follow link to change your password Link:- http://sanketpro.westus.cloudapp.azure.com/yag/account/resetkey/' + token).then(function (response) {
                    //All good, response contains messageId
                    console.log(response);
                }).fail(function (error) {
                    // Some type of error, see error object
                    console.log(error);
                });
            });

            function sendSMS(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return sendSMS;
        })(),
        sendUser: (() => {
            var _ref2 = _asyncToGenerator(function* (no, acc) {
                sinchSms.send(no, 'Dear Sanket User,' + "\r\n" + 'Please find the usernames associated with the mobile number ' + no + '.\r\n\n ' + acc + ' \n\nRegards\nTeam Sanket').then(function (response) {
                    //All good, response contains messageId
                    console.log(response);
                }).fail(function (error) {
                    // Some type of error, see error object
                    console.log(error);
                });
            });

            function sendUser(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return sendUser;
        })()
    };
}