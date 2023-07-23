'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = mailer();


function mailer() {
    return {
        send: (() => {
            var _ref = _asyncToGenerator(function* (mail, html) {
                const smtpConfig = {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // use SSL
                    auth: {
                        user: 'info@sanketlife.com',
                        pass: 'agatsa1#5'
                    }
                };

                const transporter = _nodemailer2.default.createTransport(smtpConfig);
                const mailData = {
                    from: 'sanketagatsa@gmail.com',
                    to: mail, //mail
                    subject: 'Reset your Sanket password', //sub
                    //text: text1,
                    html: html
                };
                return new Promise(function (resolve, reject) {
                    transporter.sendMail(mailData, function (error, obj) {
                        if (error) {
                            console.log("Error code 3844");
                            reject(error);
                        } else {
                            console.log('Message %s sent: %s', info.messageId, info.response);
                            resolve('Message %s sent: %s', info.messageId, info.response);
                        }
                    });
                });
            });

            function send(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return send;
        })(),
        read: (() => {
            var _ref2 = _asyncToGenerator(function* (token) {
                const link = `http://40.83.251.117:80/yag/account/resetkey/${token}`;
                return new Promise(function (resolve, reject) {
                    _fs2.default.readFile('./src/lib/service/mail/Password_Reset.txt', function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            //console.log(link)
                            const text = data.toString();
                            const html = text.replace('Password_Change_HERE', link);
                            resolve(html);
                        }
                    });
                });
            });

            function read(_x3) {
                return _ref2.apply(this, arguments);
            }

            return read;
        })()
    };
}