"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const msg9 = require('msg91-sms');

const authkey = "195576Aja9HMgGlG5a6ed97d";
const senderid = "SANKET";
const route = "4";

exports.default = msg91();


function msg91() {
    return {
        sendSMS: (() => {
            var _ref = _asyncToGenerator(function* (dialcode, number, token) {
                return new Promise(function (resolve, reject) {
                    msg9.sendOne(authkey, number, 'Password change request. Follow link to change your password Link:- http://40.83.251.117/yag/account/resetkey/' + token, senderid, route, "0", function (response) {
                        // msg9.sendOne(authkey,"+971507485829",'test by Vipin Mohan',senderid,route,"0",function(response){

                        //Returns Message ID, If Sent Successfully or the appropriate Error Message 
                        console.log(response);
                        resolve(response);
                    });
                });
            });

            function sendSMS(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return sendSMS;
        })(),
        sendUser: (() => {
            var _ref2 = _asyncToGenerator(function* (dialcode, number, acc) {
                return new Promise(function (resolve, reject) {
                    msg9.sendOne(authkey, number, 'Dear Sanket User,' + "\r\n" + 'Please find the usernames associated with the mobile number ' + number + '.\r\n\n ' + acc + ' \n\nRegards\nTeam Sanket', senderid, route, "0", function (response) {

                        //Returns Message ID, If Sent Successfully or the appropriate Error Message 
                        console.log(response);
                        resolve(response);
                    });
                });
            });

            function sendUser(_x4, _x5, _x6) {
                return _ref2.apply(this, arguments);
            }

            return sendUser;
        })()
    };
}