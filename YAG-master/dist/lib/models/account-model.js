'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const accountsHost = _config2.default.get('ACCOUNT_HOST');
const accountsPort = _config2.default.get('ACCOUNT_PORT');

exports.default = accountmodel();

function accountmodel() {
	return {
		getAllAccount: (() => {
			var _ref = _asyncToGenerator(function* (authheader) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					console.log(response.statusCode);
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.body
						};
					}
					console.log('errorstatuscode dhdhdhdh:' + err.statusCode);
				});
			});

			function getAllAccount(_x) {
				return _ref.apply(this, arguments);
			}

			return getAllAccount;
		})(),
		getAccountByID: (() => {
			var _ref2 = _asyncToGenerator(function* (username, authheader) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					console.log(response.statusCode);
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function getAccountByID(_x2, _x3) {
				return _ref2.apply(this, arguments);
			}

			return getAccountByID;
		})(),
		getAccountByPhone: (() => {
			var _ref3 = _asyncToGenerator(function* (phone) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					console.log(response.statusCode);
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function getAccountByPhone(_x4) {
				return _ref3.apply(this, arguments);
			}

			return getAccountByPhone;
		})(),
		save: (() => {
			var _ref4 = _asyncToGenerator(function* (body) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					// console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode dhdhdhdh:' + err.statusCode);
				});
			});

			function save(_x5) {
				return _ref4.apply(this, arguments);
			}

			return save;
		})(),
		update: (() => {
			var _ref5 = _asyncToGenerator(function* (username, body) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function update(_x6, _x7) {
				return _ref5.apply(this, arguments);
			}

			return update;
		})(),
		removeSec: (() => {
			var _ref6 = _asyncToGenerator(function* (primary, secondary) {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/account/removesecondary/${primary}/${secondary}`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'DELETE'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function removeSec(_x8, _x9) {
				return _ref6.apply(this, arguments);
			}

			return removeSec;
		})(),
		searchAll: (() => {
			var _ref7 = _asyncToGenerator(function* (username) {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/accounts/search/${username}`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function searchAll(_x10) {
				return _ref7.apply(this, arguments);
			}

			return searchAll;
		})(),
		Add: (() => {
			var _ref8 = _asyncToGenerator(function* (username, body) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function Add(_x11, _x12) {
				return _ref8.apply(this, arguments);
			}

			return Add;
		})(),
		Delete: (() => {
			var _ref9 = _asyncToGenerator(function* (username, body) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function Delete(_x13, _x14) {
				return _ref9.apply(this, arguments);
			}

			return Delete;
		})(),
		Accept: (() => {
			var _ref10 = _asyncToGenerator(function* (username, body) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function Accept(_x15, _x16) {
				return _ref10.apply(this, arguments);
			}

			return Accept;
		})(),
		Links: (() => {
			var _ref11 = _asyncToGenerator(function* (username, key) {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/accounts/link/${username}`,
					json: true,
					resolveWithFullResponse: true,
					body: key,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'POST'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function Links(_x17, _x18) {
				return _ref11.apply(this, arguments);
			}

			return Links;
		})(),
		LinkAcc: (() => {
			var _ref12 = _asyncToGenerator(function* (username, key) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function LinkAcc(_x19, _x20) {
				return _ref12.apply(this, arguments);
			}

			return LinkAcc;
		})(),
		getAllMaster: (() => {
			var _ref13 = _asyncToGenerator(function* () {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/accounts/master`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function getAllMaster() {
				return _ref13.apply(this, arguments);
			}

			return getAllMaster;
		})(),
		createMaster: (() => {
			var _ref14 = _asyncToGenerator(function* (body) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function createMaster(_x21) {
				return _ref14.apply(this, arguments);
			}

			return createMaster;
		})(),
		getMasterByID: (() => {
			var _ref15 = _asyncToGenerator(function* (username) {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/account/master/${username}`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function getMasterByID(_x22) {
				return _ref15.apply(this, arguments);
			}

			return getMasterByID;
		})(),
		updateMasterByID: (() => {
			var _ref16 = _asyncToGenerator(function* (username, body) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function updateMasterByID(_x23, _x24) {
				return _ref16.apply(this, arguments);
			}

			return updateMasterByID;
		})(),
		resetID: (() => {
			var _ref17 = _asyncToGenerator(function* (username, body) {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/account/reset/${username}`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function resetID(_x25, _x26) {
				return _ref17.apply(this, arguments);
			}

			return resetID;
		})(),
		resetIDNew: (() => {
			var _ref18 = _asyncToGenerator(function* (username, phone, body) {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/account/resetnew/${username}/${phone}`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function resetIDNew(_x27, _x28, _x29) {
				return _ref18.apply(this, arguments);
			}

			return resetIDNew;
		})(),
		resetKey: (() => {
			var _ref19 = _asyncToGenerator(function* (key) {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/account/resetKey/${key}`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function resetKey(_x30) {
				return _ref19.apply(this, arguments);
			}

			return resetKey;
		})(),
		createOtp: (() => {
			var _ref20 = _asyncToGenerator(function* (phonenumber) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function createOtp(_x31) {
				return _ref20.apply(this, arguments);
			}

			return createOtp;
		})(),
		resetPassword: (() => {
			var _ref21 = _asyncToGenerator(function* (username, body) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function resetPassword(_x32, _x33) {
				return _ref21.apply(this, arguments);
			}

			return resetPassword;
		})(),
		resetUsername: (() => {
			var _ref22 = _asyncToGenerator(function* (mobile) {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/account/resetUsername/${mobile}`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function resetUsername(_x34) {
				return _ref22.apply(this, arguments);
			}

			return resetUsername;
		})(),
		getversion: (() => {
			var _ref23 = _asyncToGenerator(function* () {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/version`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function getversion() {
				return _ref23.apply(this, arguments);
			}

			return getversion;
		})(),
		createVersion: (() => {
			var _ref24 = _asyncToGenerator(function* (body) {
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
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function createVersion(_x35) {
				return _ref24.apply(this, arguments);
			}

			return createVersion;
		})(),
		getlablist: (() => {
			var _ref25 = _asyncToGenerator(function* () {
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/getlablist`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					//  return response.body
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					if (err.statusCode) {
						return {
							"statusCode": err.statusCode,
							"body": err.title
						};
					}
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function getlablist() {
				return _ref25.apply(this, arguments);
			}

			return getlablist;
		})()
	};
}