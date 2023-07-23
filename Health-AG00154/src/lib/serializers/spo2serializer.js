import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (spo2Document) {
      return await new Transformer.Serializer(
      'spo2', {
        keyForAttribute: 'camelCase',
        attributes: ['username', 'spo2' , 'spo2Array','createdTs','spo2RawArray','deviceId','firmwareVersion','appVersion','phoneModel','osVersion','batteryLevel'],
        dataMeta:{'creationDate':spo2Document.creationDate , 'modificationDate':spo2Document.modificationDate }
      }).serialize(spo2Document)
      
    },
    deserialize: async function (spo2Document) {
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(spo2Document)
       // console.log("request in deserializer"+ bpDocument)

    }
  }
}