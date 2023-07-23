
import request from 'request-promise'
import config from 'config'

const accountsHost = config.get('ACCOUNT_HOST')
const accountsPort = config.get('ACCOUNT_PORT')


export default account()

function account() {

	return {

		authenticate: async function authenticate(authheader) {
			console.log("Sending call for Account")
			let temp = (authheader).split(" ")
			console.log(temp[1])
			let buf = new Buffer(temp[1], 'base64'); // create a buffer and tell it the data coming in is base64
			let plain_auth = buf.toString();        // read it back out as a string
			console.log("Decoded Authorization ", plain_auth);
			const cred = plain_auth.split(':')

			console.log(`http://${accountsHost}:${accountsPort}/api/account/${cred[0]}`);
			console.log(authheader)
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
			}

			return request(options).then((response) => {

				console.log(response.statusCode)

				return {
					"statusCode": response.statusCode,
					"body": response.statusMessage
				}

			}).catch((err) => {
				console.log(err);
				console.log('errorstatuscode:' + err.statusCode)
			});
		}
	}
}