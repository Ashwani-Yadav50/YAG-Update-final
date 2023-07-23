import temp from '../../lib/models/temperature'
import tempSerializer from '../../lib/serializers/tempSerializer'
import {
    errorsList
} from '../../lib/errors/errorsList'
import request from "request";

export async function createTemp(req, res) {
    const reqbody = req.swagger.params.spo2body.value
    try {
        const deserializeData = await tempSerializer.deserialize(reqbody)
        deserializeData.map(v => v.username = req.swagger.params.username.value)
        const tempResponse = await temp.createNew(deserializeData[0])
        // Commented by Saurabh
        // var options = {
        //     'method': 'POST',
        //     'url': 'http://35.228.111.244:8011/temp',
        //     'headers': {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(tempResponse)
        // };
        // request(options, function (error, response) {
        //     if (error) throw new Error(error);
        //     console.log(response.body);
        // });
        
        res.status(201).send(await tempSerializer.serialize(tempResponse))
    } catch (err) {
        console.log(err)
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        } else {
            console.log(err)
            res.status(500).json(errorsList.accountServiceError)
        }
    }
}

export async function getTempByID(req, res) {
    try {
        console.log(req.swagger.params.username.value)
        const tempResponse = await temp.getByID(req.swagger.params.username.value)
        console.log(tempResponse)
        res.status(200).json(await tempSerializer.serialize(tempResponse))
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        } else if (err.code) {
            const deserializeError = await accountSerializer.error(errorsList.duplicateIDFound)
            res.status(409).json(deserializeError)
        } else {
            res.status(500).json(errorsList.accountServiceError)
        }
    }
}

export async function deleteBP(req, res) {
    console.log("Deleting BP by createdTs - " + req.swagger.params.createdTs.value + " By username - " + req.swagger.params.username.value)
    try {
        const username = req.swagger.params.username.value
        const createdTs = req.swagger.params.createdTs.value
        const deleteBpResponse = await bp.deleteBp(username, createdTs)
        res.status(200).json(deleteBpResponse)
    } catch (err) {
        console.log(err)
        res.status(500).json(errorsList.pricingPlanServiceError)
    }
}

//get all data by username
export async function getalltempbyusername(req, res) {
    console.log("Getting BPs by username - " + req.swagger.params.username.value)
    try {
        const accountByIdResponse = await temp.getallbyusername(req.swagger.params.username.value)
        res.status(200).json(await tempSerializer.serialize(accountByIdResponse))
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        } else if (err.code) {
            const deserializeError = await accountSerializer.error(errorsList.duplicateIDFound)
            res.status(409).json(deserializeError)
        } else {
            res.status(500).json(errorsList.accountServiceError)
        }
    }
}

export async function getalltempbydeviceId(req, res) {
    console.log("Getting BPs by username - " + req.swagger.params.deviceId.value)
    try {
        const accountByIdResponse = await temp.getallbydeviceId(req.swagger.params.deviceId.value)
        res.status(200).json(await tempSerializer.serialize(accountByIdResponse))
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        } else if (err.code) {
            const deserializeError = await accountSerializer.error(errorsList.duplicateIDFound)
            res.status(409).json(deserializeError)
        } else {
            res.status(500).json(errorsList.accountServiceError)
        }
    }
}