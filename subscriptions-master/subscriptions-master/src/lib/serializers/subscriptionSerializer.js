import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (subscriptionDocument) {
      return await new Transformer.Serializer(
      'subscription', {
        keyForAttribute: 'camelCase',
        attributes: ['name', 'username' , 'type', 'validUpto' , 'ecgCounts' , 'usersAllow' , 'subId' ,'createdTs','subscriptionCount','defaultCount'],
        dataMeta:{'creationDate':subscriptionDocument.creationDate , 'modificationDate':subscriptionDocument.modificationDate }
      }).serialize(subscriptionDocument)
      
    },
    deserialize: async function (subscriptionDocument) {
      return await new Transformer.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(subscriptionDocument)
       // console.log("request in deserializer"+ accountDocument)

    },
       error: async function (errorDocument) {
      return await new Transformer.Error(errorDocument)}
  }
}
