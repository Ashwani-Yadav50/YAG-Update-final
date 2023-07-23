import subscription from '../../lib/models/masterSubscription'
import sms from '../../lib/service/sms/sms'
import nexon from '../../lib/service/sms/nexmo'
import subscriptionSerializer from '../../lib/serializers/masterSubscriptionSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function createMaster(req, res) {
  console.log("Creating master user")
  const reqbody = req.swagger.params.subscriptions.value
  try {
    const deserializeData = await subscriptionSerializer.deserialize(reqbody)
    let keyss = []
    const username = deserializeData.username
    console.log("Creating with - "+username)
    const name = deserializeData.name
    const count = deserializeData.keyCounts.count
    const portal = deserializeData.keyCounts.portal
    for (var a = 1; a <= count; a++) {
      let key = username + ":" + name + ":" + a + ":" + portal + ":" + Date.now()
      keyss.push(Buffer.from(key).toString('base64'))
    }
    deserializeData.keys = keyss
    const subscriptionResponse = await subscription.createNew(deserializeData)
    res.status(201).send(await subscriptionSerializer.serialize(subscriptionResponse))
  }
  catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await subscriptionSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getAllMaster(req, res) {
  console.log("Getting all masters")
  try {
    const allSubscriptionResponse = await subscription.getAll()
    res.status(200).json(await subscriptionSerializer.serialize(allSubscriptionResponse))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await subscriptionSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getMasterByID(req, res) {
  console.log("Getting a master user - "+ req.swagger.params.username.value);
  try {
    const subscriptionByIdResponse = await subscription.getByID(req.swagger.params.username.value)
    res.status(200).json(await subscriptionSerializer.serialize(subscriptionByIdResponse))
  } catch (err) {
    //console.log(err)
    if (err.NoContent) {
      const deserializeError = await subscriptionSerializer.error(errorsList.noContentFound)
      res.status(204).json(deserializeError)
    }
    else if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await subscriptionSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}
export async function updateMasterByID(req, res) {
  console.log("Updating a master user - "+ req.swagger.params.username.value)
  const reqbody = req.swagger.params.updateSubscription.value
  try {
    const deserializeData = await subscriptionSerializer.deserialize(reqbody)
    const subscriptionUpdateResponse = await subscription.updateByID(deserializeData, req.swagger.params.username.value)
    res.status(200).json(await subscriptionSerializer.serialize(subscriptionUpdateResponse))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await subscriptionSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function share(req, res) {
  console.log("Sharing master link key of - "+ req.swagger.params.username.value);
  const reqbody = req.swagger.params.shareSub.value
  const username = req.swagger.params.username.value
  try {
    const subscriptionUpdateResponse = await subscription.share(reqbody, username)
    nexon.sendSMS(username, reqbody.number, reqbody.key)
    res.status(200).json(subscriptionUpdateResponse)
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await subscriptionSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else if (err.Already) {
      const deserializeError = await subscriptionSerializer.error(errorsList.duplicateIDFound)
      res.status(208).json(deserializeError)
    }
    else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}