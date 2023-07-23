import { errorsList } from '../../lib/errors/errorsList'
const path = require('path');
const storage = require('azure-storage');
const fs = require('fs')
import sdklabmodal from '../../lib/models/sdklab'
import reportissuemodal from '../../lib/models/reportIssue'
var request = require("request");

const blobService = storage.createBlobService('DefaultEndpointsProtocol=https;AccountName=sdklab;AccountKey=DHB1HVTMOqegTnYQ/479JpxZFs8SLlGpzodfOGb++QbeRETw94iYEu/ZiBaSKqKQ7/9+SjWxPz+/S5sP+36o8A==;EndpointSuffix=core.windows.net');

function uploadToAzure(filePath, deviceId, patientId, cb) {
    const fullPath = path.resolve(filePath);
    const blobName = path.basename(filePath);
    console.log(fullPath, blobName)
    blobService.createContainerIfNotExists(deviceId + '-' + patientId, { publicAccessLevel: 'blob' }, err => {
        if (err) {
            reject(err);
        } else {
            blobService.createBlockBlobFromLocalFile(deviceId + '-' + patientId, blobName, fullPath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(data)
                    fs.unlinkSync(fullPath)
                    cb("https://sdklab.blob.core.windows.net/" + data.container + "/" + data.name);

                }
            });
        }
    });
}

function deleteBlobUrl(blobUrl) {
    console.log(blobUrl.split('/'))
    let containerName = blobUrl.split('/')[3]
    let blobName = blobUrl.split('/')[4]
    blobService.deleteBlobIfExists(containerName, blobName, {}, (err, data) => {
        if (err) {
            return err;
        } else {
            console.log(data)
            return data
        }
    })
}

function fetchblobs(deviceId, patientId, cb) {
    blobService.listBlobsSegmented(deviceId + '-' + patientId, null, (err, data) => {
        if (err) {
            return err;
        } else {
            console.log(data)
            cb(data)
        }
    })
}

function sendToLiveHealth(obj) {
    var options = {
        method: 'POST',
        url: 'http://35.231.219.186:7005/lab/sendtolivehealth',
        // url: 'http://localhost:7005/lab/sendtolivehealth',
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: obj,
        json: true
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(error)
        }
        console.log(body);
    });
    return true
}


export async function uploadpdf(req, res) {
    const file = req.swagger.params.ecgpdf.value
    const deviceId = req.swagger.params.deviceId.value
    const patientId = req.swagger.params.patientId.value
    const labusername = req.swagger.params.labusername.value
    try {
        let patient = await sdklabmodal.findPatientId(patientId);
        if(labusername === "healthians"){
            if (patient.length > 0) {
                console.log(file,deviceId,patientId,labusername)
                console.log('Duplicate')
                res.status(200).send(patient[0])
            } else {
                let filePath = __dirname + '/' + file.originalname;
                fs.writeFileSync(filePath, file.buffer)
                uploadToAzure(filePath, deviceId, patientId, async (url) => {
                    console.log(url)
                    let obj = {
                        username: labusername,
                        pdfUrl: url,
                        createdTs: new Date().toISOString(),
                        deviceId: deviceId,
                        patientId: patientId
                    };
                    sendToLiveHealth(obj)
                    const deserializeData = await sdklabmodal.create(obj)
                    res.status(200).send(deserializeData)
                })
            }
        }else{
            let filePath = __dirname + '/' + file.originalname;
            fs.writeFileSync(filePath, file.buffer)
            uploadToAzure(filePath, deviceId, patientId, async (url) => {
                console.log(url)
                let obj = {
                    username: labusername,
                    pdfUrl: url,
                    createdTs: new Date().toISOString(),
                    deviceId: deviceId,
                    patientId: patientId
                };
                sendToLiveHealth(obj)
                const deserializeData = await sdklabmodal.create(obj)
                res.status(200).send(deserializeData)
            })
        }
    } catch (err) {
        console.log(err)
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        }
        else if (err.NoContent) {
            const deserializeError = await accountSerializer.error(errorsList.noContentFound)
            res.status(204).json(deserializeError)
        }
        else if (err.code) {
            const deserializeError = await bpSerializer.error(errorsList.duplicateIDFound)
            res.status(409).json(deserializeError)
        } else {
            res.status(500).json(errorsList.accountServiceError)
        }
    }
}

