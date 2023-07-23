import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/stress-model'

// YAG function to save the user's BP data

export async function saveStress(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.HealthDataDocument.value
    const result = await yagmodel.save(body, username)
    res.status(result.statusCode).send(result.body)
};

export async function updatesymptomstress(req, res) {
    const id = req.swagger.params.stressid.value
    const body = req.swagger.params.updatesym.value
    const result = await yagmodel.updatesymptom( id,body)
    res.status(result.statusCode).send(result.body)
};

// YAG function to fetch user's BP data

export async function getStressByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getStress(username)
    res.status(result.statusCode).send(result.body)
};

export async function getstressbyobjid(req, res) {
    const id = req.swagger.params.stressid.value
    const result = await yagmodel.getstressbyobjid(id)
    res.status(result.statusCode).send(result.body)
};

export async function deleteStress(req, res) {
    const username = req.swagger.params.username.value
    const createdTs = req.swagger.params.createdTs.value
    const result = await yagmodel.deleteStress(username, createdTs)
    res.status(result.statusCode).send(result.body)
}

export async function getStressByDate(req, res) {
    const username = req.swagger.params.username.value
    const start = req.swagger.params.start.value
    const end = req.swagger.params.end.value
    console.log(username,start,end)
    const result = await yagmodel.getStressByDate(username,start,end)
    res.status(result.statusCode).send(result.body)
    //res.status(200).send({"msg":true})
};

export async function getStressByDevice(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const start = req.swagger.params.start.value
    const end = req.swagger.params.end.value
    console.log(deviceId,start,end)
    const result = await yagmodel.getStressByDevice(deviceId,start,end)
    // res.status(result.statusCode).send(result.body)
    res.status(200).send({"data":result})
};