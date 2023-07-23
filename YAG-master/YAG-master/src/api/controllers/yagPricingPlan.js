import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/pricingPlan-model'

// YAG function to fetch user's health data

export async function createplan(req, res) {
    const body = req.swagger.params.pricingplan.value
    const result = await yagmodel.save(body)
    res.status(result.statusCode).send(result.body)
};

export async function getpricingPlan(req, res) {
    const result = await yagmodel.getPlans()
    res.status(result.statusCode).send(result.body)
};

export async function createMasterPlan(req, res) {
    const body = req.swagger.params.pricingplan.value
    const result = await yagmodel.saveMaster(body)
    res.status(result.statusCode).send(result.body)
};

export async function getMaster(req, res) {
    const result = await yagmodel.getMasterPlans()
    res.status(result.statusCode).send(result.body)
};


