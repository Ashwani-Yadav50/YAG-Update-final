import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'
import fs from 'fs';

const HEALTH_HOST = config.get('HEALTH_HOST')
const HEALTH_PORT = config.get('HEALTH_PORT')

export default labsdkmodel()
function labsdkmodel() {
	return {
		uploadpdf: async function uploadpdf(file, fileName, deviceId, patientId, labusername) {
			const options = {
				uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/sdk/upload/${deviceId}/${patientId}/${labusername}`,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8',
				},
				method: 'POST',
				formData:
				{
					ecgpdf:
					{
						value: fs.createReadStream(file),
						options:
						{
							filename: fileName,
							contentType: null
						}
					}
				}
			}

			return request(options).then((response) => {
				return {
					"statusCode": response.statusCode,
					"body": response.body
				}
			}).catch((err) => {
				console.log(err);
				if (err.statusCode) {
					return {
						"statusCode": err.statusCode,
						"body": err.title
					}
				}
				console.log('errorstatuscode:' + err.statusCode)
			});
		},
		deleteBlob: async function deleteBlob(body) {
			const options = {
				uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/sdk/delete/blob`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'POST',
				body: body,
			}
			return request(options).then((response) => {
				return {
					"statusCode": response.statusCode,
					"body": response.body
				}
			}).catch((err) => {
				console.log(err);
				console.log('errorstatuscode:' + err.statusCode)
			});
		},
		fetchBlob: async function fetchBlob(deviceId, patientId) {
			const options = {
				uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/sdk/fetch/${deviceId}/${patientId}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				return {
					"statusCode": response.statusCode,
					"body": response.body
				}
			}).catch((err) => {
				console.log(err);
				console.log('errorstatuscode:' + err.statusCode)
			});
		},
		fetchReport: async function fetchReport(deviceId, labusername) {
			const options = {
				uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/sdk/fetchlab/${deviceId}/${labusername}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				return {
					"statusCode": response.statusCode,
					"body": response.body
				}
			}).catch((err) => {
				console.log(err);
				console.log('errorstatuscode:' + err.statusCode)
			});
		},
		reportissue: async function reportissue(file, fileName, deviceId, username, reportType, reportid, firmwareVersion, appVersion, phoneModel, osVersion, createdTs, comment) {
			let options;
			if(file){
				options = {
					uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/reportissue/upload`,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8',
					},
					method: 'POST',
					formData:
					{
						pdf:
						{
							value: fs.createReadStream(file),
							options:
							{
								filename: fileName,
								contentType: null
							}
						},
						deviceId: deviceId,
						username: username,
						reportType: reportType,
						reportid: reportid,
						firmwareVersion: firmwareVersion,
						appVersion: appVersion,
						phoneModel: phoneModel,
						osVersion: osVersion,
						createdTs: createdTs,
						comment: comment
					}
				}
			}else{
				options = {
					uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/reportissue/upload`,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8',
					},
					method: 'POST',
					formData:
					{
						deviceId: deviceId,
						username: username,
						reportType: reportType,
						reportid: reportid,
						firmwareVersion: firmwareVersion,
						appVersion: appVersion,
						phoneModel: phoneModel,
						osVersion: osVersion,
						createdTs: createdTs,
						comment: comment
					}
				}
			}
			

			return request(options).then((response) => {
				return {
					"statusCode": response.statusCode,
					"body": response.body
				}
			}).catch((err) => {
				console.log(err);
				if (err.statusCode) {
					return {
						"statusCode": err.statusCode,
						"body": err.title
					}
				}
				console.log('errorstatuscode:' + err.statusCode)
			});
		}
	}
}