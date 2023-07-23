import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/cholesterol-model'

// YAG function to save the user's BP data

export async function saveCholesterol(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.HealthDataDocument.value
    const result = await yagmodel.saveCholesterol(body, username)
    res.status(result.statusCode).send(result.body)
};

// YAG function to fetch user's BP data

export async function getCholesterolByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getCholesterolByID(username)
    res.status(result.statusCode).send(result.body)
};

export async function deleteCholesterol(req, res) {
    const username = req.swagger.params.username.value
    const createdTs = req.swagger.params.createdTs.value
    const result = await yagmodel.deleteCholesterol(username, createdTs)
    res.status(result.statusCode).send(result.body)
}




