import pricingPlan from '../../lib/models/pricingPlan'
import pricingPlanSerializer from '../../lib/serializers/planSerializer'
import pricingPlanMaster from '../../lib/models/pricingPlanMaster'
import pricingPlanMasterSerializer from '../../lib/serializers/planMasterSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function createplan(req, res) {
  console.log("Creating a pricing plan")
  const reqbody = req.swagger.params.pricingplan.value
  try {
    const deserializeData = await pricingPlanSerializer.deserialize(reqbody)
    const pricingPlanResponse = await pricingPlan.createNew(deserializeData[0])
    const serializedPlanResponse = await pricingPlanSerializer.serialize(pricingPlanResponse)
    res.status(201).send(serializedPlanResponse)
  }
  catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      res.status(409).json(errorsList.duplicateID)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}
export async function createMasterPlan(req, res) {
  console.log("Creating master Pricing plan")
  const reqbody = req.swagger.params.pricingplan.value
  try {
    const deserializeData = await pricingPlanMasterSerializer.deserialize(reqbody)
    const pricingPlanResponse = await pricingPlanMaster.createNew(deserializeData[0])
    const serializedPlanResponse = await pricingPlanMasterSerializer.serialize(pricingPlanResponse)
    res.status(201).send(serializedPlanResponse)
  }
  catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      res.status(409).json(errorsList.duplicateID)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getAll(req, res) {
  console.log("Getting all pricing plans")
  try {
    const pricingPlanResponse = await pricingPlan.getAll()
    const serializedPlanResponse = await pricingPlanSerializer.serialize(pricingPlanResponse)
    res.status(200).json(serializedPlanResponse)
  } catch (err) {
    res.status(err.statusCode).json(err.error)
  }
}

export async function getplan(req, res) {
  console.log("Getting a plan - " + req.swagger.params.plan.value)
  try {
    const pricingPlanResponse = await pricingPlan.getplan(req.swagger.params.plan.value)
    const serializedPlanResponse = await pricingPlanSerializer.serialize(pricingPlanResponse)
    res.status(200).json(serializedPlanResponse)
  } catch (err) {
    res.status(err.statusCode).json(err.error)
  }
}

export async function getAllMaster(req, res) {
  console.log("Getting all master plan")
  try {
    const pricingPlanResponse = await pricingPlanMaster.getAll()
    const serializedPlanResponse = await pricingPlanMasterSerializer.serialize(pricingPlanResponse)
    res.status(200).json(serializedPlanResponse)
  } catch (err) {
    res.status(err.statusCode).json(err.error)
  }
}

export async function updatePlan(req, res) {
  console.log("Updating pricing plan - " + req.swagger.params.plan.value);
  const reqbody = req.swagger.params.pricingplan.value
  try {
    const deserializeData = await pricingPlanSerializer.deserialize(reqbody)
    const subscriptionUpdateResponse = await pricingPlan.updateByID(deserializeData[0], req.swagger.params.plan.value)
    res.status(200).json(await pricingPlanSerializer.serialize(subscriptionUpdateResponse))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await accountSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}
