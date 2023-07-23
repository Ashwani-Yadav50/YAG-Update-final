import Mongoose from 'mongoose'
import config from 'config'
import bluebird, { Promise } from 'bluebird'


export default datastore()

function datastore() {
	const mongoDBHost = config.get('MONGODB_HOST')
	const mongoDBPort = config.get('MONGODB_PORT')

	var options = {
		poolSize: 50,
		useMongoClient: true,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 1000
	}

	Mongoose.Promise = bluebird
	// Mongoose.set('debug', true);
	// Mongoose.connect(`mongodb://${mongoDBHost}:${mongoDBPort}/sanket`, options, function (err, cb) {
	// 	if (err) return console.log(err);
	// 	console.log("Account API connected to Database")
	// })
	// Mongoose.connect(`mongodb://agatsa62:jksparkle0605@40.83.251.117:4000/sanket?authSource=admin`, options, function (err, cb) {
	// 	if (err) return console.log(err);
	// 	console.log("Account API connected to Database")
	// })
	// _mongoose2.default.connect(`mongodb+srv://agatsa62:OD9sykKylSNhND6y@cluster0.vnegceg.mongodb.net/sanket?authSource=admin`,{useNewUrlParser: true, useunifiedTopology: true}, options, function (err, cb) {
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
		addToStore: async function addToStore(model, obj) {
			return new Promise((resolve, reject) => {
				model.findOne({ "username": obj.username }, (err, doc) => {
					if (err) {
						throw new Error('Error while saving data to the database: ', err)
					}
					else {
						(doc) ? reject({ "code": 409 }) : resolve({ "Nodata": "found " })
					}
				})
			}).then(() => {
				return new Promise((resolve, reject) => {
					obj.save(function (err, doc) {
						if (err) {
							console.log(err)
							throw new Error('Error while saving data to the database: ', err)
						} else {
							resolve(doc)
						}
					})
				})
			})
		},
		addToStoreSecondary: async function addToStoreSecondary(obj, acc) {
			let Secondary = () => {
				return new Promise((resolve, reject) => {
					obj.save(function (err, doc) {
						if (err) {
							reject(err)
						} else {
							resolve(doc)
						}
					})
				})
			}
			return Secondary().then((doc) => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": doc.primaryUser }, { $push: { "secondary": { "username": doc.username, "name": doc.name, "lastname": doc.lastname, "mobile": doc.mobile, "countrycode": doc.countrycode, "password": doc.password, } } }, { new: true, upsert: true }, (err, doc1) => {
						if (err) {
							reject(err)
						} else {
							(doc1) ? resolve(doc) : reject('Account with id: ' + doc.primaryUser + ' not found!')
						}
					})
				})
			})
		},
		pushSecond: async function pushSecond(acc, secondary) {
			let Secondary = () => {
				return new Promise((resolve, reject) => {
					acc.find({ "username": secondary }, (err, doc) => {
						if (err) {
							reject(err)
						} else {
							resolve(doc)
						}
					})
				})
			}
			return Secondary().then((doc) => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": doc[0].primaryUser }, { $push: { "secondary": { "username": doc[0].username, "name": doc[0].name, "lastname": doc[0].lastname, "mobile": doc[0].mobile, "countrycode": doc[0].countrycode, "password": doc[0].password, } } }, { new: true, upsert: true }, (err, doc1) => {
						if (err) {
							reject(err)
						} else {
							(doc1) ? resolve(doc) : reject('Account with id: ' + doc.primaryUser + ' not found!')
						}
					})
				})
			})
		},
		findAll: async function findAll(acc) {
			return new Promise((resolve, reject) => {
				acc.find({}, (err, doc) => {
					if (err) {
						reject(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Accounts not found!' })
					}
				})
			})
		},
		findMaster: async function findAll(acc) {
			return new Promise((resolve, reject) => {
				acc.find({ type: "master" }, (err, doc) => {
					if (err) {
						reject(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Accounts not found!' })
					}
				})
			})
		},
		findOne: async function findOne(acc, id) {
			return new Promise((resolve, reject) => {
				acc.findOne({ "username": id }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
					}
				})
			})
		},
		findPhone: async function findPhone(acc, id) {
			return new Promise((resolve, reject) => {
				acc.find({ "mobile": id }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
					}
				})
			})
		},
		findOnemaster: async function findOne(acc, id) {
			return new Promise((resolve, reject) => {
				acc.findOne({ "username": id, type: "master" }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
					}
				})
			})
		},
		upsert: async function upsert(acc, id, data) {
			return new Promise((resolve, reject) => {
				acc.findOneAndUpdate({ "username": id }, data, { new: true }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
					}
				})
			})
		},
		findAllToFollow: async function findAllToFollow(acc, user) {
			return new Promise((resolve, reject) => {
				acc.find({ "username": new RegExp(user, 'i') }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject('Account with id: ' + id + ' not found!')
					}
				})
			})
		},
		Add: async function Add(acc, link, user) {
			let following = () => {
				return new Promise((resolve, reject) => {
					acc.findOne({ "username": user, "following.username": link.username }, (err, doc2) => {
						if (err) {
							throw new Error(err)
						} else {
							(doc2) ? reject({ "Already": 'Account with id link:' + link.username + ' already find !' }) : resolve()
						}
					})
				}).then(() => {
					return new Promise((resolve, reject) => {
						acc.findOneAndUpdate({ "username": user }, { $push: { "following": link } }, { new: true, upsert: true }, (err, doc) => {
							if (err) {
								throw new Error(err)
							} else {
								(doc) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
							}
						})
					})
				})
			}
			return following().then((doc) => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": link.username }, { $push: { "follower": { "name": doc.name, "username": user } } }, { new: true, upsert: true }, (err, doc1) => {
						if (err) {
							throw new Error(err)
						} else {
							(doc1) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
						}
					})
				})
			})
		},
		Accept: async function Accept(acc, link, user) {
			let follower = () => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": user, "follower.username": link.username }, { $set: { "follower.$.state": 1 } }, (err, doc) => {
						if (err) {
							throw new Error(err)
						} else {
							(doc) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
						}
					})
				})
			}
			return follower().then((doc) => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": link.username, "following.username": user }, { $set: { "following.$.state": 1 } }, (err, doc1) => {
						if (err) {
							throw new Error(err)
						} else {
							(doc1) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
						}
					})
				})
			})
		},
		Delete: async function Delete(acc, link, user) {
			let following = () => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": user }, { $pull: { "following": link } }, { new: true, upsert: true }, (err, doc) => {
						if (err) {
							reject(err)
						} else {
							(doc) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
						}
					})
				})
			}
			return following().then((doc) => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": link.username }, { $pull: { "follower": { "name": doc.name, "username": user } } }, { new: true, upsert: true }, (err, doc1) => {
						if (err) {
							throw new Error(err)
						} else {
							(doc1) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
						}
					})
				})
			})
		},
		Links: async function Links(acc, link, user) {
			let links = () => {
				return new Promise((resolve, reject) => {
					if (link.portal) {
						acc.findOne({ "type": "master", "linkedUsers.key": link.key }, (err, doc3) => {
							if (err) {
								throw new Error(err)
							} else {
								(!doc3) ? resolve() : reject('Account with id: ' + user + ' not found!')
							}
						})
					}
					else {
						reject({ "Invalid": "Invalid Key!" })
					}
				}).then(() => {
					return new Promise((resolve, reject) => {
						acc.findOneAndUpdate({ "username": user }, { $push: { "links": link } }, { new: true, upsert: true }, (err, doc) => {
							if (err) {
								throw new Error(err)
							} else {
								(doc) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
							}
						})

					})
				})
			}
			return links().then((doc) => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": link.username }, { $push: { "linkedUsers": { "name": doc.name, "username": user, "key": link.key } } }, { new: true, upsert: true }, (err, doc1) => {
						if (err) {
							throw new Error(err)
						} else {
							(doc1) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
						}
					})
				})
			})
		},
		LinkAcc: async function LinkAcc(acc, link, user) {
			let linkedAcc = () => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": user }, { $push: { "linkedAccounts": link } }, { new: true, upsert: true }, (err, doc) => {
						if (err) {
							throw new Error(err)
						} else {
							(doc) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
						}
					})
				})
			}
			return linkedAcc().then((doc) => {
				return new Promise((resolve, reject) => {
					acc.findOneAndUpdate({ "username": link.username }, { $push: { "subscribers": { "name": doc.name, "username": doc.username } } }, { new: true, upsert: true }, (err, doc1) => {
						if (err) {
							throw new Error(err)
						} else {
							(doc1) ? resolve(doc) : reject('Account with id: ' + user + ' not found!')
						}
					})
				})
			})
		},
		authenticate: async function authenticate(acc, credentials) {
			// console.log(credentials)
			let temp = (credentials).split(" ")
			let buf = new Buffer(temp[1], 'base64'); // create a buffer and tell it the data coming in is base64
			let plain_auth = buf.toString();        // read it back out as a string
			let cred = plain_auth.split(':')
			return new Promise((resolve, reject) => {
				acc.findOne({ username: cred[0] }, (err, doc) => {
					if (err) {
						console.log("datastore error " + err)
					} else {
						if (doc) {
							if (doc.password === cred[1]) {
								// console.log('password matching')
								resolve(doc)
							}
							else {
								reject("Not autherize")
							}
						}
						else
							reject("Not autherize")
					}
				})
			})
		},
		authenticatePhone: async function authenticatePhone(acc, credentials) {
			console.log(credentials)
			let temp = (credentials).split(" ")
			let buf = new Buffer(temp[1], 'base64'); // create a buffer and tell it the data coming in is base64
			let plain_auth = buf.toString();        // read it back out as a string
			console.log(plain_auth)
			let cred = plain_auth.split(':')
			return new Promise((resolve, reject) => {
				acc.find({ authPhone: cred[1] }, (err, doc) => {
					if (err) {
						console.log("datastore error " + err)
					} else {
						if (doc.length>0) {
							if (doc.length > 1) {
								resolve(doc)
							} else {
								console.log(doc)
								let phone = doc[0].countrycode + doc[0].mobile;
								console.log(phone)
								if (phone === cred[0]) {
									resolve(doc)
								}
								else {
									reject("Not autherize")
								}
							}
						}
						else
							reject("Not autherize")
					}
				})
			})
		},
		resetID: async function resetID(acc, username, token) {
			const Expires = new Date();
			return new Promise((resolve, reject) => {
				acc.findOneAndUpdate({ "username": username }, { "resetPasswordToken": token, "resetPasswordExpires": Date.now() + 86400000 }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' })
					}
				})
			})
		},
		checkPhone: async function checkPhone(acc, obj) {
			return new Promise((resolve, reject) => {
				acc.find({ "mobile": obj.mobile }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' })
					}
				})
			})
		},

		addPhoneLogin: async function addPhoneLogin(acc, phone, otp) {
			return new Promise((resolve, reject) => {
				acc.update({ "mobile": phone }, { $set: { "authPhone": otp } }, { multi: true, new: true }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' })
					}
				})
			})
		},

		findOtpUser: async function findOtpUser(acc, otp) {
			return new Promise((resolve, reject) => {
				acc.find({ "authPhone": otp }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' })
					}
				})
			})
		},

		createOtp: async function createOtp(modal, obj) {
			return new Promise((resolve, reject) => {
				obj.save((err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' })
					}
				})
			})
		},
		checkKey: async function checkKey(acc, key) {
			return new Promise((resolve, reject) => {
				acc.findOne({ resetPasswordToken: key, resetPasswordExpires: { $gt: Date.now() } }, (err, doc) => {
					if (err) {
						throw new Error(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'your link token is expired!' })
					}
				})
			})
		},
		resetPassword: async function resetPassword(acc, username, passbody) {
			return new Promise((resolve, reject) => {
				acc.findOneAndUpdate({ resetPasswordToken: passbody.token, resetPasswordExpires: { $gt: Date.now() } }, { "password": passbody.password, "resetPasswordToken": undefined, "resetPasswordExpires": undefined }, (err, doc) => {
					if (err) {
						console.log("token to reset expired")
						reject(err)
					}
					else {
						console.log(doc)
						resolve(doc)
					}

				})
			})
		},
		resetPassword: async function resetPassword(acc, username, passbody) {
			return new Promise((resolve, reject) => {
				acc.findOneAndUpdate({ resetPasswordToken: passbody.token, resetPasswordExpires: { $gt: Date.now() } }, { "password": passbody.password, "resetPasswordToken": undefined, "resetPasswordExpires": undefined }, (err, doc) => {
					if (err) {
						console.log("token to reset expired")
						reject(err)
					}
					else {
						console.log(doc)
						resolve(doc)
					}

				})
			})
		},
		removeSec: async function removeSec(acc, primary, secondary) {
			return new Promise((resolve, reject) => {
				acc.findOneAndUpdate({ "username": primary, "secondary.username": secondary }, { $set: { "secondary.$.deleted": true } }, { new: true, upsert: true }, (err, data) => {
					if (err) {
						throw new Error(err)
					} else {
						(data) ? resolve(data) : reject({ "NoContent": 'No secondary' })
					}
				})
			})
		},
		resetUsername: async function resetUsername(acc, mobile) {
			return new Promise((resolve, reject) => {
				acc.find({ "mobile": mobile }, { username: 1, mobile: 1, countrycode: 1 }, (err, data) => {
					if (err) {
						throw new Error(err)
					} else {
						(data.length) ? resolve(data) : reject({ "NoContent": 'your link token is expired!' })
					}
				})
			})
		},
		createVersion: async function createVersion(modal, obj) {
			return new Promise((resolve, reject) => {
				modal.remove({}, (e, d) => {
					if (e) {
						console.log(e)
						throw new Error('Error ', e)
					} else {
						obj.save(function (err, doc) {
							if (err) {
								console.log(err)
								throw new Error('Error while saving data to the database: ', err)
							} else {
								resolve(doc)
							}
						})
					}
				})
			})
		},
		getVersion: async function getVersion(modal) {
			return new Promise((resolve, reject) => {
				modal.findOne({}, (err, doc) => {
					if (err) {
						reject(err)
					} else {
						(doc) ? resolve(doc) : reject({ "NoContent": 'User Accounts not found!' })
					}
				})
			})
		},
	}
}
