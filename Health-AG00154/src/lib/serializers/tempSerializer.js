import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (tempDocument) {
      return await new Transformer.Serializer(
      'temp', {
        keyForAttribute: 'camelCase',
        attributes: ['username', 'temp' , 'tempArray','createdTs','deviceId','firmwareVersion','appVersion','phoneModel','osVersion','batteryLevel'],
        dataMeta:{'creationDate':tempDocument.creationDate , 'modificationDate':tempDocument.modificationDate }
      }).serialize(tempDocument)
      
    },
    deserialize: async function (tempDocument) {
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(tempDocument)
       // console.log("request in deserializer"+ bpDocument)

    }
  }
}