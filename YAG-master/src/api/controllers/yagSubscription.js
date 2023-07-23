import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/subscription-model'

// YAG function to save the user's Subscription data

export async function createSubscriptionByID(req, res) {
    const body = req.swagger.params.subscriptionDocument.value
    const result = await yagmodel.save(body)
    res.status(result.statusCode).send(result.body)
};

export async function getSubscriptionByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getAccountByID(username)
    res.status(result.statusCode).send(result.body)
};

export async function updateSubscriptionByID(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.subscriptionUpdateDocument.value
    const result = await yagmodel.update(username, body)
    res.status(result.statusCode).send(result.body)
};

export async function createMasterSubscriptionByID(req, res) {
    const body = req.swagger.params.subscriptionDocument.value
    const result = await yagmodel.saveMaster(body)
    res.status(result.statusCode).send(result.body)
};

export async function getMasterSubscriptionByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getMasterAccountByID(username)
    res.status(result.statusCode).send(result.body)
};

export async function updateMasterSubscriptionByID(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.updateSubscription.value
    const result = await yagmodel.updateMaster(username, body)
    res.status(result.statusCode).send(result.body)
};

export async function share(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.shareSub.value
    const result = await yagmodel.share(username, body)
    res.status(result.statusCode).send(result.body)
};

