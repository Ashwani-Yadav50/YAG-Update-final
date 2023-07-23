import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default bpModel()

function bpModel() {
  const Schema = Mongoose.Schema

  const BPSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    diastolic: {
      type: Number,
      required: true
    },
    systolic: {
      type: Number,
      required: true
    },
    diastolicArray: [Number],
    systolicArray: [Number],
    createdTs: {
      type: String
    },
    creationDate: Date,
    modificationDate: Date,
    deviceId: String,
    firmwareVersion: String,
    appVersion: String,
    phoneModel: String,
    osVersion: String,
    batteryLevel: Number,
    bpCondition: String,
    bpRawArray: [Number],
    systolicManualCalib: String,
    diastolicManualCalib: String,
    systolicSystemCalib: String,
    diastolicSystemCalib: String
  })

  return {
    createNew: async function createNew(Bp) {
      BPSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      BPSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      Mongoose.set('debug', true);
      const bpModel = Mongoose.model('BP', BPSchema)
      return await datastore.addToStore(new bpModel(Bp))
    },
    getAll: async function getAll() {
      const bpModel = Mongoose.model('BP', BPSchema)
      return await datastore.findAll(bpModel)
    },
    getByID: async function getByID(id) {
      const bpModel = Mongoose.model('BP', BPSchema)
      return await datastore.findOne(bpModel, id)
    },
    getallbyusername: async function getallbyusername(id) {
      console.log('modal')
      const bpModel = Mongoose.model('BP', BPSchema)
      return await datastore.getallbyusername(bpModel, id)
    },
    getallbydeviceId: async function getallbydeviceId(id) {
      console.log('modal')
      const bpModel = Mongoose.model('BP', BPSchema)
      return await datastore.getallbydeviceId(bpModel, id)
    },
    deleteBp: async function deleteBp(username, createdTs) {
      const bpModel = Mongoose.model('BP', BPSchema)
      return await datastore.remove(bpModel, username, createdTs)
    },
    updateByID: async function updateByID(updateAccount, id) {
      const bpModel = Mongoose.model('BP', BPSchema)
      return await datastore.upsert(bpModel, id, updateAccount)
    },
    authenticate: async function authenticate(credentials) {
      const bpModel = Mongoose.model('BP', BPSchema)
      return await datastore.authenticate(bpModel, credentials)
    },
    getCountByUsername: async function getCountByUsername(id) {
      const bpModel = Mongoose.model('BP', BPSchema)
      return await datastore.getCountByUsername(bpModel, id)
    },
  }
}