import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (sugarDocument) {
      return await new Transformer.Serializer(
      'sugar', {
        keyForAttribute: 'camelCase',
        attributes: ['username', 'type','value','createdTs'],
        dataMeta:{'creationDate':sugarDocument.creationDate , 'modificationDate':sugarDocument.modificationDate }
      }).serialize(sugarDocument)
      
    },
    deserialize: async function (sugarDocument) {
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(sugarDocument)
       // console.log("request in deserializer"+ sugarDocument)

    }
  }
}