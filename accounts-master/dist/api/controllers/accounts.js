'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeSec = exports.resetUsername = exports.resetPassword = exports.createVersion = exports.getversion = exports.resetKey = exports.verifyOtpLogin = exports.loginOtpGenerator = exports.createOtp = exports.resetIDNew = exports.resetID = exports.LinkAcc = exports.Links = exports.updateByID = exports.phonelogin = exports.getByID = exports.pushSec = exports.getByPhone = exports.Add = exports.findAll = exports.getAll = exports.create = undefined;

//for git
let create = exports.create = (() => {
	var _ref = _asyncToGenerator(function* (req, res) {
		console.log("User SignUp");
		const reqbody = req.swagger.params.account.value;
		try {
			if (reqbody.data.type === "Secondary") {
				console.log("Secondary");
				// console.log(reqbody.data.attributes.patientId)
				const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
				const accountResponse = yield _account2.default.createNewSecondary(deserializeData);
				res.status(201).send((yield _accountSerializer2.default.serialize(accountResponse)));
			} else {
				console.log("Primary");
				// console.log(reqbody.data.attributes.patientId)
				const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
				const accountResponse = yield _account2.default.createNew(deserializeData);
				res.status(201).send((yield _accountSerializer2.default.serialize(accountResponse)));
			}
		} catch (err) {
			if (err.statusCode) {
				res.status(err.statusCode).json(err.error);
			} else if (err.code) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.duplicateIDFound);
				res.status(409).json(deserializeError);
			} else {
				res.status(500).json(_errorsList.errorsList.accountServiceError);
			}
		}
	});

	return function create(_x, _x2) {
		return _ref.apply(this, arguments);
	};
})();

