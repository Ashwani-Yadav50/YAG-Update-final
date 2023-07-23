import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default stressModel()

function stressModel() {
  const Schema = Mongoose.Schema

  const stressSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    mrr: Number,
    hr: Number,
    rmssd: {
      type: Number,
      required: true
    },
    sdnn: Number,
    pnn50: Number,
    pr: Number,
    qrs: Number,
    qt: Number,
    qtc: Number,
    nn150: Number,
    nn2k: Number,
    minHr: Number,
    maxHr: Number,
    value: [Number],
    rrInterval: [Number],
    arrHr: [Number],
    createdTs: Date,
    lat: String,
    long: String,
    deviceId: String,
    batteryLevel: Number,
    deviceType: String,
    fullReport: Boolean,
    creationDate: Date,
    modificationDate: Date,
    symptoms: String,
    vmRatio:String,
    firmwareVersion:String,
    appVersion:String,
    phoneModel:String,
    osVersion:String,
    patientId:String
  })

  return {
    createNew: async function createNew(account) {
      stressSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      stressSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.addToStore(new stressModel(account))
    },
    getAll: async function getAll() {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.findAll(stressModel)
    },
    updatesymptom: async function updatesymptom(id,symptom) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.updatesymptom(stressModel, id,symptom)
    },
    getByID: async function getByID(id) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.findOne(stressModel, id)
    },
    getStressBystressid: async function getStressBystressid(id) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.getEcgByecgid(stressModel, id)
    },
    getByIDAndUsername: async function getByIDAndUsername(username,deviceId) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.getByIDAndUsername(stressModel, username,deviceId)
    },
    getHealthByID: async function getHealthByID(id) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.findOneByLimit(stressModel, id)
    },
    getStressByDate: async function getStressByDate(username, start, end) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.getStressByDate(stressModel, username, start, end)
    },
    getStressByDevice: async function getStressByDevice(deviceId, start, end) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.getStressByDevice(stressModel, deviceId, start, end)
    },
    deleteStress: async function deleteStress(username, createdTs) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.remove(stressModel, username, createdTs)
    },
    updateByID: async function updateByID(updateAccount, id) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.upsert(AccountModel, id, updateAccount)
    },
    authenticate: async function authenticate(credentials) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.authenticate(AccountModel, credentials)
    },
    updateStress: async function updateStress(ecgId, data) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.changeStatus(stressModel, ecgId, data)
    },
    findLast: async function findLast(deviceId) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.findLast(stressModel, deviceId)
    },
    getStressByDeviceId: async function getStressByDeviceId(id) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.getStressByDeviceId(stressModel, id)
    },
    getCountByUsername: async function getCountByUsername(id) {
      const stressModel = Mongoose.model('stress', stressSchema)
      return await datastore.getCountByUsername(stressModel, id)
    },
  }
}