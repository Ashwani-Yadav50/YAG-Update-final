'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datastore = require('../../lib/service/db/datastore');

var _datastore2 = _interopRequireDefault(_datastore);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = masterSubscriptionModel();


function masterSubscriptionModel() {
  const Schema = _mongoose2.default.Schema;

  const masterSubscriptionSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: "master"
    },
    validUpto: {
      type: String,
      required: true,
      default: new Date()
    },
    hitsAllowed: {
      type: Number,
      required: true,
      default: 500
    },

    keyCounts: {
      creationDate: {
        type: Date,
        default: new Date()
      },
      count: {
        type: Number,
        default: 10
      }
    },
    keys: [String],
    shareKey: [{
      key: String,
      number: String,
      creationDate: Date,
      State: {
        type: Number,
        default: 0
      }
    }],
    subId: {
      type: String,
      required: true,
      default: "default"
    },
    creationDate: Date,
    modificationDate: Date
  });

  return {
    createNew: (() => {
      var _ref = _asyncToGenerator(function* (account) {
        // await validateSchema(objTypes.REQOBJ, pricingPlan) // Let's validate the incoming request for the supported standard
        // add other custom methods for formatting/validation to the schema object like PricingPlanSchema.methods.someMethod = function() {}
        masterSubscriptionSchema.pre('save', function (next) {
          if (this.count) {
            console.log("In count " + this.count);
          }
          this.creationDate = new Date();
          this.modificationDate = new Date();
          next();
        });

        masterSubscriptionSchema.set('toJSON', {
          transform: function transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
        });
        const SubscriptionModel = _mongoose2.default.model('masterSubscription', masterSubscriptionSchema, 'subscriptions');
        return yield _datastore2.default.addToStore(new SubscriptionModel(account), SubscriptionModel);
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    getAll: (() => {
      var _ref2 = _asyncToGenerator(function* () {
        const SubscriptionModel = _mongoose2.default.model('masterSubscription', masterSubscriptionSchema, 'subscriptions');
        return yield _datastore2.default.findAll(SubscriptionModel);
      });

      function getAll() {
        return _ref2.apply(this, arguments);
      }

      return getAll;
    })(),
    getByID: (() => {
      var _ref3 = _asyncToGenerator(function* (id) {
        const SubscriptionModel = _mongoose2.default.model('masterSubscription', masterSubscriptionSchema, 'subscriptions');
        return yield _datastore2.default.findOne(SubscriptionModel, id);
      });

      function getByID(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getByID;
    })(),
    updateByID: (() => {
      var _ref4 = _asyncToGenerator(function* (updateAccount, id) {
        const SubscriptionModel = _mongoose2.default.model('masterSubscription', masterSubscriptionSchema, 'subscriptions');
        return yield _datastore2.default.upsert(SubscriptionModel, id, updateAccount);
      });

      function updateByID(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return updateByID;
    })(),
    authenticate: (() => {
      var _ref5 = _asyncToGenerator(function* (credentials) {
        const SubscriptionModel = _mongoose2.default.model('masterSubscription', masterSubscriptionSchema, 'subscriptions');
        return yield _datastore2.default.authenticate(SubscriptionModel, credentials);
      });

      function authenticate(_x5) {
        return _ref5.apply(this, arguments);
      }

      return authenticate;
    })(),
    share: (() => {
      var _ref6 = _asyncToGenerator(function* (body, username) {
        const SubscriptionModel = _mongoose2.default.model('masterSubscription', masterSubscriptionSchema, 'subscriptions');
        return yield _datastore2.default.shareKey(SubscriptionModel, body, username);
      });

      function share(_x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return share;
    })()
  };
}