let getAll = exports.getAll = (() => {
	var _ref2 = _asyncToGenerator(function* (req, res) {
		console.log("Getting All User");
		try {
			const allAccountResponse = yield _account2.default.getAll();
			res.status(200).json((yield _accountSerializer2.default.serialize(allAccountResponse)));
		} catch (err) {
			console.log(err);
			res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function getAll(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
})();

let findAll = exports.findAll = (() => {
	var _ref3 = _asyncToGenerator(function* (req, res) {
		console.log("Finding all followers");
		try {
			const allAccountResponse = yield _account2.default.findAllByID(req.swagger.params.user.value);
			res.status(200).json((yield _accountSerializer2.default.serialize(allAccountResponse)));
		} catch (err) {
			console.log(err);
			res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function findAll(_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
})();

let Add = exports.Add = (() => {
	var _ref4 = _asyncToGenerator(function* (req, res) {
		console.log("Linking a user in ADD function");
		const reqbody = req.swagger.params.linkObject.value;
		try {
			const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
			const allAccountResponse = yield _account2.default.Add(deserializeData, req.swagger.params.user.value);
			res.status(200).json((yield _accountSerializer2.default.serialize(allAccountResponse)));
		} catch (err) {
			console.log(err);
			if (err.Already) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(409).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function Add(_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
})();

let getByPhone = exports.getByPhone = (() => {
	var _ref5 = _asyncToGenerator(function* (req, res) {
		console.log("find by phone number");
		try {
			const accountByIdResponse = yield _account2.default.getByPhone(req.swagger.params.phone.value);
			res.status(200).json((yield _accountSerializer2.default.serialize(accountByIdResponse)));
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function getByPhone(_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
})();

let pushSec = exports.pushSec = (() => {
	var _ref6 = _asyncToGenerator(function* (req, res) {
		console.log("Pushing Secondary " + req.swagger.params.username.value);
		try {
			const accountByIdResponse = yield _account2.default.pushSec(req.swagger.params.username.value);
			res.status(200).json((yield _accountSerializer2.default.serialize(accountByIdResponse)));
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function pushSec(_x11, _x12) {
		return _ref6.apply(this, arguments);
	};
})();

let getByID = exports.getByID = (() => {
	var _ref7 = _asyncToGenerator(function* (req, res) {
		console.log("Finding by username " + req.swagger.params.userId.value);
		try {
			const accountByIdResponse = yield _account2.default.getByID(req.swagger.params.userId.value);
			let secondary = accountByIdResponse.secondary;
			let sendingSecodary = [];
			secondary.map(function (item) {
				if (item.deleted === true) {
					//do nothing
				} else {
					sendingSecodary.push(item);
				}
			});
			accountByIdResponse.secondary = sendingSecodary;
			//console.log(accountByIdResponse)
			res.status(200).json((yield _accountSerializer2.default.serialize(accountByIdResponse)));
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function getByID(_x13, _x14) {
		return _ref7.apply(this, arguments);
	};
})();

let phonelogin = exports.phonelogin = (() => {
	var _ref8 = _asyncToGenerator(function* (req, res) {
		try {
			res.status(200).json({ "msg": 200 });
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function phonelogin(_x15, _x16) {
		return _ref8.apply(this, arguments);
	};
})();

let updateByID = exports.updateByID = (() => {
	var _ref9 = _asyncToGenerator(function* (req, res) {
		console.log("Account info update " + req.swagger.params.userId.value);
		const reqbody = req.swagger.params.updateAccount.value;
		try {
			const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
			const accountUpdateResponse = yield _account2.default.updateByID(deserializeData, req.swagger.params.userId.value);
			res.status(201).json((yield _accountSerializer2.default.serialize(accountUpdateResponse)));
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function updateByID(_x17, _x18) {
		return _ref9.apply(this, arguments);
	};
})();

let Links = exports.Links = (() => {
	var _ref10 = _asyncToGenerator(function* (req, res) {
		const reqbody = req.swagger.params.linkKey.value;
		console.log("Linking User " + req.swagger.params.username.value);
		try {
			const deserializeData = yield _accountSerializer2.default.deserialize(reqbody);
			const deserializeKey = yield _keyDeserializer2.default.deserialize(deserializeData.linkKey);
			const accountUpdateResponse = yield _account2.default.Links(deserializeKey, req.swagger.params.username.value);
			res.status(200).json((yield _accountSerializer2.default.serialize(accountUpdateResponse)));
		} catch (err) {
			console.log(err);
			if (err.Invalid) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.IDNOTFound);
				res.status(401).json(deserializeError);
			}
			res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function Links(_x19, _x20) {
		return _ref10.apply(this, arguments);
	};
})();

let LinkAcc = exports.LinkAcc = (() => {
	var _ref11 = _asyncToGenerator(function* (req, res) {
		const reqbody = req.swagger.params.linkAccKey.value;
		console.log("Adding Subscriber - " + req.swagger.params.username.value);
		try {
			const deserializeData = yield _keyDeserializer2.default.deserialize(reqbody);
			const accountUpdateResponse = yield _account2.default.LinkAcc(deserializeData, req.swagger.params.username.value);
			res.status(200).json((yield _accountSerializer2.default.serialize(accountUpdateResponse)));
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function LinkAcc(_x21, _x22) {
		return _ref11.apply(this, arguments);
	};
})();

let resetID = exports.resetID = (() => {
	var _ref12 = _asyncToGenerator(function* (req, res) {
		const username = req.swagger.params.username.value;
		console.log("Password Reset for - " + username);
		try {
			const token = _crypto2.default.randomBytes(20).toString('hex');
			const accountUpdateResponse = yield _account2.default.resetID(req.swagger.params.username.value, token);
			res.status(200).json(accountUpdateResponse);
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function resetID(_x23, _x24) {
		return _ref12.apply(this, arguments);
	};
})();

let resetIDNew = exports.resetIDNew = (() => {
	var _ref13 = _asyncToGenerator(function* (req, res) {
		const username = req.swagger.params.username.value;
		const phone = parseInt(req.swagger.params.phone.value);
		console.log("Password Reset for - " + username);
		try {
			const token = _crypto2.default.randomBytes(20).toString('hex');
			const userAccount = yield _account2.default.getByID(username);
			// console.log(userAccount)
			if (userAccount.mobile === phone) {
				const accountUpdateResponse = yield _account2.default.resetID(req.swagger.params.username.value, token);
				res.status(200).json(accountUpdateResponse);
			} else {
				res.status(401).json({ "msg": "username and phone number combo do not match" });
			}
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function resetIDNew(_x25, _x26) {
		return _ref13.apply(this, arguments);
	};
})();

let createOtp = exports.createOtp = (() => {
	var _ref14 = _asyncToGenerator(function* (req, res) {
		let phone = req.swagger.params.phonenumber.value;
		console.log(phone);
		if (isNaN(phone)) {
			console.log("not a number");
			res.status(400).json({ msg: "Bad request" });
		} else {
			try {
				phone = parseInt(phone);
				console.log("Phone varification" + phone);
				const otp = Math.floor(100000 + Math.random() * 900000);
				const creatingOtp = yield _phonevalid2.default.createOtp(phone, otp);
				res.status(200).json({
					"otp": otp
				});
			} catch (err) {
				console.log(err);
				if (err.NoContent) {
					const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
					res.status(204).json(deserializeError);
				} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
			}
		}
	});

	return function createOtp(_x27, _x28) {
		return _ref14.apply(this, arguments);
	};
})();

let loginOtpGenerator = exports.loginOtpGenerator = (() => {
	var _ref15 = _asyncToGenerator(function* (req, res) {
		let phone = req.swagger.params.mobile.value;
		console.log(phone);
		try {
			console.log("Phone varification" + phone);
			const isAccountExist = yield _account2.default.checkPhone(phone);
			// console.log(isAccountExist)
			if (isAccountExist.length > 0) {
				const otp = Math.floor(100000 + Math.random() * 900000);
				const isUpdated = yield _account2.default.addPhoneLogin(phone.mobile, otp);
				// console.log(isUpdated)
				res.status(200).json({ "otp": otp });
			} else {
				res.status(404).json({ "msg": "user not found" });
			}
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function loginOtpGenerator(_x29, _x30) {
		return _ref15.apply(this, arguments);
	};
})();

let verifyOtpLogin = exports.verifyOtpLogin = (() => {
	var _ref16 = _asyncToGenerator(function* (req, res) {
		let auth = req.headers.authorization;
		console.log(auth);
		try {
			let temp = auth.split(" ");
			let buf = new Buffer(temp[1], 'base64');
			let plain_auth = buf.toString();
			let cred = plain_auth.split(':');

			let accounts = yield _account2.default.findOtpUser(cred[1]);
			res.status(200).json({ "msg": accounts });
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function verifyOtpLogin(_x31, _x32) {
		return _ref16.apply(this, arguments);
	};
})();

let resetKey = exports.resetKey = (() => {
	var _ref17 = _asyncToGenerator(function* (req, res) {
		try {
			const key = req.swagger.params.key.value;
			const keyResponse = yield _account2.default.checkKey(key);
			console.log("Password Reset from link sent for - " + keyResponse.username);
			res.render('password-reset', { "username": keyResponse.username, "error": false });
		} catch (err) {
			res.render('password-reset', { "error": true });
			console.log(err);
		}
	});

	return function resetKey(_x33, _x34) {
		return _ref17.apply(this, arguments);
	};
})();

let getversion = exports.getversion = (() => {
	var _ref18 = _asyncToGenerator(function* (req, res) {
		try {
			const data = yield _verison2.default.getVersion();
			res.status(200).send(data);
		} catch (err) {
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function getversion(_x35, _x36) {
		return _ref18.apply(this, arguments);
	};
})();

let createVersion = exports.createVersion = (() => {
	var _ref19 = _asyncToGenerator(function* (req, res) {
		let obj = req.swagger.params.versionbody.value;
		let docAndroid = obj.sanketDocAndroid;
		let docIos = obj.sanketDocIos;
		let lifeAndroid = obj.sanketLifeAndroid;
		let lifeIos = obj.sanketLifeIos;
		let banner = obj.banner;
		let url = obj.url;
		try {
			const verisonCreate = yield _verison2.default.createVersion(docAndroid, docIos, lifeAndroid, lifeIos, banner, url);
			res.status(200).json({
				"data": verisonCreate
			});
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function createVersion(_x37, _x38) {
		return _ref19.apply(this, arguments);
	};
})();

let resetPassword = exports.resetPassword = (() => {
	var _ref20 = _asyncToGenerator(function* (req, res) {
		console.log("Password Reset api - " + req.swagger.params.username.value);
		try {
			const body = req.swagger.params.passwordBody.value;
			const username = req.swagger.params.username.value;
			const resetPassword = yield _account2.default.resetPassword(body, username);
			res.status(200).json((yield _accountSerializer2.default.serialize(resetPassword)));
		} catch (err) {
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function resetPassword(_x39, _x40) {
		return _ref20.apply(this, arguments);
	};
})();

let resetUsername = exports.resetUsername = (() => {
	var _ref21 = _asyncToGenerator(function* (req, res) {
		console.log("Username reset phone number - " + req.swagger.params.mobile.value);
		try {
			const mobile = req.swagger.params.mobile.value;
			const resetUsername = yield _account2.default.resetUsername(mobile);
			res.status(200).json((yield _accountSerializer2.default.serialize(resetUsername)));
		} catch (err) {
			console.log(err);
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function resetUsername(_x41, _x42) {
		return _ref21.apply(this, arguments);
	};
})();

let removeSec = exports.removeSec = (() => {
	var _ref22 = _asyncToGenerator(function* (req, res) {
		console.log(req.swagger.params.primary.value, req.swagger.params.secondary.value);
		try {
			const data = yield _account2.default.removeSec(req.swagger.params.primary.value, req.swagger.params.secondary.value);
			console.log(data);
			res.status(200).json((yield _accountSerializer2.default.serialize(data)));
			//res.json({deleted:true}).status(200)
		} catch (err) {
			if (err.NoContent) {
				const deserializeError = yield _accountSerializer2.default.error(_errorsList.errorsList.noContentFound);
				res.status(204).json(deserializeError);
			} else res.status(500).json(_errorsList.errorsList.pricingPlanServiceError);
		}
	});

	return function removeSec(_x43, _x44) {
		return _ref22.apply(this, arguments);
	};
})();

var _account = require('../../lib/models/account');

var _account2 = _interopRequireDefault(_account);

var _phonevalid = require('../../lib/models/phonevalid');

var _phonevalid2 = _interopRequireDefault(_phonevalid);

var _verison = require('../../lib/models/verison');

var _verison2 = _interopRequireDefault(_verison);

var _accountSerializer = require('../../lib/serializers/accountSerializer');

var _accountSerializer2 = _interopRequireDefault(_accountSerializer);

var _keyDeserializer = require('../../lib/serializers/keyDeserializer');

var _keyDeserializer2 = _interopRequireDefault(_keyDeserializer);

var _errorsList = require('../../lib/errors/errorsList');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _nexmosms = require('../../lib/service/sms/nexmosms');

var _nexmosms2 = _interopRequireDefault(_nexmosms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }