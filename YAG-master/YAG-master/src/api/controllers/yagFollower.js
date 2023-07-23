import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/account-model'

export async function searchAll(req, res) {
    const body = req.swagger.params.user.value
    const result = await yagmodel.searchAll(body)
    res.status(result.statusCode).send(result.body)
};

export async function Add(req, res) {
    const username = req.swagger.params.user.value
    const body = req.swagger.params.linkObject.value
    const result = await yagmodel.Add(username, body)
    res.status(result.statusCode).send(result.body)
};

export async function Accept(req, res) {
    const username = req.swagger.params.user.value
    const body = req.swagger.params.linkObject.value
    const result = await yagmodel.Accept(username, body)
    res.status(result.statusCode).send(result.body)
};

export async function Delete(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.linkObject.value
    const result = await yagmodel.Delete(username, body)
    res.status(result.statusCode).send(result.body)
};


