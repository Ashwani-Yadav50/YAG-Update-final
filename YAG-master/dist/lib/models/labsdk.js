'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _errorsList = require('../../lib/errors/errorsList');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const HEALTH_HOST = _config2.default.get('HEALTH_HOST');
const HEALTH_PORT = _config2.default.get('HEALTH_PORT');

exports.default = labsdkmodel();

function labsdkmodel() {
	return {
		uploadpdf: (() => {
			var _ref = _asyncToGenerator(function* (file, fileName, deviceId, patientId, labusername) {
				const options = {
					uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/sdk/upload/${deviceId}/${patientId}/${labusername}`,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'POST',
					formData: {
						ecgpdf: {
							value: _fs2.default.createReadStream(file),
							options: {
								filename: fileName,
								contentType: null
							}
						}
					}
				};

				return (0, _requestPromise2.default)(options).then(function (response) {
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

			function uploadpdf(_x, _x2, _x3, _x4, _x5) {
				return _ref.apply(this, arguments);
			}

			return uploadpdf;
		})(),
		deleteBlob: (() => {
			var _ref2 = _asyncToGenerator(function* (body) {
				const options = {
					uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/sdk/delete/blob`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'POST',
					body: body
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function deleteBlob(_x6) {
				return _ref2.apply(this, arguments);
			}

			return deleteBlob;
		})(),
		fetchBlob: (() => {
			var _ref3 = _asyncToGenerator(function* (deviceId, patientId) {
				const options = {
					uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/sdk/fetch/${deviceId}/${patientId}`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function fetchBlob(_x7, _x8) {
				return _ref3.apply(this, arguments);
			}

			return fetchBlob;
		})(),
		fetchReport: (() => {
			var _ref4 = _asyncToGenerator(function* (deviceId, labusername) {
				const options = {
					uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/sdk/fetchlab/${deviceId}/${labusername}`,
					json: true,
					resolveWithFullResponse: true,
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json; charset=utf-8'
					},
					method: 'GET'
				};
				return (0, _requestPromise2.default)(options).then(function (response) {
					return {
						"statusCode": response.statusCode,
						"body": response.body
					};
				}).catch(function (err) {
					console.log(err);
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function fetchReport(_x9, _x10) {
				return _ref4.apply(this, arguments);
			}

			return fetchReport;
		})(),
		reportissue: (() => {
			var _ref5 = _asyncToGenerator(function* (file, fileName, deviceId, username, reportType, reportid, firmwareVersion, appVersion, phoneModel, osVersion, createdTs, comment) {
				let options;
				if (file) {
					options = {
						uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/reportissue/upload`,
						resolveWithFullResponse: true,
						headers: {
							'Content-Type': 'application/json; charset=utf-8',
							'Accept': 'application/json; charset=utf-8'
						},
						method: 'POST',
						formData: {
							pdf: {
								value: _fs2.default.createReadStream(file),
								options: {
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
					};
				} else {
					options = {
						uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/reportissue/upload`,
						resolveWithFullResponse: true,
						headers: {
							'Content-Type': 'application/json; charset=utf-8',
							'Accept': 'application/json; charset=utf-8'
						},
						method: 'POST',
						formData: {
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
					};
				}

				return (0, _requestPromise2.default)(options).then(function (response) {
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

			function reportissue(_x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20, _x21, _x22) {
				return _ref5.apply(this, arguments);
			}

			return reportissue;
		})()
	};
}