import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (accoutDocument) {
      return await new Transformer.Serializer(
      'account', {
        attributes: ['name', 'email', 'dob', 'gender', 'username', 'password' , 'type', 'mobile'],
        dataMeta:{'creationDate':accoutDocument.creationDate , 'modificationDate':accoutDocument.modificationDate }
      }).serialize(accoutDocument)
      
    },
    deserialize: async function (accountDocument) {
      return await new Transformer.Deserializer().deserialize(accountDocument)
       // console.log("request in deserializer"+ accountDocument)

    }
  }
}