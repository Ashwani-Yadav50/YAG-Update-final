import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'
import nexmosms from '../../lib/service/sms/nexmosms';

export default version()

function version() {
    const Schema = Mongoose.Schema

    const VersionSchema = new Schema({
        "sanketDocAndroid": {type:String},
        "sanketLifeAndroid": {type:String},
        "sanketDocIos": {type:String},
        "sanketLifeIos": {type:String},
        "banner":{type:String},
        "url":{type:String}
    })

    return {
        createVersion: async function createVersion(docAndroid, docIos, lifeAndroid, lifeIos, banner, url) {
            let obj = {
                "sanketDocAndroid":docAndroid,
                "sanketLifeAndroid":lifeAndroid,
                "sanketDocIos":docIos,
                "sanketLifeIos":lifeIos,
                "banner":banner,
                "url":url
            }
            const VersionModel = Mongoose.model('version', VersionSchema)
            const doc = await datastore.createVersion(VersionModel, new VersionModel(obj))
            return doc
        },
        getVersion: async function getVersion() {
            const VersionModel = Mongoose.model('version', VersionSchema)
            return await datastore.getVersion(VersionModel)
          },
    }
}
