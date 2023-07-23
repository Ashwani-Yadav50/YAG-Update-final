import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/bp-model'

// YAG function to save the user's BP data

export async function saveBp(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.HealthDataDocument.value
    const result = await yagmodel.save(body, username)
    res.status(result.statusCode).send(result.body)
};

// YAG function to fetch user's BP data

export async function getBpByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getBp(username)
    res.status(result.statusCode).send(result.body)
};

export async function deleteBP(req, res) {
    const username = req.swagger.params.username.value
    const createdTs = req.swagger.params.createdTs.value
    const result = await yagmodel.deleteBP(username, createdTs)
    res.status(result.statusCode).send(result.body)
}

export async function bpall(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.bpall(username)
    res.status(result.statusCode).send(result.body)
}

export async function bpalldevice(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const result = await yagmodel.bpalldevice(deviceId)
    res.status(result.statusCode).send(result.body)
}





