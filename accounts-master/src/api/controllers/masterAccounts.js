import account from '../../lib/models/master'
import masterSerializer from '../../lib/serializers/masterSerializer.js'
import { errorsList } from '../../lib/errors/errorsList'

export async function createMaster(req, res) {
  console.log("Creating master account")
  const reqbody = req.swagger.params.account.value
  try {
    const deserializeData = await masterSerializer.deserialize(reqbody)
    const accountResponse = await account.createNew(deserializeData)
    res.status(201).send(await masterSerializer.serialize(accountResponse))
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await masterSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getAllMaster(req, res) {
  console.log("Getting all master")
  try {
    const allAccountResponse = await account.getAll()
    res.status(200).json(await masterSerializer.serialize(allAccountResponse))
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await masterSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      console.log("catchgetAll...")
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getMasterID(req, res) {
  console.log("Find by master uername - " + req.swagger.params.userId.value)
  try {
    const accountByIdResponse = await account.getmasterID(req.swagger.params.userId.value)
    res.status(200).json(await masterSerializer.serialize(accountByIdResponse))
  } catch (err) {
    console.log(err)
    if (err.NoContent) {
      const deserializeError = await masterSerializer.error(errorsList.noContentFound)
      res.status(204).json(deserializeError)
    }
    else
      res.status(500).json(errorsList.pricingPlanServiceError)
  }
}
export async function updateMasterByID(req, res) {
  console.log("Updating master obj info - " + req.swagger.params.userId.value)
  const reqbody = req.swagger.params.updateAccount.value
  try {
    const deserializeData = await masterSerializer.deserialize(reqbody)
    const accountUpdateResponse = await account.updateByID(deserializeData, req.swagger.params.userId.value)
    res.status(201).json(await masterSerializer.serialize(accountUpdateResponse))
  } catch (err) {
    console.log(err)
    if (err.NoContent) {
      const deserializeError = await accountSerializer.error(errorsList.noContentFound)
      res.status(204).json(deserializeError)
    }
    else
      res.status(500).json(errorsList.pricingPlanServiceError)
  }
}
