import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (accountDocument) {
      return await new Transformer.Serializer(
      'accounts', {
        attributes: ['name','lastname', 'type', 'username', 'linkedUsers', 'subscribers', 'email', 'countrycode' ,'mobile','portal'],
        dataMeta:{'creationDate':accountDocument.creationDate , 'modificationDate':accountDocument.modificationDate },
        keyForAttribute: 'camelCase',
      }).serialize(accountDocument)
      
    },
    deserialize: async function (accountDocument) {
       console.log("request in deserializer"+ accountDocument)
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(accountDocument)
       // console.log("request in deserializer"+ accountDocument)
    },
    error: async function (errorDocument) {
      return await new Transformer.Error(errorDocument)

    }  
  }
}
