import account from '../../lib/models/account'
import accountSerializer from '../../lib/serializers/accountSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function LinkKey(req, res) {
  console.log("Generating Key for - " + req.swagger.params.username.value)
  let keys = []
  const reqbody = req.swagger.params.linkObject.value
  const name = req.swagger.params.username.value
  var count = 10;
  for (var a = 1; a <= count; a++) {
    let key = reqbody.data.attributes.username + ":" + reqbody.data.attributes.name + ":" + count + ":" + Date.now()
    keys.push(Buffer.from(key).toString('base64'))
  }
  res.status(200).json(keys)
}

export async function LinkAccKey(req, res) {
  console.log("Link user creation")
  const reqbody = req.swagger.params.linkObject.value
  try {
    const deserializeData = await accountSerializer.deserialize(reqbody)
    const accountResponse = await account.createNew(deserializeData)
    res.status(201).send(await accountSerializer.serialize(accountResponse))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else {
      console.log(err)
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}