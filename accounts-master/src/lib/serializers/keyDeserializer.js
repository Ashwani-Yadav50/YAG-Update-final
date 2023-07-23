
export default transform()

function transform () {
  return {
     deserialize: async function (key) {
      const data = {}

      console.log(key)
      let buf = new Buffer(key, 'base64') // create a buffer and tell it the data coming in is base64
      let plain_auth = buf.toString()     // read it back out as a string
      console.log("Decoded Authorization ", plain_auth)
      let cred = plain_auth.split(':')
      // console.log("username "+cred[0]+"name "+cred[1]+"count "+cred[2])
      data.username = cred[0]
      data.name = cred[1]
      data.count = cred[2]
      data.key = key
      data.portal = cred[3]
      console.log(data)
      return data
      }
    }
  }