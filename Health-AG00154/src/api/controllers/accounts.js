import account from '../../lib/models/account'
import accountSerializer from '../../lib/serializers/accountSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function create(req, res) {
  const reqbody = req.swagger.params.account.value
  try {
    console.log(reqbody)
    const deserializeData = await accountSerializer.deserialize(reqbody)
    const accountResponse = await account.createNew(deserializeData)
    res.status(201).send(await accountSerializer.serialize(accountResponse))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else {
      // TODO: do something better here
      console.log(err)
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getAll(req, res) {
  try {
    const allAccountResponse = await pricingPlan.getAll()
    res.status(200).json(allAccountResponse)
  } catch (err) {
    // TODO: do something better here
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function getByID(req, res) {
  try {
    console.log("sequrityyyy  " + req.swagger.security)
    const accountByIdResponse = await account.getByID(req.swagger.params.userId.value)
    res.status(200).json(await accountSerializer.serialize(accountByIdResponse))
  } catch (err) {
    // TODO: do something better here
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
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