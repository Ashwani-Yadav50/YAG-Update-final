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
                },
                createdTs: {
                        type: String
                },
                deviceId:{
                        type:Number
                },
                reportType:{
                        type:String
        },
                reportid:{
                        type:String
        },
                firmwareVersion:{
                        type:String
        },
                appVersion:{
                        type:String
        },
                phoneModel:{
                        type:String
        },
                osVersion:{
                        type:String
        },
                comment:{
                        type:String
        }
        })

        return {
                create: async function create(obj) {
                        const sdklabModel = Mongoose.model('reportissue', SdkLabSchema)
                        return await datastore.addTosdkpdf(new sdklabModel(obj))
                }
        }
}