import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (ecgDocument) {
      return await new Transformer.Serializer(
      'ecg', {
        keyForAttribute: 'camelCase',
        attributes: ['username', 'hr', 'pr', 'qt', 'qtc', 'qrs','maxHr','minHr','nn150','nn2k','nn150arr','nn2karr','rrInt','rrInterval','arrHr','symptoms','lead1' , 'lead2', 'lead3', 'avL', 'avF', 'avR', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6','mcodeLead1','mcodeLead2','mcodeLead3','mcodeLeadavR','mcodeLeadavF','mcodeLeadavL','mcodeLeadv1','mcodeLeadv2','mcodeLeadv3','mcodeLeadv4','mcodeLeadv5','mcodeLeadv6', 'longLead' ,'createdTs','deviceId','lat','long','leadCount','pdfurl','fullReport','deviceType','batteryLevel','deviceId','usageCount','reviewCount','firmwareVersion','appVersion','phoneModel','osVersion','lastRecharge','isConverted','patientId'],
        dataMeta:{'creationDate':ecgDocument.creationDate , 'modificationDate':ecgDocument.modificationDate }
      }).serialize(ecgDocument)
    },
    deserialize: async function (ecgDocument) {
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(ecgDocument)
       // console.log("request in deserializer"+ ecgDocument)

    }
  }
}