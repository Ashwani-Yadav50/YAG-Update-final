import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import yagmodel from '../../lib/models/account-model'

// YAG function to save the user's BP data

export async function createMaster(req, res) {
    const body = req.swagger.params.master.value
    const result = await yagmodel.createMaster(body)
    res.status(result.statusCode).send(result.body)
};

export async function getMasterByID(req, res) {
    const username = req.swagger.params.username.value
    const result = await yagmodel.getMasterByID(username)
    res.status(result.statusCode).send(result.body)
};

export async function getAllMaster(req, res) {
    const result = await yagmodel.getAllMaster()
    res.status(result.statusCode).send(result.body)
};

export async function updateMasterByID(req, res) {
    const username = req.swagger.params.username.value
    const body = req.swagger.params.updateMaster.value
    const result = await yagmodel.updateMasterByID(username, body)
    res.status(result.statusCode).send(result.body)
}


