import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/temp-modal'

// YAG function to save the user's BP data

export async function savetemp(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.HealthDataDocument.value
    const result = await yagmodel.save(body, username)
    res.status(result.statusCode).send(result.body)
};

// YAG function to fetch user's BP data

export async function getTempByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getTemp(username)
    res.status(result.statusCode).send(result.body)
};

export async function deleteBP(req, res) {
    const username = req.swagger.params.username.value
    const createdTs = req.swagger.params.createdTs.value
    const result = await yagmodel.deleteBP(username, createdTs)
    res.status(result.statusCode).send(result.body)
}


export async function tempall(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.tempall(username)
    res.status(result.statusCode).send(result.body)
}

export async function tempalldevice(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const result = await yagmodel.tempalldevice(deviceId)
    res.status(result.statusCode).send(result.body)
}



