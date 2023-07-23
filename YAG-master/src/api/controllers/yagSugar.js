import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/sugar-model'

// YAG function to save the user's BP data

export async function saveSugar(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.HealthDataDocument.value
    const result = await yagmodel.save(body, username)
    res.status(result.statusCode).send(result.body)
};

// YAG function to fetch user's BP data


export async function getSugarByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getSugar(username)
    res.status(result.statusCode).send(result.body)
};

export async function deleteSugar(req, res) {
    const username = req.swagger.params.username.value
    const createdTs = req.swagger.params.createdTs.value
    const result = await yagmodel.deleteSugar(username, createdTs)
    res.status(result.statusCode).send(result.body)
}





