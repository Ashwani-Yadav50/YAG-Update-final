import account from '../../lib/models/account'
import accountSerializer from '../../lib/serializers/accountSerializer'
import {errorsList} from '../../lib/errors/errorsList'

export async function searchAll (req, res) {
  console.log("Search all - "+req.swagger.params.user.value)
  try {
    const allAccountResponse = await account.findAllByID(req.swagger.params.user.value)
    res.status(200).json(await accountSerializer.serialize(allAccountResponse))
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function Add (req, res) {
   const reqbody = req.swagger.params.linkObject.value
   console.log("Adding follower to - "+ req.swagger.params.user.value)
  try {
    const deserializeData = await accountSerializer.deserialize(reqbody)
    const allAccountResponse = await account.Add(deserializeData,req.swagger.params.user.value)
    res.status(201).json(await accountSerializer.serialize(allAccountResponse))
  } catch (err) {
    console.log(err)
    if(err.Already){
      const deserializeError = await accountSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    }
    else
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function Accept (req, res) {
   const reqbody = req.swagger.params.linkObject.value
   console.log("Accept request - "+ req.swagger.params.user.value)
  try {
    const deserializeData = await accountSerializer.deserialize(reqbody)
    const allAccountResponse = await account.Accept(deserializeData,req.swagger.params.user.value)
    res.status(201).json(await accountSerializer.serialize(allAccountResponse))
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function Delete (req, res) {
   const reqbody = req.swagger.params.linkObject.value
   console.log("Deleting linked user - "+ req.swagger.params.username.value)
  try {
    const deserializeData = await accountSerializer.deserialize(reqbody)
    const allAccountResponse = await account.Delete (deserializeData,req.swagger.params.username.value)
    res.status(201).json(await accountSerializer.serialize(allAccountResponse))
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}