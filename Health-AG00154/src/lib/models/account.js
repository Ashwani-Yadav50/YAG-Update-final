import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default accountModel()

function accountModel() {
  const Schema = Mongoose.Schema

  const AccountSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true

    },
    password: {
      type: String,
      required: true
    },
    mobile: Number,
    email: String,
    dob: String,
    gender: String,
    creationDate: Date,
    modificationDate: Date
  })

  return {
    createNew: async function createNew(account) {
      AccountSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      AccountSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.addToStore(new AccountModel(account))
    },
    getAll: async function getAll() {
      return await datastore.findAll()
    },
    getByID: async function getByID(id) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.findOne(AccountModel, id)
    },
    updateByID: async function updateByID(updateAccount, id) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.upsert(AccountModel, id, updateAccount)
    },
    authenticate: async function authenticate(credentials) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.authenticate(AccountModel, credentials)
    }
  }
}