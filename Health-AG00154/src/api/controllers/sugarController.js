import sugar from '../../lib/models/sugar'
import sugarSerializer from '../../lib/serializers/sugarSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function createsugar(req, res) {
  console.log('Data Entry - Sugar , username - '+req.swagger.params.username.value)
  const reqbody = req.swagger.params.SugarBody.value
  try {
    const deserializeData = await sugarSerializer.deserialize(reqbody)
    deserializeData.map(v => v.username = req.swagger.params.username.value)
    const sugarResponse = await sugar.createNew(deserializeData[0])
    res.status(201).send(await sugarSerializer.serialize(sugarResponse))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else {
      console.log(err)
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getallsugar(req, res) {
  console.log('Getting all sugar data')
  try {
    const allSugarResponse = await sugar.getAll()
    res.status(200).json(await sugarSerializer.serialize(allSugarResponse))
  } catch (err) {
    // TODO: do something better here
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function getSugarByID(req, res) {
  console.log("Getting sugar by username - "+ req.swagger.params.username.value);
  try {
    const accountByIdResponse = await sugar.getByID(req.swagger.params.username.value)
    res.status(200).json(await sugarSerializer.serialize(accountByIdResponse))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else {
      console.log(err)
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
export async function deleteSugar(req, res) {
  console.log("Deleting Stress by createdTs - "+req.swagger.params.createdTs.value+ " By username - "+ req.swagger.params.username.value)
  try {
    const username = req.swagger.params.username.value
    const createdTs = req.swagger.params.createdTs.value
    const deleteSugarResponse = await sugar.deleteSugar(username, createdTs)
    res.status(200).json(deleteSugarResponse)
  }
  catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}