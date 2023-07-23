import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default spo2Model()

function spo2Model() {
    const Schema = Mongoose.Schema

    const spo2Schema = new Schema({
        username: {
            type: String,
            required: true
        },
        spo2: Number,
        spo2Array: [Number],
        spo2RawArray: [Number],
        createdTs: Date,
        deviceId: String,
        firmwareVersion: String,
        appVersion: String,
        phoneModel: String,
        osVersion: String,
        batteryLevel: Number
    })

    return {
        createNew: async function createNew(account) {
            spo2Schema.pre('save', function (next) {
                this.creationDate = new Date()
                this.modificationDate = new Date()
                next()
            })

            spo2Schema.set('toJSON', {
                transform: function (doc, ret, options) {
                    ret.id = ret._id
                    delete ret._id
                    delete ret.__v
                }
            })
            const spo2Model = Mongoose.model('spo2', spo2Schema)
            return await datastore.addToStore(new spo2Model(account))
        },
        getAll: async function getAll() {
            const spo2Model = Mongoose.model('spo2', spo2Schema)
            return await datastore.findAll(spo2Model)
        },
        updatesymptom: async function updatesymptom(id, symptom) {
            const spo2Model = Mongoose.model('spo2', spo2Schema)
            return await datastore.updatesymptom(spo2Model, id, symptom)
        },
        getByID: async function getByID(id) {
            const spo2Model = Mongoose.model('spo2', spo2Schema)
            return await datastore.findOne(spo2Model, id)
        },
        getallbyusername: async function getallbyusername(id) {
            console.log('modal')
            const spo2Model = Mongoose.model('spo2', spo2Schema)
            return await datastore.getallbyusername(spo2Model, id)
        },
        getallbydeviceId: async function getallbydeviceId(id) {
            console.log('modal')
            const spo2Model = Mongoose.model('spo2', spo2Schema)
            return await datastore.getallbydeviceId(spo2Model, id)
        },
        getCountByUsername: async function getCountByUsername(id) {
            const spo2Model = Mongoose.model('spo2', spo2Schema)
            return await datastore.getCountByUsername(spo2Model, id)
        },
    }
}