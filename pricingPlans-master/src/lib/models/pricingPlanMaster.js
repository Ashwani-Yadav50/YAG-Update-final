import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default pricingPlanMasterModel()

function pricingPlanMasterModel() {
  const Schema = Mongoose.Schema
  const PricingPlanSchema = new Schema({
    plantitle: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    type: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    cost: Number,
    keyCounts: Number,
    hitsAllowed: Number,
    creationDate: Date,
  })

  return {
    createNew: async function createNew(plan) {
      PricingPlanSchema.pre('save', function (next) {
        this.creationDate = new Date()
        next()
      })
      PricingPlanSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const pricingModel = Mongoose.model('pricingModelMaster', PricingPlanSchema, 'pricingmodels')
      return await datastore.addToStore(new pricingModel(plan))
    },
    getAll: async function getAll() {
      const pricingModel = Mongoose.model('pricingModelMaster', PricingPlanSchema, 'pricingmodels')
      return await datastore.findAllMaster(pricingModel)
    },
    getplan: async function getByname(planname) {
      const pricingModel = Mongoose.model('pricingModelMaster', PricingPlanSchema, 'pricingmodels')
      return await datastore.findOne(pricingModel, planname)
    },
    updateByID: async function updateByID(plan, planname) {
      const pricingModel = Mongoose.model('pricingModelMaster', PricingPlanSchema, 'pricingmodels')
      return await datastore.upsert(pricingModel, planname, plan)
    }
  }
}
