import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default subscriptionModel()

function subscriptionModel() {
  const Schema = Mongoose.Schema

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
  })

  return {
    createNew: async function createNew(account) {
      // await validateSchema(objTypes.REQOBJ, pricingPlan) // Let's validate the incoming request for the supported standard
      // add other custom methods for formatting/validation to the schema object like PricingPlanSchema.methods.someMethod = function() {}
      SubscriptionSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      SubscriptionSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const SubscriptionModel = Mongoose.model('subscription', SubscriptionSchema)
      return await datastore.addToStore(new SubscriptionModel(account), SubscriptionModel)
    },
    getAll: async function getAll() {
      const SubscriptionModel = Mongoose.model('subscription', SubscriptionSchema)
      return await datastore.findAll(SubscriptionModel)
    },
    getByID: async function getByID(id) {
      const SubscriptionModel = Mongoose.model('subscription', SubscriptionSchema)
      return await datastore.findOne(SubscriptionModel, id)
    },
    updateByID: async function updateByID(updateAccount, id) {
      console.log("data to update " + JSON.stringify(updateAccount) + "  " + id)

      const SubscriptionModel = Mongoose.model('subscription', SubscriptionSchema)
      return await datastore.upsert(SubscriptionModel, id, updateAccount)
    },
    authenticate: async function authenticate(credentials) {
      const SubscriptionModel = Mongoose.model('subscription', SubscriptionSchema)
      return await datastore.authenticate(SubscriptionModel, credentials)
    }
  }
}
