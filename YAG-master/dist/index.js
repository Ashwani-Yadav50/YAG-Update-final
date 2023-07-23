'use strict';

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _config = require('config');

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// config module loads the configuration from the folder the process is run
process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '/config');

// Start the server
(0, _server2.default)(_config.PORT);