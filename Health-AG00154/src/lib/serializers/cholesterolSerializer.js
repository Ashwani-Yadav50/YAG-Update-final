import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (cholesterolDocument) {
      return await new Transformer.Serializer(
      'Cholesterol', {
        keyForAttribute: 'camelCase',
        attributes: ['username', 'ldl' , 'hdl','tri' , 'createdTs'],
        dataMeta:{'creationDate':cholesterolDocument.creationDate , 'modificationDate':cholesterolDocument.modificationDate }
      }).serialize(cholesterolDocument)
      
    },
    deserialize: async function (cholesterolDocument) {
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(cholesterolDocument)
       // console.log("request in deserializer"+ cholesterolDocument)

    }
  }
}