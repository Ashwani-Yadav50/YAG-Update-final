'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird.Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird.Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = datastore();


function datastore() {
	const mongoDBHost = _config2.default.get('MONGODB_HOST');
	const mongoDBPort = _config2.default.get('MONGODB_PORT');

	var options = {
		poolSize: 50,
		useMongoClient: true,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 1000
	};

	_mongoose2.default.Promise = _bluebird2.default;
	// Mongoose.set('debug', true);
	// Mongoose.connect(`mongodb://${mongoDBHost}:${mongoDBPort}/sanket`, options, function (err, cb) {
	// 	if (err) return console.log(err);
	// 	console.log("Account API connected to Database")
	// })


	// _mongoose2.default.connect(`mongodb://agatsa62:jksparkle0605@40.83.251.117:4000/sanket?authSource=admin`, options, function (err, cb) {
	// 	if (err) return console.log(err);
	// 	console.log("Account API connected to Database");
	// });

	// _mongoose2.default.connect(`mongodb+srv://agatsa62:OD9sykKylSNhND6y@cluster0.vnegceg.mongodb.net/sanket?authSource=admin`,options, function (err, cb) {
	// 	if (err) return console.log(err);
	// 	console.log("Account API connected to Database............................");
	// });

	const mongooseOptions = {
		useNewUrlParser: true, // Use the new URL string parser
		useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
	  };
	  
	  // MongoDB connection URI
	  const mongoURI = 'mongodb+srv://agatsa62:OD9sykKylSNhND6y@cluster0.vnegceg.mongodb.net/sanket?authSource=admin';
	  
	  // Connect to MongoDB
	  _mongoose2.default.connect(mongoURI, mongooseOptions)
		.then(() => {
		  console.log('MongoDB connected successfully!');
		  // ... Your application code ...
		})
		.catch((err) => {
		  console.error('Error connecting to MongoDB:', err.message);
		});



	return {
		addToStore: (() => {
			var _ref = _asyncToGenerator(function* (model, obj) {
				return new _bluebird.Promise(function (resolve, reject) {      
					model.findOne({ "username": obj.username }, function (err, doc) {
						if (err) {
							throw new Error('Error while saving data to the database: ', err);
						} else {
							doc ? reject({ "code": 409 }) : resolve({ "Nodata": "found " });
						}
					});
				}).then(function () {
					return new _bluebird.Promise(function (resolve, reject) {
						obj.save(function (err, doc) {
							if (err) {
								console.log(err);
								throw new Error('Error while saving data to the database: ', err);
							} else {
								resolve(doc);
							}
						});
					});
				});
			});

			function addToStore(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return addToStore;
		})(),
		addToStoreSecondary: (() => {
			var _ref2 = _asyncToGenerator(function* (obj, acc) {
				let Secondary = function Secondary() {
					return new _bluebird.Promise(function (resolve, reject) {
						obj.save(function (err, doc) {
							if (err) {
								reject(err);
							} else {
								resolve(doc);
							}
						});
					});
				};
				return Secondary().then(function (doc) {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": doc.primaryUser }, { $push: { "secondary": { "username": doc.username, "name": doc.name, "lastname": doc.lastname, "mobile": doc.mobile, "countrycode": doc.countrycode, "password": doc.password } } }, { new: true, upsert: true }, function (err, doc1) {
							if (err) {
								reject(err);
							} else {
								doc1 ? resolve(doc) : reject('Account with id: ' + doc.primaryUser + ' not found!');
							}
						});
					});
				});
			});

			function addToStoreSecondary(_x3, _x4) {
				return _ref2.apply(this, arguments);
			}

			return addToStoreSecondary;
		})(),
		pushSecond: (() => {
			var _ref3 = _asyncToGenerator(function* (acc, secondary) {
				let Secondary = function Secondary() {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.find({ "username": secondary }, function (err, doc) {
							if (err) {
								reject(err);
							} else {
								resolve(doc);
							}
						});
					});
				};
				return Secondary().then(function (doc) {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": doc[0].primaryUser }, { $push: { "secondary": { "username": doc[0].username, "name": doc[0].name, "lastname": doc[0].lastname, "mobile": doc[0].mobile, "countrycode": doc[0].countrycode, "password": doc[0].password } } }, { new: true, upsert: true }, function (err, doc1) {
							if (err) {
								reject(err);
							} else {
								doc1 ? resolve(doc) : reject('Account with id: ' + doc.primaryUser + ' not found!');
							}
						});
					});
				});
			});

			function pushSecond(_x5, _x6) {
				return _ref3.apply(this, arguments);
			}

			return pushSecond;
		})(),
		findAll: (() => {
			var _ref4 = _asyncToGenerator(function* (acc) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.find({}, function (err, doc) {
						if (err) {
							reject(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Accounts not found!' });
						}
					});
				});
			});

			function findAll(_x7) {
				return _ref4.apply(this, arguments);
			}

			return findAll;
		})(),
		findMaster: (() => {
			var _ref5 = _asyncToGenerator(function* (acc) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.find({ type: "master" }, function (err, doc) {
						if (err) {
							reject(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Accounts not found!' });
						}
					});
				});
			});

			function findAll(_x8) {
				return _ref5.apply(this, arguments);
			}

			return findAll;
		})(),
		findOne: (() => {
			var _ref6 = _asyncToGenerator(function* (acc, id) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.findOne({ "username": id }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
						}
					});
				});
			});

			function findOne(_x9, _x10) {
				return _ref6.apply(this, arguments);
			}

			return findOne;
		})(),
		findPhone: (() => {
			var _ref7 = _asyncToGenerator(function* (acc, id) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.find({ "mobile": id }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
						}
					});
				});
			});

			function findPhone(_x11, _x12) {
				return _ref7.apply(this, arguments);
			}

			return findPhone;
		})(),
		findOnemaster: (() => {
			var _ref8 = _asyncToGenerator(function* (acc, id) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.findOne({ "username": id, type: "master" }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
						}
					});
				});
			});

			function findOne(_x13, _x14) {
				return _ref8.apply(this, arguments);
			}

			return findOne;
		})(),
		upsert: (() => {
			var _ref9 = _asyncToGenerator(function* (acc, id, data) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.findOneAndUpdate({ "username": id }, data, { new: true }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' });
						}
					});
				});
			});

			function upsert(_x15, _x16, _x17) {
				return _ref9.apply(this, arguments);
			}

			return upsert;
		})(),
		findAllToFollow: (() => {
			var _ref10 = _asyncToGenerator(function* (acc, user) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.find({ "username": new RegExp(user, 'i') }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject('Account with id: ' + id + ' not found!');
						}
					});
				});
			});

			function findAllToFollow(_x18, _x19) {
				return _ref10.apply(this, arguments);
			}

			return findAllToFollow;
		})(),
		Add: (() => {
			var _ref11 = _asyncToGenerator(function* (acc, link, user) {
				let following = function following() {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOne({ "username": user, "following.username": link.username }, function (err, doc2) {
							if (err) {
								throw new Error(err);
							} else {
								doc2 ? reject({ "Already": 'Account with id link:' + link.username + ' already find !' }) : resolve();
							}
						});
					}).then(function () {
						return new _bluebird.Promise(function (resolve, reject) {
							acc.findOneAndUpdate({ "username": user }, { $push: { "following": link } }, { new: true, upsert: true }, function (err, doc) {
								if (err) {
									throw new Error(err);
								} else {
									doc ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
								}
							});
						});
					});
				};
				return following().then(function (doc) {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": link.username }, { $push: { "follower": { "name": doc.name, "username": user } } }, { new: true, upsert: true }, function (err, doc1) {
							if (err) {
								throw new Error(err);
							} else {
								doc1 ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
							}
						});
					});
				});
			});

			function Add(_x20, _x21, _x22) {
				return _ref11.apply(this, arguments);
			}

			return Add;
		})(),
		Accept: (() => {
			var _ref12 = _asyncToGenerator(function* (acc, link, user) {
				let follower = function follower() {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": user, "follower.username": link.username }, { $set: { "follower.$.state": 1 } }, function (err, doc) {
							if (err) {
								throw new Error(err);
							} else {
								doc ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
							}
						});
					});
				};
				return follower().then(function (doc) {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": link.username, "following.username": user }, { $set: { "following.$.state": 1 } }, function (err, doc1) {
							if (err) {
								throw new Error(err);
							} else {
								doc1 ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
							}
						});
					});
				});
			});

			function Accept(_x23, _x24, _x25) {
				return _ref12.apply(this, arguments);
			}

			return Accept;
		})(),
		Delete: (() => {
			var _ref13 = _asyncToGenerator(function* (acc, link, user) {
				let following = function following() {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": user }, { $pull: { "following": link } }, { new: true, upsert: true }, function (err, doc) {
							if (err) {
								reject(err);
							} else {
								doc ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
							}
						});
					});
				};
				return following().then(function (doc) {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": link.username }, { $pull: { "follower": { "name": doc.name, "username": user } } }, { new: true, upsert: true }, function (err, doc1) {
							if (err) {
								throw new Error(err);
							} else {
								doc1 ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
							}
						});
					});
				});
			});

			function Delete(_x26, _x27, _x28) {
				return _ref13.apply(this, arguments);
			}

			return Delete;
		})(),
		Links: (() => {
			var _ref14 = _asyncToGenerator(function* (acc, link, user) {
				let links = function links() {
					return new _bluebird.Promise(function (resolve, reject) {
						if (link.portal) {
							acc.findOne({ "type": "master", "linkedUsers.key": link.key }, function (err, doc3) {
								if (err) {
									throw new Error(err);
								} else {
									!doc3 ? resolve() : reject('Account with id: ' + user + ' not found!');
								}
							});
						} else {
							reject({ "Invalid": "Invalid Key!" });
						}
					}).then(function () {
						return new _bluebird.Promise(function (resolve, reject) {
							acc.findOneAndUpdate({ "username": user }, { $push: { "links": link } }, { new: true, upsert: true }, function (err, doc) {
								if (err) {
									throw new Error(err);
								} else {
									doc ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
								}
							});
						});
					});
				};
				return links().then(function (doc) {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": link.username }, { $push: { "linkedUsers": { "name": doc.name, "username": user, "key": link.key } } }, { new: true, upsert: true }, function (err, doc1) {
							if (err) {
								throw new Error(err);
							} else {
								doc1 ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
							}
						});
					});
				});
			});

			function Links(_x29, _x30, _x31) {
				return _ref14.apply(this, arguments);
			}

			return Links;
		})(),
		LinkAcc: (() => {
			var _ref15 = _asyncToGenerator(function* (acc, link, user) {
				let linkedAcc = function linkedAcc() {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": user }, { $push: { "linkedAccounts": link } }, { new: true, upsert: true }, function (err, doc) {
							if (err) {
								throw new Error(err);
							} else {
								doc ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
							}
						});
					});
				};
				return linkedAcc().then(function (doc) {
					return new _bluebird.Promise(function (resolve, reject) {
						acc.findOneAndUpdate({ "username": link.username }, { $push: { "subscribers": { "name": doc.name, "username": doc.username } } }, { new: true, upsert: true }, function (err, doc1) {
							if (err) {
								throw new Error(err);
							} else {
								doc1 ? resolve(doc) : reject('Account with id: ' + user + ' not found!');
							}
						});
					});
				});
			});

			function LinkAcc(_x32, _x33, _x34) {
				return _ref15.apply(this, arguments);
			}

			return LinkAcc;
		})(),
		authenticate: (() => {
			var _ref16 = _asyncToGenerator(function* (acc, credentials) {
				// console.log(credentials)
				let temp = credentials.split(" ");
				let buf = new Buffer(temp[1], 'base64'); // create a buffer and tell it the data coming in is base64
				let plain_auth = buf.toString(); // read it back out as a string
				let cred = plain_auth.split(':');
				return new _bluebird.Promise(function (resolve, reject) {
					acc.findOne({ username: cred[0] }, function (err, doc) {
						if (err) {
							console.log("datastore error " + err);
						} else {
							if (doc) {
								if (doc.password === cred[1]) {
									// console.log('password matching')
									resolve(doc);
								} else {
									reject("Not autherize");
								}
							} else reject("Not autherize");
						}
					});
				});
			});

			function authenticate(_x35, _x36) {
				return _ref16.apply(this, arguments);
			}

			return authenticate;
		})(),
		authenticatePhone: (() => {
			var _ref17 = _asyncToGenerator(function* (acc, credentials) {
				console.log(credentials);
				let temp = credentials.split(" ");
				let buf = new Buffer(temp[1], 'base64'); // create a buffer and tell it the data coming in is base64
				let plain_auth = buf.toString(); // read it back out as a string
				console.log(plain_auth);
				let cred = plain_auth.split(':');
				return new _bluebird.Promise(function (resolve, reject) {
					acc.find({ authPhone: cred[1] }, function (err, doc) {
						if (err) {
							console.log("datastore error " + err);
						} else {
							if (doc.length > 0) {
								if (doc.length > 1) {
									resolve(doc);
								} else {
									console.log(doc);
									let phone = doc[0].countrycode + doc[0].mobile;
									console.log(phone);
									if (phone === cred[0]) {
										resolve(doc);
									} else {
										reject("Not autherize");
									}
								}
							} else reject("Not autherize");
						}
					});
				});
			});

			function authenticatePhone(_x37, _x38) {
				return _ref17.apply(this, arguments);
			}

			return authenticatePhone;
		})(),
		resetID: (() => {
			var _ref18 = _asyncToGenerator(function* (acc, username, token) {
				const Expires = new Date();
				return new _bluebird.Promise(function (resolve, reject) {
					acc.findOneAndUpdate({ "username": username }, { "resetPasswordToken": token, "resetPasswordExpires": Date.now() + 86400000 }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' });
						}
					});
				});
			});

			function resetID(_x39, _x40, _x41) {
				return _ref18.apply(this, arguments);
			}

			return resetID;
		})(),
		checkPhone: (() => {
			var _ref19 = _asyncToGenerator(function* (acc, obj) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.find({ "mobile": obj.mobile }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' });
						}
					});
				});
			});

			function checkPhone(_x42, _x43) {
				return _ref19.apply(this, arguments);
			}

			return checkPhone;
		})(),

		addPhoneLogin: (() => {
			var _ref20 = _asyncToGenerator(function* (acc, phone, otp) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.update({ "mobile": phone }, { $set: { "authPhone": otp } }, { multi: true, new: true }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' });
						}
					});
				});
			});

			function addPhoneLogin(_x44, _x45, _x46) {
				return _ref20.apply(this, arguments);
			}

			return addPhoneLogin;
		})(),

		findOtpUser: (() => {
			var _ref21 = _asyncToGenerator(function* (acc, otp) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.find({ "authPhone": otp }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' });
						}
					});
				});
			});

			function findOtpUser(_x47, _x48) {
				return _ref21.apply(this, arguments);
			}

			return findOtpUser;
		})(),

		createOtp: (() => {
			var _ref22 = _asyncToGenerator(function* (modal, obj) {
				return new _bluebird.Promise(function (resolve, reject) {
					obj.save(function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' });
						}
					});
				});
			});

			function createOtp(_x49, _x50) {
				return _ref22.apply(this, arguments);
			}

			return createOtp;
		})(),
		checkKey: (() => {
			var _ref23 = _asyncToGenerator(function* (acc, key) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.findOne({ resetPasswordToken: key, resetPasswordExpires: { $gt: Date.now() } }, function (err, doc) {
						if (err) {
							throw new Error(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'your link token is expired!' });
						}
					});
				});
			});

			function checkKey(_x51, _x52) {
				return _ref23.apply(this, arguments);
			}

			return checkKey;
		})(),
		resetPassword: (() => {
			var _ref24 = _asyncToGenerator(function* (acc, username, passbody) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.findOneAndUpdate({ resetPasswordToken: passbody.token, resetPasswordExpires: { $gt: Date.now() } }, { "password": passbody.password, "resetPasswordToken": undefined, "resetPasswordExpires": undefined }, function (err, doc) {
						if (err) {
							console.log("token to reset expired");
							reject(err);
						} else {
							console.log(doc);
							resolve(doc);
						}
					});
				});
			});

			function resetPassword(_x53, _x54, _x55) {
				return _ref24.apply(this, arguments);
			}

			return resetPassword;
		})(),
		resetPassword: (() => {
			var _ref25 = _asyncToGenerator(function* (acc, username, passbody) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.findOneAndUpdate({ resetPasswordToken: passbody.token, resetPasswordExpires: { $gt: Date.now() } }, { "password": passbody.password, "resetPasswordToken": undefined, "resetPasswordExpires": undefined }, function (err, doc) {
						if (err) {
							console.log("token to reset expired");
							reject(err);
						} else {
							console.log(doc);
							resolve(doc);
						}
					});
				});
			});

			function resetPassword(_x56, _x57, _x58) {
				return _ref25.apply(this, arguments);
			}

			return resetPassword;
		})(),
		removeSec: (() => {
			var _ref26 = _asyncToGenerator(function* (acc, primary, secondary) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.findOneAndUpdate({ "username": primary, "secondary.username": secondary }, { $set: { "secondary.$.deleted": true } }, { new: true, upsert: true }, function (err, data) {
						if (err) {
							throw new Error(err);
						} else {
							data ? resolve(data) : reject({ "NoContent": 'No secondary' });
						}
					});
				});
			});

			function removeSec(_x59, _x60, _x61) {
				return _ref26.apply(this, arguments);
			}

			return removeSec;
		})(),
		resetUsername: (() => {
			var _ref27 = _asyncToGenerator(function* (acc, mobile) {
				return new _bluebird.Promise(function (resolve, reject) {
					acc.find({ "mobile": mobile }, { username: 1, mobile: 1, countrycode: 1 }, function (err, data) {
						if (err) {
							throw new Error(err);
						} else {
							data.length ? resolve(data) : reject({ "NoContent": 'your link token is expired!' });
						}
					});
				});
			});

			function resetUsername(_x62, _x63) {
				return _ref27.apply(this, arguments);
			}

			return resetUsername;
		})(),
		createVersion: (() => {
			var _ref28 = _asyncToGenerator(function* (modal, obj) {
				return new _bluebird.Promise(function (resolve, reject) {
					modal.remove({}, function (e, d) {
						if (e) {
							console.log(e);
							throw new Error('Error ', e);
						} else {
							obj.save(function (err, doc) {
								if (err) {
									console.log(err);
									throw new Error('Error while saving data to the database: ', err);
								} else {
									resolve(doc);
								}
							});
						}
					});
				});
			});

			function createVersion(_x64, _x65) {
				return _ref28.apply(this, arguments);
			}

			return createVersion;
		})(),
		getVersion: (() => {
			var _ref29 = _asyncToGenerator(function* (modal) {
				return new _bluebird.Promise(function (resolve, reject) {
					modal.findOne({}, function (err, doc) {
						if (err) {
							reject(err);
						} else {
							doc ? resolve(doc) : reject({ "NoContent": 'User Accounts not found!' });
						}
					});
				});
			});

			function getVersion(_x66) {
				return _ref29.apply(this, arguments);
			}

			return getVersion;
		})()
	};
}