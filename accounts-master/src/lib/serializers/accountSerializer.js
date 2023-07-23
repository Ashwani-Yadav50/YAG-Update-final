import * as Transformer from 'jsonapi-serializer'

export default transform()

function transform () {
  return {
    serialize: async function (accoutDocument) {
      return await new Transformer.Serializer(
      'accounts', {
        attributes: ['name', 'lastname' ,'type', 'username', 'gender', 'userType','dob', 'profilePic', 'primaryUser' ,'bloodGroup','symptoms' ,'height' , 'weight' ,'patientId', 'email', 'countrycode' , 'mobile', 'smoker','diabetic','alcoholic','isHeartPatient','following','follower','linkedAccounts','links','secondary'],
        dataMeta:{'creationDate':accoutDocument.creationDate , 'modificationDate':accoutDocument.modificationDate },
        keyForAttribute: 'camelCase',
      }).serialize(accoutDocument)
      
    },
    deserialize: async function (accountDocument) {
      return await new Transformer.Deserializer({keyForAttribute: 'camelCase'}).deserialize(accountDocument)
       // console.log("request in deserializer"+ accountDocument)

    },
    error: async function (errorDocument) {
      return await new Transformer.Error(errorDocument)

    }  
  }
}
