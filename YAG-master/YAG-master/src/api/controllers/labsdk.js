import labsdk from '../../lib/models/labsdk'
import fs from 'fs';


export async function uploadpdf(req, res) {
    const file = req.swagger.params.ecgpdf.value
    const deviceId = req.swagger.params.deviceId.value
    const patientId = req.swagger.params.patientId.value
    const labusername = req.swagger.params.labusername.value
    console.log(file)
    let filePath = __dirname + '/' + file.originalname;
    console.log(filePath)
    fs.writeFileSync(filePath, file.buffer)
    let result = await labsdk.uploadpdf(filePath, file.originalname, deviceId, patientId,labusername)
    fs.unlinkSync(filePath)
    res.status(result.statusCode).send(result.body)
};

export async function deleteBlob(req, res) {
    const blobUrl = req.swagger.params.blobUrl.value
    const result = await labsdk.deleteBlob(blobUrl)
    res.status(result.statusCode).send(result.body)
}

export async function fetchBlob(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const patientId = req.swagger.params.patientId.value
    const result = await labsdk.fetchBlob(deviceId,patientId)
    res.status(result.statusCode).send(result.body)
}

export async function fetchReport(req, res) {
    const deviceId = req.swagger.params.deviceId.value
    const labusername = req.swagger.params.labusername.value
    const result = await labsdk.fetchReport(deviceId,labusername)
    res.status(result.statusCode).send(result.body)
}

export async function reportissue(req, res) {
    const file = req.swagger.params.pdf.value
    const deviceId = req.swagger.params.deviceId.value
    const username = req.swagger.params.username.value
    const reportType = req.swagger.params.reportType.value
    const reportid = req.swagger.params.reportid.value
    const firmwareVersion = req.swagger.params.firmwareVersion.value
    const appVersion = req.swagger.params.appVersion.value
    const phoneModel = req.swagger.params.phoneModel.value
    const osVersion = req.swagger.params.osVersion.value
    const createdTs = req.swagger.params.createdTs.value
    const comment = req.swagger.params.comment.value
    console.log(file,deviceId,username,reportType)
    if(file){
        let filePath = __dirname + '/' + file.originalname;
        console.log(filePath)
        fs.writeFileSync(filePath, file.buffer)
        let result = await labsdk.reportissue(filePath, file.originalname, deviceId,username,reportType,reportid,firmwareVersion,appVersion,phoneModel,osVersion,createdTs,comment)
        fs.unlinkSync(filePath)
        res.status(result.statusCode).send(result.body)
    }else{
        let result = await labsdk.reportissue(null, null, deviceId,username,reportType,reportid,firmwareVersion,appVersion,phoneModel,osVersion,createdTs,comment)
        res.status(result.statusCode).send(result.body)
    }
    
};

