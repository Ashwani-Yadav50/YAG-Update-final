import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default masterAccountModel()

function masterAccountModel() {
  const Schema = Mongoose.Schema

  const AccountSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: true,
      default: "master"
    },
    username: {
      type: String,
      required: true

    },
    password: {
      type: String,
      required: true
    },
    linkedUsers: [
      {
        username: { type: String, required: false },
        name: { type: String, required: false },
        state: { type: Number, required: false, default: 0 }
      }
    ],
    subscribers: [{
      username: { type: String, required: false },
      name: { type: String, required: false },
      key: { type: String, required: false }
    }],
    portal: Boolean,
    countrycode: String,
    mobile: Number,
    email: String,
    address: String,
    creationDate: Date,
    modificationDate: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
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
      const AccountModel = Mongoose.model('master', AccountSchema, "accounts")
      return await datastore.addToStore(AccountModel, new AccountModel(account))
    },
    getAll: async function getAll() {
      const AccountModel = Mongoose.model('master', AccountSchema, "accounts")
      return await datastore.findMaster(AccountModel)
    },
    getByID: async function getByID(id) {
      const AccountModel = Mongoose.model('master', AccountSchema, "accounts")
      return await datastore.findOne(AccountModel, id)
    },
    getmasterID: async function getmasterID(id) {
      const AccountModel = Mongoose.model('master', AccountSchema, "accounts")
      return await datastore.findOnemaster(AccountModel, id)
    },
    updateByID: async function updateByID(updateAccount, id) {
      console.log("data to update " + JSON.stringify(updateAccount) + "  " + id)
      const AccountModel = Mongoose.model('master', AccountSchema, "accounts")
      return await datastore.upsert(AccountModel, id, updateAccount)
    },

  }
}
