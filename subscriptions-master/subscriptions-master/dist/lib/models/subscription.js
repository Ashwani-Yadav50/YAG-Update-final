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

exports.default = subscriptionModel();


function subscriptionModel() {
  const Schema = _mongoose2.default.Schema;

  const SubscriptionSchema = new Schema({
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
      required: false
    },
    validUpto: {
      type: String,
      required: true,
      default: new Date()
    },
    ecgCounts: {
      type: Number,
      required: true,
      default: 15
    },

    usersAllow: {
      type: Number,
      required: true,
      default: 5
    },
    defaultCount: {
      creationDate: {
        type: Date,
        default: new Date()
      },
      count: {
        type: Number,
        default: 15
      }
    },
    subscriptionCount: {
      creationDate: Date,
      count: Number
    },
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
        SubscriptionSchema.pre('save', function (next) {
          this.creationDate = new Date();
          this.modificationDate = new Date();
          next();
        });

        SubscriptionSchema.set('toJSON', {
          transform: function transform(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
        });
        const SubscriptionModel = _mongoose2.default.model('subscription', SubscriptionSchema);
        return yield _datastore2.default.addToStore(new SubscriptionModel(account), SubscriptionModel);
      });

      function createNew(_x) {
        return _ref.apply(this, arguments);
      }

      return createNew;
    })(),
    getAll: (() => {
      var _ref2 = _asyncToGenerator(function* () {
        const SubscriptionModel = _mongoose2.default.model('subscription', SubscriptionSchema);
        return yield _datastore2.default.findAll(SubscriptionModel);
      });

      function getAll() {
        return _ref2.apply(this, arguments);
      }

      return getAll;
    })(),
    getByID: (() => {
      var _ref3 = _asyncToGenerator(function* (id) {
        const SubscriptionModel = _mongoose2.default.model('subscription', SubscriptionSchema);
        return yield _datastore2.default.findOne(SubscriptionModel, id);
      });

      function getByID(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getByID;
    })(),
    updateByID: (() => {
      var _ref4 = _asyncToGenerator(function* (updateAccount, id) {
        console.log("data to update " + JSON.stringify(updateAccount) + "  " + id);

        const SubscriptionModel = _mongoose2.default.model('subscription', SubscriptionSchema);
        return yield _datastore2.default.upsert(SubscriptionModel, id, updateAccount);
      });

      function updateByID(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return updateByID;
    })(),
    authenticate: (() => {
      var _ref5 = _asyncToGenerator(function* (credentials) {
        const SubscriptionModel = _mongoose2.default.model('subscription', SubscriptionSchema);
        return yield _datastore2.default.authenticate(SubscriptionModel, credentials);
      });

      function authenticate(_x5) {
        return _ref5.apply(this, arguments);
      }

      return authenticate;
    })()
  };
}