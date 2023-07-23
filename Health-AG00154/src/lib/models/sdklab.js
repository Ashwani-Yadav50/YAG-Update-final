import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'

export default sdklabModel()

function sdklabModel() {
        const Schema = Mongoose.Schema

        const SdkLabSchema = new Schema({
                username: {
                        type: String,
                        required: true
                },
                pdfUrl: {
                        type: String,
                        required: true
                },
                createdTs: {
                        type: Date,
                        required: true

                },
                isDeleted: {
                        type: Boolean,
                        default: false
                },
                deviceId:{
                        type:Number
                },
                patientId:{
                        type:String
                }
        })

        return {
                create: async function create(obj) {
                        const sdklabModel = Mongoose.model('sdklabpdf', SdkLabSchema)
                        return await datastore.addTosdkpdf(new sdklabModel(obj))
                },
                changeIsDelete: async function changeIsDelete(url) {
                        const sdklabModel = Mongoose.model('sdklabpdf', SdkLabSchema)
                        return await datastore.changedeletestate(sdklabModel,url)
                },
                findreportlab: async function findreportlab(labusername,deviceId) {
                        const sdklabModel = Mongoose.model('sdklabpdf', SdkLabSchema)
                        return await datastore.findreportlab(sdklabModel,labusername,deviceId)
                },
                findPatientId: async function findPatientId(patientId) {
                        const sdklabModel = Mongoose.model('sdklabpdf', SdkLabSchema)
                        return await datastore.findPatientId(sdklabModel,patientId)
                }
        }
}