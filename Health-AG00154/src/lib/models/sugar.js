import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default sugarModel()

function sugarModel() {
  const Schema = Mongoose.Schema

  const SugarSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true

    },
    createdTs: Date,
    creationDate: Date,
    modificationDate: Date
  })

  return {
    createNew: async function createNew(sugar) {
      SugarSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      SugarSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const SugarModel = Mongoose.model('sugar', SugarSchema)
      return await datastore.addToStore(new SugarModel(sugar))
    },
    getAll: async function getAll() {
      const SugarModel = Mongoose.model('sugar', SugarSchema)
      return await datastore.findAll(SugarModel)
    },
    deleteSugar: async function deleteSugar(username, createdTs) {
      const SugarModel = Mongoose.model('sugar', SugarSchema)
      return await datastore.remove(SugarModel, username, createdTs)
    },
    getByID: async function getSugarByID(id) {
      const SugarModel = Mongoose.model('sugar', SugarSchema)
      return await datastore.findOne(SugarModel, id)
    },
    updateByID: async function updateByID(updateAccount, id) {
      const SugarModel = Mongoose.model('sugar', SugarSchema)
      return await datastore.upsert(SugarModel, id, updateAccount)
    },
    authenticate: async function authenticate(credentials) {
      const SugarModel = Mongoose.model('sugar', SugarSchema)
      return await datastore.authenticate(SugarModel, credentials)
    }
  }
}