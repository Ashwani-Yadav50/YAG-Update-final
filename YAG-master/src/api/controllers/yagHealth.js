import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/health-model'

// YAG function to fetch user's health data

export async function getHealthByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getHealth(username)
    res.status(result.statusCode).send(result.body)
};

export async function getrealdata(req, res) {
    const username = req.swagger.params.username.value
    const deviceId = req.swagger.params.deviceId.value
    const result = await yagmodel.getrealdata(username,deviceId)
    res.status(result.statusCode).send(result.body)
};

export async function getecgofdeviceid(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const result = await yagmodel.getecgofdeviceid(deviceId)
    res.status(result.statusCode).send(result.body)
};

export async function getstressofdeviceid(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const result = await yagmodel.getstressofdeviceid(deviceId)
    res.status(result.statusCode).send(result.body)
};