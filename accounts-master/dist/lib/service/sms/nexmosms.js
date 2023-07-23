'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Nexmo = require('nexmo');
const shortUrl = require('node-url-shortener');
var request = require("request");

const nexmo = new Nexmo({
    apiKey: '7fd8a21d',
    apiSecret: 'CyCjFpaQfdqZ23Vc'
});

exports.default = sms();


function sms() {
    return {
        sendSMS: (() => {
            var _ref = _asyncToGenerator(function* (no, otp) {
                console.log('sending verification msg');
                console.log(no);
                const from = 'AGATSA';
                const to = no;
                const text = 'Your verification code is ' + otp;
                nexmo.message.sendSms(from, to, text, function (err, data) {
                    if (err) return err;
                    console.log(data);
                });
                return "sent";
            });

            function sendSMS(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return sendSMS;
        })(),
        sendUsSMS: (() => {
            var _ref2 = _asyncToGenerator(function* (no, otp) {
                console.log('sending verification msg');
                const from = '12013505294';
                const to = no;
                const text = 'Your verification code is ' + otp;
                nexmo.message.sendSms(from, to, text, function (err, data) {
                    if (err) return err;
                    console.log(data);
                });
                return "sent";
            });

            function sendUsSMS(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return sendUsSMS;
        })(),
        sendIndSms: (() => {
            var _ref3 = _asyncToGenerator(function* (no, otp) {
                var options = {
                    method: 'POST',
                    url: 'https://www.alcodes.com/api/sms-compose',
                    headers: {
                        'Postman-Token': '547d402f-d74a-4d43-ab99-cad0871fc01a',
                        'cache-control': 'no-cache',
                        Authorization: 'Basic MGNhYzFiNDYtZjIwNy00MDM4LWE5NzAtZmYxNzk4ODhiMjA0OnBhc3N3ZA==',
                        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                    },
                    formData: {
                        countryCode: 'IN',
                        smsSenderId: 'AGATSA',
                        is_otp: 'true',
                        message: 'Your otp is ' + otp,
                        phoneNumbers: no
                    }
                };

                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    console.log(body);
                    return "sent";
                });
            });

            function sendIndSms(_x5, _x6) {
                return _ref3.apply(this, arguments);
            }

            return sendIndSms;
        })(),
        passwordReset: (() => {
            var _ref4 = _asyncToGenerator(function* (no, otp) {
                console.log('sending password reset msg');
                const from = 'AGATSA';
                const to = no;
                shortUrl.short("http://sanketpro.westus.cloudapp.azure.com/yag/account/resetkey/" + otp, function (err, url) {
                    //console.log(url);
                    const text = 'Password change request. Follow link to change your password Link:-' + url;
                    //console.log(text)
                    nexmo.message.sendSms(from, to, text, (err, data) => {
                        if (err) return err;
                        console.log(data);
                    });
                });

                return "sent";
            });

            function passwordReset(_x7, _x8) {
                return _ref4.apply(this, arguments);
            }

            return passwordReset;
        })(),
        usernameReset: (() => {
            var _ref5 = _asyncToGenerator(function* (no, otp) {
                console.log('sending username reset msg');
                const from = 'AGATSA';
                const to = no;
                const text = 'Dear Sanket User,' + "\r\n" + 'Please find the usernames associated with the mobile number ' + no + '.\r\n\n ' + otp + ' \n\nRegards\nTeam Sanket';
                //console.log(text)
                nexmo.message.sendSms(from, to, text, function (err, data) {
                    if (err) return err;
                    console.log(data);
                });
                return "sent";
            });

            function usernameReset(_x9, _x10) {
                return _ref5.apply(this, arguments);
            }

            return usernameReset;
        })()
    };
}