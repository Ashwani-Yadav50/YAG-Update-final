import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default cholesterolModel()

function cholesterolModel() {
  const Schema = Mongoose.Schema

  const cholesterolSchema = new Schema({
    username: {
      type: String,
      required: true

    },
    ldl: {
      type: Number,
      required: true
    },
    hdl: Number,
    tri: Number,
    createdTs: Date,
    creationDate: Date,
    modificationDate: Date
  })

  return {
    createNew: async function createNew(cholesterol) {
      cholesterolSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      cholesterolSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const cholesterolModel = Mongoose.model('cholesterol', cholesterolSchema)
      return await datastore.addToStore(new cholesterolModel(cholesterol))
    },
    getAll: async function getAll() {
      const cholesterolModel = Mongoose.model('cholesterol', cholesterolSchema)
      return await datastore.findAll(cholesterolModel)
    },
    getByID: async function getByID(id) {
      const cholesterolModel = Mongoose.model('cholesterol', cholesterolSchema)
      return await datastore.findOne(cholesterolModel, id)
    },
    deleteCholesterol: async function deleteCholesterol(username, createdTs) {
      const cholesterolModel = Mongoose.model('cholesterol', cholesterolSchema)
      return await datastore.remove(cholesterolModel, username, createdTs)
    },
    updateByID: async function updateByID(updateAccount, id) {
      const AccountModel = Mongoose.model('cholesterol', AccountSchema)
      return await datastore.upsert(AccountModel, id, updateAccount)
    },
    authenticate: async function authenticate(credentials) {
      const AccountModel = Mongoose.model('cholesterol', AccountSchema)
      return await datastore.authenticate(AccountModel, credentials)
    }
  }
}