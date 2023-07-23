import subscription from '../../lib/models/subscription'
import subscriptionSerializer from '../../lib/serializers/subscriptionSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function create(req, res) {
  console.log("Creating user subscription");
  const reqbody = req.swagger.params.subscriptions.value
  try {
    const deserializeData = await subscriptionSerializer.deserialize(reqbody)
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

export async function getAll(req, res) {
  console.log("Get all user subscription")
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

export async function getByID(req, res) {
  console.log("Getting a user's subscription object")
  try {
    const subscriptionByIdResponse = await subscription.getByID(req.swagger.params.username.value)
    res.status(200).json(await subscriptionSerializer.serialize(subscriptionByIdResponse))
  } catch (err) {
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

export async function updateByID(req, res) {
  console.log('updating user subcription object - ' + req.swagger.params.username.value)
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