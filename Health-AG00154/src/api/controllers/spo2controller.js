import spo2 from '../../lib/models/spo02'
import spo2Serializer from '../../lib/serializers/spo2serializer'
import { errorsList } from '../../lib/errors/errorsList'
import request from "request";

export async function createspo2(req, res) {
    const reqbody = req.swagger.params.spo2body.value
    try {
        const deserializeData = await spo2Serializer.deserialize(reqbody)
        deserializeData.map(v => v.username = req.swagger.params.username.value)
        const spo2Response = await spo2.createNew(deserializeData[0])
        // Commented By Saurabh
        // var options = {
        //     'method': 'POST',
        //     'url': 'http://35.228.111.244:8011/spo2',
        //     'headers': {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(spo2Response)
        //   };
        //   request(options, function (error, response) {
        //     if (error) throw new Error(error);
        //     console.log(response.body);
        //   });
        res.status(201).send(await spo2Serializer.serialize(spo2Response))
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

export async function getSpo2ByID(req, res) {
    try {
        console.log(req.swagger.params.username.value)
        const spo2Response = await spo2.getByID(req.swagger.params.username.value)
        res.status(200).json(await spo2Serializer.serialize(spo2Response))
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
    }
    catch (err) {
        console.log(err)
        res.status(500).json(errorsList.pricingPlanServiceError)
    }
}


//get all data by username
export async function getallspo2byusername(req, res) {
    console.log("Getting BPs by username - " + req.swagger.params.username.value)
    try {
        const accountByIdResponse = await spo2.getallbyusername(req.swagger.params.username.value)
        res.status(200).json(await spo2Serializer.serialize(accountByIdResponse))
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

export async function getallspo2bydeviceId(req, res) {
    console.log("Getting BPs by username - " + req.swagger.params.deviceId.value)
    try {
        const accountByIdResponse = await spo2.getallbydeviceId(req.swagger.params.deviceId.value)
        res.status(200).json(await spo2Serializer.serialize(accountByIdResponse))
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