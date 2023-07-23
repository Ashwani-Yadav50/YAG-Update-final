'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = start;

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _swaggerExpressMw = require('swagger-express-mw');

var _swaggerExpressMw2 = _interopRequireDefault(_swaggerExpressMw);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _connectTimeout = require('connect-timeout');

var _connectTimeout2 = _interopRequireDefault(_connectTimeout);

var _yamljs = require('yamljs');

var YAML = _interopRequireWildcard(_yamljs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _accounts = require('./api/controllers/accounts.js');

var _accounts2 = _interopRequireDefault(_accounts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const version = {
	file: YAML.load(path.join(__dirname, 'version.yml'))
};

var config = {
	appRoot: __dirname,
	swaggerFile: path.resolve(__dirname, 'api', 'swagger', 'swagger.json'),
	basePath: '/api/v1',
	swaggerSecurityHandlers: {
		basicAuth: (() => {
			var _ref = _asyncToGenerator(function* (req, authOrSecDef, scopesOrApiKey, callback) {
				console.log("in security yag");
				console.log(req.headers.authorization);
				try {
					let data = yield _accounts2.default.authenticate(req.headers.authorization);
					console.log(data);
					if (data.statusCode === 200) {
						console.log(data);
						callback(null, true);
					} else callback(new Error("Access denied"));
				} catch (err) {
					callback(new Error("Access denied"));
				}
			});

			function basicAuth(_x, _x2, _x3, _x4) {
				return _ref.apply(this, arguments);
			}

			return basicAuth;
		})()
	}

};

function start(serverPort) {
	_swaggerExpressMw2.default.create(config, function (err, swaggerExpress) {
		if (err) {
			throw err;
		}

		var app = require('express')();

		// Hack to override the host and port
		app.get(path.resolve(config.basePath, '/api-docs'), function (req, res) {
			swaggerExpress.runner.swagger.host = req.get('host');
			// Set correct version for the API
			swaggerExpress.runner.swagger.info.version = version.file.build.name;
			res.json(swaggerExpress.runner.swagger);
		});

		// Customize SwaggerUI
		var swaggerUIParams = {
			swaggerUi: config.basePath + '/docs',
			apiDocs: config.basePath + '/api-docs'

			// Add for version
		};app.get('/version', function (req, res) {
			// Load yaml file using YAML.load

			res.json(version.file.build);
		});
		app.use((0, _morgan2.default)('tiny'));

		// serves the Swagger documents and Swagger UI
		app.use(swaggerExpress.runner.swaggerTools.swaggerUi(swaggerUIParams));

		app.use((0, _cors2.default)());

		app.use(_bodyParser2.default.json({ limit: '50mb', extended: true }));

		app.use((0, _connectTimeout2.default)('30s'));

		// install middleware
		swaggerExpress.register(app);

		app.listen(serverPort);
		console.log('server started');
	});
}