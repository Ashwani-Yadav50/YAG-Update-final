'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = transform();


function transform() {
  return {
    deserialize: (() => {
      var _ref = _asyncToGenerator(function* (key) {
        const data = {};

        console.log(key);
        let buf = new Buffer(key, 'base64'); // create a buffer and tell it the data coming in is base64
        let plain_auth = buf.toString(); // read it back out as a string
        console.log("Decoded Authorization ", plain_auth);
        let cred = plain_auth.split(':');
        // console.log("username "+cred[0]+"name "+cred[1]+"count "+cred[2])
        data.username = cred[0];
        data.name = cred[1];
        data.count = cred[2];
        data.key = key;
        data.portal = cred[3];
        console.log(data);
        return data;
      });

      function deserialize(_x) {
        return _ref.apply(this, arguments);
      }

      return deserialize;
    })()
  };
}