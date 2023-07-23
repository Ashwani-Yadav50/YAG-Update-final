'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _azure = require('azure');

var _azure2 = _interopRequireDefault(_azure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = push();


function push() {
  return {
    universalPush: (() => {
      var _ref = _asyncToGenerator(function* (obj, msg) {
        const notificationHubService = _azure2.default.createNotificationHubService('testhub', 'Endpoint=sb://sanketllfe.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=MyWBdXVgZaSORpuDjzbScxCMiLoYtwd/JRX5hnD6wW4=');
        return new Promise(function (resolve, reject) {

          console.log("This is the obj to which we are sending push");
          console.log(obj, msg);
          //sending to android devices
          let payloadAndroid = {
            data: {
              message: msg,
              body: "friend"
            }
          };
          notificationHubService.gcm.send(obj, payloadAndroid, function (error) {
            if (!error) {
              console.log("Notification sent to android devices.");
              resolve();
            } else {
              console.log("Push notification error Android. Error code 2003.");
              //console.log(error);
            }
          });
        }).then(function (resolve, reject) {
          //sending to ios devices
          let payloadIOS = {
            "aps": {
              "alert": msg,
              "sound": "default"

            },
            "acme2": "friend"
          };
          return new Promise(function (resolve, reject) {
            notificationHubService.apns.send(obj, payloadIOS, function (error) {
              if (!error) {
                console.log("Notification sent to IOS devices");
                resolve();
              } else {
                console.log("Push notification error IOS. Error code 2004");
              }
            });
          });
        });
      });

      function universalPush(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return universalPush;
    })()
  };
}