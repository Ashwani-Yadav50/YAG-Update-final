import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (bpDocument) {
      return await new Transformer.Serializer(
      'BP', {
        keyForAttribute: 'camelCase',
        attributes: ['username', 'diastolic' , 'systolic','createdTs','diastolicArray','systolicArray','deviceId','firmwareVersion','appVersion','phoneModel','osVersion','batteryLevel','bpRawArray','bpCondition','systolicManualCalib','diastolicManualCalib','systolicSystemCalib','diastolicSystemCalib'],
        dataMeta:{'creationDate':bpDocument.creationDate , 'modificationDate':bpDocument.modificationDate }
      }).serialize(bpDocument)
      
    },
    deserialize: async function (bpDocument) {
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(bpDocument)
       // console.log("request in deserializer"+ bpDocument)

    }
  }
}