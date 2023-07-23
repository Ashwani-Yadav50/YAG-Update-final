import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/account-model'

export async function Links(req, res) {
    const key = req.swagger.params.linkObject.value
    const name = req.swagger.params.username.value
    const result = await yagmodel.Links(name, key)
    res.status(result.statusCode).send(result.body)
};

export async function LinkAcc(req, res) {
    const key = req.swagger.params.linkAccKey.value
    const name = req.swagger.params.username.value
    const result = await yagmodel.LinkAcc(name, key)
    res.status(result.statusCode).send(result.body)
};