export async function deleteBlob(req, res) {
    const blobUrl = req.swagger.params.blobUrl.value
    try {
        console.log(blobUrl)
        deleteBlobUrl(blobUrl.blobUrl)
        const deserializeData = await sdklabmodal.changeIsDelete(blobUrl.blobUrl)
        res.status(200).send(deserializeData)
    } catch (err) {
        console.log(err)
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        }
        else if (err.NoContent) {
            const deserializeError = await accountSerializer.error(errorsList.noContentFound)
            res.status(204).json(deserializeError)
        }
        else if (err.code) {
            const deserializeError = await bpSerializer.error(errorsList.duplicateIDFound)
            res.status(409).json(deserializeError)
        } else {
            res.status(500).json(errorsList.accountServiceError)
        }
    }
}

export async function fetchBlob(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const patientId = req.swagger.params.patientId.value
    try {
        let containerName = deviceId + '-' + patientId;
        fetchblobs(deviceId, patientId, (data) => {
            let pdfList = [];
            data.entries.map((item) => {
                pdfList.push("https://sdklab.blob.core.windows.net/" + containerName + "/" + item.name)
            })
            return res.json({ data: pdfList })
        })
    } catch (err) {
        console.log(err)
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        }
        else if (err.NoContent) {
            const deserializeError = await accountSerializer.error(errorsList.noContentFound)
            res.status(204).json(deserializeError)
        }
        else if (err.code) {
            const deserializeError = await bpSerializer.error(errorsList.duplicateIDFound)
            res.status(409).json(deserializeError)
        } else {
            res.status(500).json(errorsList.accountServiceError)
        }
    }
}

export async function fetchreport(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const labusername = req.swagger.params.labusername.value
    try {
        const deserializeData = await sdklabmodal.findreportlab(labusername, deviceId)
        res.status(200).json({ data: deserializeData })
    } catch (err) {
        console.log(err)
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        }
        else if (err.NoContent) {
            const deserializeError = await accountSerializer.error(errorsList.noContentFound)
            res.status(204).json(deserializeError)
        }
        else if (err.code) {
            const deserializeError = await bpSerializer.error(errorsList.duplicateIDFound)
            res.status(409).json(deserializeError)
        } else {
            res.status(500).json(errorsList.accountServiceError)
        }
    }
}

export async function reportissue(req, res) {
    const file = req.swagger.params.pdf.value
    const deviceId = req.swagger.params.deviceId.value
    const reportType = req.swagger.params.reportType.value
    const username = req.swagger.params.username.value
    const reportid = req.swagger.params.reportid.value
    const firmwareVersion = req.swagger.params.firmwareVersion.value
    const appVersion = req.swagger.params.appVersion.value
    const phoneModel = req.swagger.params.phoneModel.value
    const osVersion = req.swagger.params.osVersion.value
    const createdTs = req.swagger.params.createdTs.value
    const comment = req.swagger.params.comment.value
    console.log(file,deviceId,reportType,reportid,username,firmwareVersion,appVersion,phoneModel,osVersion,createdTs,comment)
    try {
        if(file){
            let filePath = __dirname + '/' + file.originalname;
            fs.writeFileSync(filePath, file.buffer)
            uploadToAzure(filePath, deviceId, reportid, async (url) => {
                console.log(url)
                let obj = {
                    username: username,
                    pdfUrl: url,
                    createdTs: new Date().toISOString(),
                    deviceId: deviceId,
                    reportType: reportType,
                    reportid: reportid,
                    firmwareVersion: firmwareVersion,
                    appVersion: appVersion,
                    phoneModel: phoneModel,
                    osVersion: osVersion,
                    comment: comment
                };
                const deserializeData = await reportissuemodal.create(obj)
                res.status(200).json({data:deserializeData})
            })
        }else{
            let obj = {
                username: username,
                createdTs: new Date().toISOString(),
                deviceId: deviceId,
                reportType: reportType,
                reportid: reportid,
                firmwareVersion: firmwareVersion,
                appVersion: appVersion,
                phoneModel: phoneModel,
                osVersion: osVersion,
                comment: comment
            };
            const deserializeData = await reportissuemodal.create(obj)
                res.status(200).json({data:deserializeData})
        }
    } catch (err) {
        console.log(err)
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        }
        else if (err.NoContent) {
            const deserializeError = await accountSerializer.error(errorsList.noContentFound)
            res.status(204).json(deserializeError)
        }
        else if (err.code) {
            const deserializeError = await bpSerializer.error(errorsList.duplicateIDFound)
            res.status(409).json(deserializeError)
        } else {
            res.status(500).json(errorsList.accountServiceError)
        }
    }
}