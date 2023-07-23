import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (stressDocument) {
      return await new Transformer.Serializer(
      'stress', {
        keyForAttribute: 'camelCase',
        attributes: ['username', 'rmssd' , 'sdnn','pr','qrs','qt','qtc','maxHr','minHr','nn150','nn2k','rrInterval','arrHr','symptoms', 'pnn50','mmr','hr','lat','long','batteryLevel','createdTs','value','deviceType','vmRatio','fullReport','deviceId','firmwareVersion','appVersion','phoneModel','osVersion','lastRecharge','usageCount','reviewCount','patientId'],
        dataMeta:{'creationDate':stressDocument.creationDate , 'modificationDate':stressDocument.modificationDate }
      }).serialize(stressDocument)
      
    },
    deserialize: async function (stressDocument) {
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(stressDocument)
       // console.log("request in deserializer"+ stressDocument)

    }
  }
}