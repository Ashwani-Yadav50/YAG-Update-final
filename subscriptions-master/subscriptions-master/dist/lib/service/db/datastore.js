'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = datastore();


function datastore() {
  const mongoDBHost = _config2.default.get('MONGODB_HOST');
  const mongoDBPort = _config2.default.get('MONGODB_PORT');
  var options = {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  };
  _mongoose2.default.Promise = _bluebird2.default;
  _mongoose2.default.set('debug', true);
  // _mongoose2.default.connect(`mongodb://${mongoDBHost}:${mongoDBPort}/sanket`, options, function (err, cb) {
  //   if (err) return console.log(err);
  //   console.log("Subscription API connected to Database");
  // });



  // implement new code

const mongooseOptions = {
  useNewUrlParser: true, // Use the new URL string parser
  useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
};
// MongoDB connection URI      
const mongoURI = 'mongodb+srv://agatsa62:OD9sykKylSNhND6y@cluster0.vnegceg.mongodb.net/sanket?authSource=admin';
// Connect to MongoDB
_mongoose2.default.connect(mongoURI, mongooseOptions)
  .then(() => {
    console.log('MongoDB connected successfully!');
    // ... Your application code ...
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });



  
  return {
    addToStore: (() => {
      var _ref = _asyncToGenerator(function* (obj, model) {
        return new Promise(function (resolve, reject) {
          model.findOne({ "username": obj.username }, function (err, doc) {
            if (err) {
              throw new Error('Error while saving data to the database: ', err);
            } else {
              doc ? reject({ "code": 409 }) : resolve({ "Nodata": "found " });
            }
          });
        }).then(function () {
          return new Promise(function (resolve, reject) {
            obj.save(function (err, doc) {
              if (err) {
                throw new Error('Error while saving data to the database: ', err);
              } else {
                resolve(doc);
              }
            });
          });
        });
      });

      function addToStore(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addToStore;
    })(),
    findAll: (() => {
      var _ref2 = _asyncToGenerator(function* (obj) {
        return new Promise(function (resolve, reject) {
          obj.find({}, function (err, doc) {
            if (err) {
              reject(err);
            } else {
              doc ? resolve(doc) : reject('Subscription with id: ' + id + ' not found!');
            }
          });
        });
      });

      function findAll(_x3) {
        return _ref2.apply(this, arguments);
      }

      return findAll;
    })(),
    findOne: (() => {
      var _ref3 = _asyncToGenerator(function* (acc, id) {
        return new Promise(function (resolve, reject) {
          acc.findOne({ username: id }, function (err, doc) {
            if (err) {
              reject(err);
            } else {
              doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
            }
          });
        });
      });

      function findOne(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return findOne;
    })(),
    upsert: (() => {
      var _ref4 = _asyncToGenerator(function* (acc, id, data) {
        return new Promise(function (resolve, reject) {
          acc.findOneAndUpdate({ username: id }, data, function (err, doc) {
            if (err) {
              //throw new Error(err)
              reject(err);
            } else {
              doc ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!');
            }
          });
        });
      });

      function upsert(_x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return upsert;
    })(),
    shareKey: (() => {
      var _ref5 = _asyncToGenerator(function* (acc, body, username) {
        return new Promise(function (resolve, reject) {
          acc.findOne({ "username": username, "shareKey.key": body.key }, function (err, doc2) {
            if (err) {
              throw new Error(err);
            } else {
              doc2 ? reject({ "Already": 'Account with id link:' + body.key + ' already find !' }) : resolve();
            }
          });
        }).then(function () {
          return new Promise(function (resolve, reject) {
            acc.findOneAndUpdate({ "username": username }, { $push: { "shareKey": body } }, { new: true }, function (err, doc) {
              if (err) {
                reject(err);
              } else {
                doc ? resolve(doc) : reject('Subscription with usernme: ' + username + ' not found!');
              }
            });
          });
        });
      });

      function shareKey(_x9, _x10, _x11) {
        return _ref5.apply(this, arguments);
      }

      return shareKey;
    })(),

    authenticate: (() => {
      var _ref6 = _asyncToGenerator(function* (acc, credentials) {
        let temp = credentials.split(" ");
        let buf = new Buffer(temp[1], 'base64'); // create a buffer and tell it the data coming in is base64
        let plain_auth = buf.toString(); // read it back out as a string
        let cred = plain_auth.split(':');
        return new Promise(function (resolve, reject) {
          acc.findOne({ username: cred[0] }, function (err, doc) {
            if (err) {} else {
              if (doc) {
                if (doc.password === cred[1]) {
                  resolve(doc);
                } else {
                  reject("Not autherize");
                }
              } else reject("Not autherize");
            }
          });
        });
      });

      function authenticate(_x12, _x13) {
        return _ref6.apply(this, arguments);
      }

      return authenticate;
    })()
  };
}