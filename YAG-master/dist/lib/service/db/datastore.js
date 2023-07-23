'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = datastore();


function datastore() {
  const mongoDBHost = _config2.default.get('MONGODB_HOST');
  const mongoDBPort = _config2.default.get('MONGODB_PORT');

  var options = {
    poolSize: 10
  };
  // _mongoose2.default.connect(`mongodb://agatsa62:jksparkle0605@40.83.251.117:4000/sanket?authSource=admin`, options, function (err, cb) {
  //   if (err) return console.log(err);
  //   console.log('hello db from yag');
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


  

  // Mongoose.connection.on(console.error.bind(console, 'Error connecting to MongoDB instance. '))
  return {
    addToStore: (() => {
      var _ref = _asyncToGenerator(function* (obj) {
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

      function addToStore(_x) {
        return _ref.apply(this, arguments);
      }

      return addToStore;
    })(),
    findAll: (() => {
      var _ref2 = _asyncToGenerator(function* () {
        return new Promise(function (resolve, reject) {
          /* store.find({}, (err, doc) => {
            if (err) {
              throw new Error(err)
            } else {
              resolve(doc)
            }
          }) */
        });
      });

      function findAll() {
        return _ref2.apply(this, arguments);
      }

      return findAll;
    })(),
    findOne: (() => {
      var _ref3 = _asyncToGenerator(function* (id) {
        return new Promise(function (resolve, reject) {
          /* store.findOne({_id: id}, (err, doc) => {
            if (err) {
              throw new Error(err)
            } else {
              (doc) ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!')
            }
          }) */
        });
      });

      function findOne(_x2) {
        return _ref3.apply(this, arguments);
      }

      return findOne;
    })()
  };
}