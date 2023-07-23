import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default masterSubscriptionModel()

function masterSubscriptionModel() {
  const Schema = Mongoose.Schema

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
    keys: [
      String
    ],
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
  })

  return {
    createNew: async function createNew(account) {
      // await validateSchema(objTypes.REQOBJ, pricingPlan) // Let's validate the incoming request for the supported standard
      // add other custom methods for formatting/validation to the schema object like PricingPlanSchema.methods.someMethod = function() {}
      masterSubscriptionSchema.pre('save', function (next) {
        if (this.count) {
          console.log("In count " + this.count)
        }
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      masterSubscriptionSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const SubscriptionModel = Mongoose.model('masterSubscription', masterSubscriptionSchema, 'subscriptions')
      return await datastore.addToStore(new SubscriptionModel(account), SubscriptionModel)
    },
    getAll: async function getAll() {
      const SubscriptionModel = Mongoose.model('masterSubscription', masterSubscriptionSchema, 'subscriptions')
      return await datastore.findAll(SubscriptionModel)
    },
    getByID: async function getByID(id) {
      const SubscriptionModel = Mongoose.model('masterSubscription', masterSubscriptionSchema, 'subscriptions')
      return await datastore.findOne(SubscriptionModel, id)
    },
    updateByID: async function updateByID(updateAccount, id) {
      const SubscriptionModel = Mongoose.model('masterSubscription', masterSubscriptionSchema, 'subscriptions')
      return await datastore.upsert(SubscriptionModel, id, updateAccount)
    },
    authenticate: async function authenticate(credentials) {
      const SubscriptionModel = Mongoose.model('masterSubscription', masterSubscriptionSchema, 'subscriptions')
      return await datastore.authenticate(SubscriptionModel, credentials)
    },
    share: async function share(body, username) {
      const SubscriptionModel = Mongoose.model('masterSubscription', masterSubscriptionSchema, 'subscriptions')
      return await datastore.shareKey(SubscriptionModel, body, username)
    }
  }
}
