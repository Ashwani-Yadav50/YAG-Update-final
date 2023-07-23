import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'

const accountsHost = config.get('ACCOUNT_HOST')
const accountsPort = config.get('ACCOUNT_PORT')

export default accountmodel()
function accountmodel() {
	return {
		getAllAccount: async function getAllAccount(authheader) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8',
					'Authorization': authheader
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				console.log(response.statusCode)
				return {
					"statusCode": response.statusCode,
					"body": response.body
				}
			}).catch((err) => {
				console.log(err);
				if (err.statusCode) {
					return {
						"statusCode": err.statusCode,
						"body": err.body
					}
				}
				console.log('errorstatuscode dhdhdhdh:' + err.statusCode)
			});
		},
		getAccountByID: async function getAccountByID(username, authheader) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/${username}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8',
					'Authorization': authheader
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				console.log(response.statusCode)
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
		getAccountByPhone: async function getAccountByPhone(phone) {
			//just push
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/get/${phone}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				console.log(response.statusCode)
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
		save: async function save(body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts`,
				body: body,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'POST'
			}
			return request(options).then((response) => {
				//  return response.body
				return {
					"statusCode": response.statusCode,
					"body": response.body
				}
			}).catch((err) => {
				// console.log(err);
				if (err.statusCode) {
					return {
						"statusCode": err.statusCode,
						"body": err.title
					}
				}
				console.log('errorstatuscode dhdhdhdh:' + err.statusCode)
			});
		},
		update: async function update(username, body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/${username}`,
				body: body,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'PUT'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		removeSec: async function removeSec(primary, secondary) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/removesecondary/${primary}/${secondary}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'DELETE'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		searchAll: async function searchAll(username) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts/search/${username}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		Add: async function Add(username, body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts/Add/${username}`,
				body: body,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'POST'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		Delete: async function Delete(username, body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts/Delete/${username}`,
				body: body,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'POST'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		Accept: async function Accept(username, body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts/Accept/${username}`,
				body: body,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'POST'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		Links: async function Links(username, key) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts/link/${username}`,
				json: true,
				resolveWithFullResponse: true,
				body: key,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8',
				},
				method: 'POST'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		LinkAcc: async function LinkAcc(username, key) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts/link/Account/${username}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8',
					'linkAccKey': key
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		getAllMaster: async function getAllMaster() {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts/master`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		createMaster: async function createMaster(body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/accounts/master`,
				body: body,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'POST'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		getMasterByID: async function getMasterByID(username) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/master/${username}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		updateMasterByID: async function updateMasterByID(username, body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/master/${username}`,
				body: body,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'PUT'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		resetID: async function resetID(username, body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/reset/${username}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		resetIDNew: async function resetIDNew(username,phone, body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/resetnew/${username}/${phone}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		resetKey: async function resetKey(key) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/resetKey/${key}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		createOtp: async function createOtp(phonenumber) {
			const options = {
				///api/account/sendotp/1234567890
				uri: `http://${accountsHost}:${accountsPort}/api/account/sendotp/${phonenumber}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		resetPassword: async function resetPassword(username, body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/password/reset/${username}`,
				body: body,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'POST'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		resetUsername: async function resetUsername(mobile) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/account/resetUsername/${mobile}`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		getversion: async function getversion() {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/version`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		createVersion: async function createVersion(body) {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/version`,
				body: body,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'POST'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
		getlablist: async function getlablist() {
			const options = {
				uri: `http://${accountsHost}:${accountsPort}/api/getlablist`,
				json: true,
				resolveWithFullResponse: true,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json; charset=utf-8'
				},
				method: 'GET'
			}
			return request(options).then((response) => {
				//  return response.body
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
			})
		},
	}
}