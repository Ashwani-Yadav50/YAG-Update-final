import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default EcgModel()

function EcgModel() {
  const Schema = Mongoose.Schema

  const EcgSchema = new Schema({
    username: {
      type: String,
      required: true

    },
    hr: Number,
    pr: Number,
    qrs: Number,
    qt: Number,
    qtc: Number,
    nn150: Number,
    nn2k: Number,
    nn150arr: [{
      leadName:String,
      value:[Number]
    }],
    nn2karr: [{
      leadName:String,
      value:[Number]
    }],
    minHr: Number,
    maxHr: Number,
    lead1: [Number],
    lead2: [Number],
    lead3: [Number],
    rrInterval: [Number],
    rrInt: [{
      leadName:String,
      value:[Number]
    }],
    arrHr: [Number],
    v1: [Number],
    v2: [Number],
    v3: [Number],
    v4: [Number],
    v5: [Number],
    v6: [Number],
    avL: [Number],
    avR: [Number],
    avF: [Number],
    symptoms: String,
    mcodeLead1: [Number],
    mcodeLead2: [Number],
    mcodeLead3: [Number],
    mcodeLeadavR: [Number],
    mcodeLeadavF: [Number],
    mcodeLeadavL: [Number],
    mcodeLeadv1: [Number],
    mcodeLeadv2: [Number],
    mcodeLeadv3: [Number],
    mcodeLeadv4: [Number],
    mcodeLeadv5: [Number],
    mcodeLeadv6: [Number],
    longLead: [Number],
    deviceId: String,
    batteryLevel: Number,
    leadCount: Number,
    lat: String,
    long: String,
    pdfurl: String,
    createdTs: Date,
    deviceType: String,
    fullReport: Boolean,
    creationDate: Date,
    modificationDate: Date,
    firmwareVersion:String,
    appVersion:String,
    phoneModel:String,
    osVersion:String,
    isConverted:Boolean,
    patientId:String
  })

  return {
    createNew: async function createNew(ecg) {
      EcgSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      EcgSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.addToStore(new EcgModel(ecg))
    },
    getAll: async function getAll(s,e) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.findAll(EcgModel,s,e)
    },
    getEcgByDate: async function getEcgByDate(username, start, end) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.getEcgByDate(EcgModel, username, start, end)
    },
    getEcgByDevice: async function getEcgByDevice(deviceId, start, end) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.getEcgByDevice(EcgModel, deviceId, start, end)
    },
    getByID: async function getByID(id) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.findOne(EcgModel, id)
    },
    getEcgByecgid: async function getEcgByecgid(id) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.getEcgByecgid(EcgModel, id)
    },
    updatesymptom: async function updatesymptom(id,symptom) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.updatesymptom(EcgModel, id,symptom)
    },
    getByIDAndUsername: async function getByIDAndUsername(username,deviceId) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.getByIDAndUsername(EcgModel, username,deviceId)
    },
    getHealthByID: async function getHealthByID(id) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.findOneByLimit(EcgModel, id)
    },
    updateByID: async function updateByID(updateECG, id) {
      const EcgModel = Mongoose.model('account', AccountSchema)
      return await datastore.upsert(EcgModel, id, updateECG)
    },
    deleteECG: async function deleteECG(username, createdTs) {
      console.log("delete ecg name " + createdTs)
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.remove(EcgModel, username, createdTs)
    },
    authenticate: async function authenticate(credentials) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.authenticate(AccountModel, credentials)
    },
    updateEcg: async function updateEcg(ecgId, data) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.changeStatus(EcgModel, ecgId, data)
    },
    findLast: async function findLast(deviceId) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.findLast(EcgModel, deviceId)
    },
    findfw: async function findfw(deviceId) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.findfw(EcgModel, deviceId)
    },
    getEcgsByDeviceId: async function getEcgsByDeviceId(id) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.getEcgsByDeviceId(EcgModel, id)
    },
    getCountByUsername: async function getCountByUsername(id) {
      const EcgModel = Mongoose.model('ecg', EcgSchema)
      return await datastore.getCountByUsername(EcgModel, id)
    },
  }
}