import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/spo2-modal'

// YAG function to save the user's BP data

export async function savespo2(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.HealthDataDocument.value
    const result = await yagmodel.save(body, username)
    res.status(result.statusCode).send(result.body)
};

// YAG function to fetch user's BP data

export async function getspo2ByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getspo2(username)
    res.status(result.statusCode).send(result.body)
};

export async function deleteBP(req, res) {
    const username = req.swagger.params.username.value
    const createdTs = req.swagger.params.createdTs.value
    const result = await yagmodel.deleteBP(username, createdTs)
    res.status(result.statusCode).send(result.body)
}

export async function spo2all(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.spo2all(username)
    res.status(result.statusCode).send(result.body)
}

export async function spo2alldevice(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const result = await yagmodel.spo2alldevice(deviceId)
    res.status(result.statusCode).send(result.body)
}



