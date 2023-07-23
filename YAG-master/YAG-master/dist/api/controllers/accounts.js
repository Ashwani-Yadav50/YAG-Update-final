'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const accountsHost = _config2.default.get('ACCOUNT_HOST');
const accountsPort = _config2.default.get('ACCOUNT_PORT');

exports.default = account();


function account() {

	return {

		authenticate: (() => {
			var _ref = _asyncToGenerator(function* (authheader) {
				console.log("Sending call for Account");
				let temp = authheader.split(" ");
				console.log(temp[1]);
				let buf = new Buffer(temp[1], 'base64'); // create a buffer and tell it the data coming in is base64
				let plain_auth = buf.toString(); // read it back out as a string
				console.log("Decoded Authorization ", plain_auth);
				const cred = plain_auth.split(':');

				console.log(`http://${accountsHost}:${accountsPort}/api/account/${cred[0]}`);
				console.log(authheader);
				const options = {
					uri: `http://${accountsHost}:${accountsPort}/api/account/${cred[0]}`,
					json: true,
					resolveWithFullResponse: true,
					transform2xxOnly: false,
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
						"body": response.statusMessage
					};
				}).catch(function (err) {
					console.log(err);
					console.log('errorstatuscode:' + err.statusCode);
				});
			});

			function authenticate(_x) {
				return _ref.apply(this, arguments);
			}

			return authenticate;
		})()
	};
}