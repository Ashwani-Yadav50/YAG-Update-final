import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/account-model'
import yagmodelSub from '../../lib/models/subscription-model'

// YAG function to save the user's BP data

export async function saveAccount(req, res) {
  const body = req.swagger.params.HealthDataDocument.value
  const result = await yagmodel.save(body)
  if (result.statusCode === 201) {
    const defaultBody = {
      "data": {
        "type": "prime",
        "id": "string",
        "attributes": {
          "name": "default",
          "username": body.data.attributes.username
        },
        "links": {
          "self": "string",
          "next": "string",
          "last": "string"
        },
        "meta": {
          "creationDate": "2017-08-17T12:14:44.358Z",
          "modificationDate": "2017-08-17T12:14:44.358Z"
        },
        "relationships": {},
        "included": {}
      }
    }
    const subscription = await yagmodelSub.save(defaultBody)
    res.status(subscription.statusCode).send(result.body)
  }else{
    res.status(result.statusCode).send(result.body)
  }
}

export async function getAccountByID(req, res) {
  const authheader = req.headers.authorization
  const username = req.swagger.params.username.value
  const result = await yagmodel.getAccountByID(username, authheader)
  if (result.statusCode === 200) {
    const subscription = await yagmodelSub.getAccountByID(username)
    if (subscription.statusCode === 204) {
      let attributes = {
        "name": "string",
        "username": username,
        "type": "string",
        "subId": 1,
        "ecgCounts": 15,
        "usersAllow": 5
      }
      result.body.data.attributes.relationships = attributes
      res.status(result.statusCode).send(result.body)
    }else {
      result.body.data.attributes.relationships = subscription.body.data.attributes
      res.status(result.statusCode).send(result.body)
    }
  }else {
    res.status(result.statusCode).send(result.body)
  }
}

export async function getAccountByPhone(req, res) {
  const phone = req.swagger.params.phone.value
  const result = await yagmodel.getAccountByPhone(phone)
  res.status(result.statusCode).send(result.body)
}

// YAG function to fetch user's BP data

export async function getAllAccount(req, res) {
  const authheader = "Basic YWJoaTAwNTphYmhpbmF2"
  const result = await yagmodel.getAllAccount(authheader)
  res.status(result.statusCode).send(result.body)
}

export async function updateByID(req, res) {
  const username = req.swagger.params.username.value
  const body = req.swagger.params.updateAccount.value
  const result = await yagmodel.update(username, body)
  res.status(result.statusCode).send(result.body)
}
export async function removeSec(req, res) {
  const primary = req.swagger.params.primary.value
  const secondary = req.swagger.params.secondary.value
  const result = await yagmodel.removeSec(primary, secondary)
  //console.log(primary,secondary)
  res.status(result.statusCode).send(result.body)
  //res.status(200).send(true)
}

export async function resetID(req, res) {
  const username = req.swagger.params.username.value
  const result = await yagmodel.resetID(username)
  console.log(result.body)
  res.status(result.statusCode).send(result.body)
}

export async function resetIDNew(req, res) {
  const username = req.swagger.params.username.value
  const phone = req.swagger.params.phone.value
  const result = await yagmodel.resetIDNew(username,phone)
  console.log(result.body)
  res.status(result.statusCode).send(result.body)
}

export async function resetKey(req, res) {
  const key = req.swagger.params.key.value
  const result = await yagmodel.resetKey(key)
  res.status(result.statusCode).send(result.body)
}

export async function createOtp(req, res) {
  const key = req.swagger.params.phonenumber.value
  const result = await yagmodel.createOtp(key)
  res.status(result.statusCode).send(result.body)
}

export async function resetPassword(req, res) {
  const username = req.swagger.params.username.value
  const passwordBody = req.swagger.params.passwordBody.value
  const result = await yagmodel.resetPassword(username, passwordBody)
  res.status(result.statusCode).send(result.body)
}

export async function resetUsername(req, res) {
  const mobile = req.swagger.params.mobile.value
  const result = await yagmodel.resetUsername(mobile)
  res.status(result.statusCode).send(result.body)
}

export async function getversion(req, res) {
  const result = await yagmodel.getversion()
  res.status(result.statusCode).send(result.body)
}

export async function createVersion(req, res) {
  const obj = req.swagger.params.versionbody.value
  const result = await yagmodel.createVersion(obj)
  res.status(result.statusCode).send(result.body)
}

export async function getlablist(req, res) {
  const result = await yagmodel.getlablist()
  res.status(result.statusCode).send(result.body)
}