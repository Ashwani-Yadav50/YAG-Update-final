import cholesterol from '../../lib/models/cholesterol'
import cholesterolSerializer from '../../lib/serializers/cholesterolSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function createCholesterol(req, res) {
  console.log('Data Entry - cholesterol , username - '+req.swagger.params.username.value)
  const reqbody = req.swagger.params.cholesterolBody.value
  try {
    const deserializeData = await cholesterolSerializer.deserialize(reqbody)
    deserializeData.map(v => v.username = req.swagger.params.username.value)
    const cholesterolResponse = await cholesterol.createNew(deserializeData[0])
    res.status(201).send(await cholesterolSerializer.serialize(cholesterolResponse))
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await bpSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getallcholesterol(req, res) {
  console.log('Getting all cholesterol')
  try {
    const allCholesterolResponse = await cholesterol.getAll()
    res.status(200).json(await cholesterolSerializer.serialize(allCholesterolResponse))
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function deleteCholesterol(req, res) {
  console.log("Deleting cholesterol by createdTs - "+req.swagger.params.createdTs.value+ " By username - "+ req.swagger.params.username.value)
  try {
    const username = req.swagger.params.username.value
    const createdTs = req.swagger.params.createdTs.value
    const deleteCholesterolRequest = await cholesterol.deleteCholesterol(username, createdTs)
    res.status(200).json(deleteCholesterolRequest)

  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function getCholesterolByID(req, res) {
  console.log("Getting cholesterol by username - "+ req.swagger.params.username.value)
  try {
    const accountByIdResponse = await cholesterol.getByID(req.swagger.params.username.value)
    res.status(200).json(await cholesterolSerializer.serialize(accountByIdResponse))
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await bpSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function updateByID(req, res) {
  const reqbody = req.swagger.params.updateAccount.value
  try {
    const deserializeData = await accountSerializer.deserialize(reqbody)
    const accountUpdateResponse = await account.updateByID(deserializeData, req.swagger.params.userId.value)
    res.status(200).json(await accountSerializer.serialize(accountUpdateResponse))
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}