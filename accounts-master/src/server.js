import cors from 'cors'
import morgan from 'morgan'
import SwaggerExpress from 'swagger-express-mw'
import bodyParser from 'body-parser'
import timeout from 'connect-timeout'
import * as YAML from 'yamljs'
import * as path from 'path'
import https from 'https'
import fs from 'fs'
import account from './lib/models/account'

const version = {
	file: YAML.load(path.join(__dirname, 'version.yml'))
}


var config = {
	appRoot: __dirname,
	swaggerSecurityHandlers: {
		basicAuth: async function (req, authOrSecDef, scopesOrApiKey, callback) {
			try {
				let data = undefined;
				let isPhone = req.headers.isphone === "true" ? true : false;
				console.log(isPhone)
				if (isPhone) {
					console.log('running phone number function')
					data = await account.authenticatePhone(req.headers.authorization)
					if (data) {
						console.log(data)
						callback(null, true);
					}
					else
						callback(new Error("Access denied"))
				} else {
					console.log('running normal function')
					data = await account.authenticate(req.headers.authorization)
					// console.log(data)
					if (data) {
						//console.log(data)
						callback(null, true);
					}
					else
						callback(new Error("Access denied"))
				}
			} catch (err) {
				callback(new Error("Access denied"))
			}
		}
	},
	swaggerFile: path.resolve(__dirname, 'api', 'swagger', 'swagger.json'),
	basePath: '/api/v1'
}

export default function start(serverPort) {
	SwaggerExpress.create(config, function (err, swaggerExpress) {
		if (err) {
			throw err
		}
		var app = require('express')()
		//console.log(__dirname + '/views')
		app.set('views', __dirname + '/views');
		app.set('view engine', 'ejs');

		// Hack to override the host and port
		app.get(path.resolve(config.basePath, '/api-docs'), function (req, res) {
			swaggerExpress.runner.swagger.host = req.get('host')
			// Set correct version for the API
			swaggerExpress.runner.swagger.info.version = version.file.build.name
			res.json(swaggerExpress.runner.swagger)
		})

		// Customize SwaggerUI
		var swaggerUIParams = {
			swaggerUi: config.basePath + '/docs',
			apiDocs: config.basePath + '/api-docs'
		}

		// Add for version
		app.get('/version', function (req, res) {
			// Load yaml file using YAML.load

			res.json(version.file.build)
		})

		// serves the Swagger documents and Swagger UI
		app.use(swaggerExpress.runner.swaggerTools.swaggerUi(swaggerUIParams))

		app.use(cors())
		app.use(morgan('tiny'));

		app.use(bodyParser.json({ limit: '50mb', extended: true }))

		app.use(timeout('100s'))

		// install middleware
		// swaggerExpress.runner.config.swagger.swaggerSecurityHandlers(optiom)


		swaggerExpress.register(app)
		//var httpsServer = https.createServer(credentials, app);

		// httpsServer.listen(serverPort)

		app.listen(serverPort)
		console.log(process.versions.node)
	})
}
