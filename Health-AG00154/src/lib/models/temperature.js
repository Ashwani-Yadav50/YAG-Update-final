import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default tempModel()

function tempModel() {
    const Schema = Mongoose.Schema

    const tempSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        temp: Number,
        tempArray: [Number],
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
            tempSchema.pre('save', function (next) {
                this.creationDate = new Date()
                this.modificationDate = new Date()
                next()
            })

            tempSchema.set('toJSON', {
                transform: function (doc, ret, options) {
                    ret.id = ret._id
                    delete ret._id
                    delete ret.__v
                }
            })
            const tempModel = Mongoose.model('temperature', tempSchema)
            return await datastore.addToStore(new tempModel(account))
        },
        getByID: async function getByID(id) {
            const tempModel = Mongoose.model('temperature', tempSchema)
            return await datastore.findOne(tempModel, id)
        },
        getallbyusername: async function getallbyusername(id) {
            console.log('modal')
            const tempModel = Mongoose.model('temperature', tempSchema)
            return await datastore.getallbyusername(tempModel, id)
        },
        getallbydeviceId: async function getallbydeviceId(id) {
            console.log('modal')
            const tempModel = Mongoose.model('temperature', tempSchema)
            return await datastore.getallbydeviceId(tempModel, id)
        },
        getCountByUsername: async function getCountByUsername(id) {
            const tempModel = Mongoose.model('temperature', tempSchema)
            return await datastore.getCountByUsername(tempModel, id)
        },
    }
}