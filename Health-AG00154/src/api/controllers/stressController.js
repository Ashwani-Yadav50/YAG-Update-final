import stress from '../../lib/models/stress'
import stressSerializer from '../../lib/serializers/stressSerializer'
import {
        errorsList
} from '../../lib/errors/errorsList'
import request from 'request';


export async function createstress(req, res) {
        console.log('Data Entry - Stress , username - ' + req.swagger.params.username.value)
        const reqbody = req.swagger.params.stressBody.value
        console.log(reqbody)
        try {
                let stressResponse = {}
                const deserializeData = await stressSerializer.deserialize(reqbody)
                console.log(deserializeData)
                deserializeData.map(v => v.username = req.swagger.params.username.value)
                if (deserializeData[0].id === "0" || deserializeData[0].id === "string" || deserializeData[0].id === "String") {
                        console.log('if else 1st for new')
                        var options = {
                                method: 'GET',
                                url: 'http://35.231.219.186:7005/wallet/addtransaction/stress/' + deserializeData[0].deviceId,
                                // url: 'http://localhost:7005/wallet/addtransaction/stress/' + deserializeData[0].deviceId,
                                headers: {
                                        'Postman-Token': 'aa74fda4-e9cf-48cf-aab9-e05f12000959',
                                        'cache-control': 'no-cache'
                                }
                        };
                        request(options, async function (error, response, body) {
                                if (error) throw new Error(error);
                                console.log('on to wallet')
                                console.log(response.statusCode)
                                if (response.statusCode === 200) {
                                        stressResponse = await stress.createNew(deserializeData[0])
                                        let isReport = stressResponse
                                        body = JSON.parse(body)
                                        // console.log(body)
                                        stressResponse.usageCount = body.data.usageCount;
                                        stressResponse.reviewCount = body.data.reviewCount;
                                        stressResponse.lastRecharge = body.data.lastRecharge;
                                        //posting label start
                                        var options = {
                                                method: 'GET',
                                                // url: 'http://localhost:1339/label/create/' + stressResponse._id + '/stress/' + stressResponse.username,
                                                url: 'http://35.231.83.234:1339/label/create/' + stressResponse._id + '/stress/' + stressResponse.username,
                                                headers: {
                                                        'Postman-Token': '52970832-761e-4461-b0e7-a810fe377f7f',
                                                        'cache-control': 'no-cache'
                                                }
                                        };
                                        request(options, function (error, response, body) {
                                                if (error) {
                                                        console.log(error)
                                                }
                                                console.log('Posted Label')
                                        });
                                        //posting label end
										// http://35.244.48.66:8003/ecg
                                        // let monitorOptions = {
                                        //         'method': 'POST',
                                        //         'url': 'http://35.228.111.244:8011/stress',
                                        //         'headers': {
                                        //                 'Content-Type': 'application/json'
                                        //         },
                                        //         body: JSON.stringify(isReport)
                                        // };
										// Added by Saurabh
										let monitorOptions = {
                                                'method': 'POST',
                                                'url': 'http://35.244.48.66:8003/stress',
                                                'headers': {
                                                        'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(isReport)
                                        };


                                        request(monitorOptions, function (error, response) {
                                                if (error) throw new Error(error);
                                                console.log(response.body);
                                        });
                                        res.status(201).send(await stressSerializer.serialize(stressResponse))
                                } else if (response.statusCode === 404) {
                                        res.status(404).json({
                                                "msg": "wallet does not exist"
                                        })
                                } else {
                                        res.status(429).json({
                                                "msg": "Limit Exceeded"
                                        })
                                }
                        });
                } else {
                        stressResponse = await stress.updateStress(deserializeData[0].id, deserializeData[0])
                }
        } catch (err) {
                if (err.statusCode) {
                        res.status(err.statusCode).json(err.error)
                } else {
                        console.log(err)
                        res.status(500).json(errorsList.accountServiceError)
                }
        }
}

export async function updatesymptomstress(req, res) {
        const objid = req.swagger.params.stressid.value
        const symbody = req.swagger.params.symbody.value
        console.log(objid, symbody)
        try {
                const accountByIdResponse = await stress.updatesymptom(objid, symbody)
                res.status(200).json(await stressSerializer.serialize(accountByIdResponse))
        } catch (err) {
                console.log(err)
                res.status(404).json(errorsList.pricingPlanServiceError)
        }
}

export async function getallstress(req, res) {
        console.log("Getting all Stress")
        try {
                const stressResponse = await stress.getAll()
                res.status(200).json(await stressSerializer.serialize(stressResponse))
        } catch (err) {
                console.log(err)
                res.status(500).json(errorsList.pricingPlanServiceError)
        }
}

export async function getHealthByID(req, res) {
        console.log("Getting All Stress by username - " + req.swagger.params.username.value)
        try {
                const accountByIdResponse = await stress.getByID(req.swagger.params.username.value)
                res.status(200).json(await stressSerializer.serialize(accountByIdResponse))
        } catch (err) {
                console.log(err)
                if (err.statusCode) {
                        res.status(err.statusCode).json(err.error)
                } else if (err.code) {
                        const deserializeError = await stressSerializer.error(errorsList.duplicateIDFound)
                        res.status(409).json(deserializeError)
                } else {
                        res.status(500).json(errorsList.accountServiceError)
                }
        }
}

export async function getStressByDate(req, res) {
        console.log("Getting all stress")
        let username = req.swagger.params.username.value;
        let startDate = req.swagger.params.start.value;
        let endDate = req.swagger.params.end.value;
        startDate = new Date(startDate);
        startDate.setUTCHours(0, 0, 0);
        endDate = new Date(endDate);
        endDate.setUTCHours(23, 59, 59);
        console.log(username, startDate, endDate)
        try {
                const allStressResponse = await stress.getStressByDate(username, startDate, endDate)
                res.status(200).json(await stressSerializer.serialize(allStressResponse))
                //res.status(200).json({"msg":true})
        } catch (err) {
                console.log(err)
                res.status(500).json(errorsList.pricingPlanServiceError)
        }
}

export async function getStressByDevice(req, res) {
        console.log("Getting all stress")
        let deviceId = req.swagger.params.deviceId.value;
        let startDate = req.swagger.params.start.value;
        let endDate = req.swagger.params.end.value;
        startDate = new Date(startDate);
        startDate.setUTCHours(0, 0, 0);
        endDate = new Date(endDate);
        endDate.setUTCHours(23, 59, 59);
        console.log(deviceId, startDate, endDate)
        try {
                const allStressResponse = await stress.getStressByDevice(deviceId, startDate, endDate)
                // res.status(200).json(await stressSerializer.serialize(allStressResponse))
                res.status(200).json({
                        "count": allStressResponse
                })
        } catch (err) {
                console.log(err)
                res.status(500).json(errorsList.pricingPlanServiceError)
        }
}

export async function getStressByID(req, res) {
        console.log("Getting All Stress by username - " + req.swagger.params.username.value)
        try {
                const accountByIdResponse = await stress.getByID(req.swagger.params.username.value)
                res.status(200).json(await stressSerializer.serialize(accountByIdResponse))
        } catch (err) {
                console.log(err)
                if (err.statusCode) {
                        res.status(err.statusCode).json(err.error)
                } else if (err.code) {
                        const deserializeError = await stressSerializer.error(errorsList.duplicateIDFound)
                        res.status(409).json(deserializeError)
                } else {
                        res.status(500).json(errorsList.accountServiceError)
                }
        }
}

export async function getStressBystressid(req, res) {
        const objid = req.swagger.params.stressid.value
        console.log(objid)
        try {
                const accountByIdResponse = await stress.getStressBystressid(objid)
                res.status(200).json(await stressSerializer.serialize(accountByIdResponse))
        } catch (err) {
                console.log(err)
                if (err.statusCode) {
                        res.status(err.statusCode).json(err.error)
                } else if (err.code) {
                        const deserializeError = await stressSerializer.error(errorsList.duplicateIDFound)
                        res.status(409).json(deserializeError)
                } else {
                        res.status(500).json(errorsList.accountServiceError)
                }
        }
}

export async function updateByID(req, res) {
        const reqbody = req.swagger.params.updateAccount.value
        try {
                const deserializeData = await accountSerializer.deserialize(reqbody)
                const accountUpdateResponse = await account.updateByID(deserializeData, req.swagger.params.username.value)
                res.status(200).json(await accountSerializer.serialize(accountUpdateResponse))
        } catch (err) {
                console.log(err)
                res.status(500).json(errorsList.pricingPlanServiceError)
        }
}

export async function deleteStress(req, res) {
        console.log("Deleting Stress by createdTs - " + req.swagger.params.createdTs.value + " By username - " + req.swagger.params.username.value)
        try {
                const username = req.swagger.params.username.value
                const createdTs = req.swagger.params.createdTs.value
                const deleteStressResponse = await stress.deleteStress(username, createdTs)
                res.status(200).json({
                        deleteStressResponse
                })
        } catch (err) {
                console.log(err)
                res.status(500).json(errorsList.pricingPlanServiceError)
        }
}

export async function getStressByDeviceId(req, res) {
        const objid = req.swagger.params.deviceId.value
        try {
                const accountByIdResponse = await stress.getStressByDeviceId(objid)
                res.status(200).json(await stressSerializer.serialize(accountByIdResponse))
        } catch (err) {
                console.log(err)
                res.status(404).json({
                        "msg": "No ecg found"
                })
        }
}