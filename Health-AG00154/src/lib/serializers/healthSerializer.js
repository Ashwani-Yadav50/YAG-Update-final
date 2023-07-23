import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (healthDocument) {
      return await new Transformer.Serializer(
      'health', {
        keyForAttribute: 'camelCase',
        attributes: ['ecg', 'sugar', 'cholesterol', 'stress', 'bp'],
        dataMeta:{'creationDate':healthDocument.creationDate , 'modificationDate':healthDocument.modificationDate }
      }).serialize(healthDocument)
      
    },
    deserialize: async function (healthDocument) {
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(healthDocument)
       // console.log("request in deserializer"+ healthDocument)

    }
  }
}