import * as Transformer from 'jsonapi-serializer'

// Create serializer/deserializers here to convert the database object to the JSON API Specification.
// This could be done in the Backend For Frontend also but doing this here will require the BFF to not make many calls to individual microservices for data and its metadata.

export default transform()

function transform () {
  return {
    serialize: async function (planDocument) {
      return await new Transformer.Serializer(
      'pricingPlan', {
        keyForAttribute:'camelCase',
        attributes: ['plantitle', 'type', 'description', 'cost', 'keyCounts', 'hitsAllowed']
      }).serialize(planDocument)
    },

    deserialize: async function (pricingplanDocument) {
      return await new Transformer.Deserializer({keyForAttribute:'camelCase'}).deserialize(pricingplanDocument)
       // console.log("request in deserializer"+ accountDocument)

    }
  }
}
