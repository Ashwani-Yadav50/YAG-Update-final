import account from '../../lib/models/account'
import phonevalid from '../../lib/models/phonevalid'
import verison from '../../lib/models/verison'
import accountSerializer from '../../lib/serializers/accountSerializer'
import keyDecoder from '../../lib/serializers/keyDeserializer'
import { errorsList } from '../../lib/errors/errorsList'
import crypto from 'crypto'
import nexmosms from '../../lib/service/sms/nexmosms';

//for git
export async function create(req, res) {
	console.log("User SignUp")
	const reqbody = req.swagger.params.account.value
	try {
		if (reqbody.data.type === "Secondary") {
			console.log("Secondary")
			// console.log(reqbody.data.attributes.patientId)
			const deserializeData = await accountSerializer.deserialize(reqbody)
			const accountResponse = await account.createNewSecondary(deserializeData)
			res.status(201).send(await accountSerializer.serialize(accountResponse))
		}
		else {
			console.log("Primary")
			// console.log(reqbody.data.attributes.patientId)
			const deserializeData = await accountSerializer.deserialize(reqbody)
			const accountResponse = await account.createNew(deserializeData)
			res.status(201).send(await accountSerializer.serialize(accountResponse))
		}

	} catch (err) {
		if (err.statusCode) {
			res.status(err.statusCode).json(err.error)
		} else if (err.code) {
			const deserializeError = await accountSerializer.error(errorsList.duplicateIDFound)
			res.status(409).json(deserializeError)
		} else {
			res.status(500).json(errorsList.accountServiceError)
		}

	}
}

export async function getAll(req, res) {
	console.log("Getting All User");
	try {
		const allAccountResponse = await account.getAll()
		res.status(200).json(await accountSerializer.serialize(allAccountResponse))
	} catch (err) {
		console.log(err)
		res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function findAll(req, res) {
	console.log("Finding all followers")
	try {
		const allAccountResponse = await account.findAllByID(req.swagger.params.user.value)
		res.status(200).json(await accountSerializer.serialize(allAccountResponse))
	} catch (err) {
		console.log(err)
		res.status(500).json(errorsList.pricingPlanServiceError)
	}
}
export async function Add(req, res) {
	console.log("Linking a user in ADD function")
	const reqbody = req.swagger.params.linkObject.value
	try {
		const deserializeData = await accountSerializer.deserialize(reqbody)
		const allAccountResponse = await account.Add(deserializeData, req.swagger.params.user.value)
		res.status(200).json(await accountSerializer.serialize(allAccountResponse))
	} catch (err) {
		console.log(err)
		if (err.Already) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(409).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function getByPhone(req, res) {
	console.log("find by phone number")
	try {
		const accountByIdResponse = await account.getByPhone(req.swagger.params.phone.value)
		res.status(200).json(await accountSerializer.serialize(accountByIdResponse))
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function pushSec(req, res) {
	console.log("Pushing Secondary " + req.swagger.params.username.value)
	try {
		const accountByIdResponse = await account.pushSec(req.swagger.params.username.value)
		res.status(200).json(await accountSerializer.serialize(accountByIdResponse))
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function getByID(req, res) {
	console.log("Finding by username " + req.swagger.params.userId.value)
	try {
		const accountByIdResponse = await account.getByID(req.swagger.params.userId.value)
		let secondary = accountByIdResponse.secondary;
		let sendingSecodary = [];
		secondary.map(item => {
			if (item.deleted === true) {
				//do nothing
			} else {
				sendingSecodary.push(item)
			}
		})
		accountByIdResponse.secondary = sendingSecodary;
		//console.log(accountByIdResponse)
		res.status(200).json(await accountSerializer.serialize(accountByIdResponse))
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function phonelogin(req, res) {
	try {
		res.status(200).json({ "msg": 200 })
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function updateByID(req, res) {
	console.log("Account info update " + req.swagger.params.userId.value)
	const reqbody = req.swagger.params.updateAccount.value
	try {
		const deserializeData = await accountSerializer.deserialize(reqbody)
		const accountUpdateResponse = await account.updateByID(deserializeData, req.swagger.params.userId.value)
		res.status(201).json(await accountSerializer.serialize(accountUpdateResponse))
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}
export async function Links(req, res) {
	const reqbody = req.swagger.params.linkKey.value
	console.log("Linking User " + req.swagger.params.username.value)
	try {
		const deserializeData = await accountSerializer.deserialize(reqbody)
		const deserializeKey = await keyDecoder.deserialize(deserializeData.linkKey)
		const accountUpdateResponse = await account.Links(deserializeKey, req.swagger.params.username.value)
		res.status(200).json(await accountSerializer.serialize(accountUpdateResponse))
	} catch (err) {
		console.log(err)
		if (err.Invalid) {
			const deserializeError = await accountSerializer.error(errorsList.IDNOTFound)
			res.status(401).json(deserializeError)
		}
		res.status(500).json(errorsList.pricingPlanServiceError)
	}
}
export async function LinkAcc(req, res) {
	const reqbody = req.swagger.params.linkAccKey.value
	console.log("Adding Subscriber - " + req.swagger.params.username.value)
	try {
		const deserializeData = await keyDecoder.deserialize(reqbody)
		const accountUpdateResponse = await account.LinkAcc(deserializeData, req.swagger.params.username.value)
		res.status(200).json(await accountSerializer.serialize(accountUpdateResponse))
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function resetID(req, res) {
	const username = req.swagger.params.username.value
	console.log("Password Reset for - " + username)
	try {
		const token = crypto.randomBytes(20).toString('hex')
		const accountUpdateResponse = await account.resetID(req.swagger.params.username.value, token)
		res.status(200).json(accountUpdateResponse)
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function resetIDNew(req, res) {
	const username = req.swagger.params.username.value
	const phone = parseInt(req.swagger.params.phone.value)
	console.log("Password Reset for - " + username)
	try {
		const token = crypto.randomBytes(20).toString('hex')
		const userAccount = await account.getByID(username)
		// console.log(userAccount)
		if (userAccount.mobile === phone) {
			const accountUpdateResponse = await account.resetID(req.swagger.params.username.value, token)
			res.status(200).json(accountUpdateResponse)
		} else {
			res.status(401).json({ "msg": "username and phone number combo do not match" })
		}
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function createOtp(req, res) {
	let phone = req.swagger.params.phonenumber.value
	console.log(phone)
	if (isNaN(phone)) {
		console.log("not a number")
		res.status(400).json({ msg: "Bad request" })
	} else {
		try {
			phone = parseInt(phone);
			console.log("Phone varification" + phone)
			const otp = Math.floor(100000 + Math.random() * 900000);
			const creatingOtp = await phonevalid.createOtp(phone, otp)
			res.status(200).json({
				"otp": otp
			})
		} catch (err) {
			console.log(err)
			if (err.NoContent) {
				const deserializeError = await accountSerializer.error(errorsList.noContentFound)
				res.status(204).json(deserializeError)
			}
			else
				res.status(500).json(errorsList.pricingPlanServiceError)
		}
	}
}

export async function loginOtpGenerator(req, res) {
	let phone = req.swagger.params.mobile.value
	console.log(phone)
	try {
		console.log("Phone varification" + phone)
		const isAccountExist = await account.checkPhone(phone)
		// console.log(isAccountExist)
		if (isAccountExist.length > 0) {
			const otp = Math.floor(100000 + Math.random() * 900000);
			const isUpdated = await account.addPhoneLogin(phone.mobile, otp)
			// console.log(isUpdated)
			res.status(200).json({ "otp": otp })
		} else {
			res.status(404).json({ "msg": "user not found" })
		}
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function verifyOtpLogin(req, res) {
	let auth = req.headers.authorization;
	console.log(auth)
	try {
		let temp = (auth).split(" ")
		let buf = new Buffer(temp[1], 'base64');
		let plain_auth = buf.toString();
		let cred = plain_auth.split(':')

		let accounts = await account.findOtpUser(cred[1])
		res.status(200).json({ "msg": accounts })
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function resetKey(req, res) {
	try {
		const key = req.swagger.params.key.value
		const keyResponse = await account.checkKey(key)
		console.log("Password Reset from link sent for - " + keyResponse.username)
		res.render('password-reset', { "username": keyResponse.username, "error": false })
	} catch (err) {
		res.render('password-reset', { "error": true })
		console.log(err)
	}
}

export async function getversion(req, res) {
	try {
		const data = await verison.getVersion();
		res.status(200).send(data)
	} catch (err) {
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function createVersion(req, res) {
	let obj = req.swagger.params.versionbody.value;
	let docAndroid = obj.sanketDocAndroid
	let docIos = obj.sanketDocIos
	let lifeAndroid = obj.sanketLifeAndroid
	let lifeIos = obj.sanketLifeIos
	let banner = obj.banner
	let url = obj.url
	try {
		const verisonCreate = await verison.createVersion(docAndroid, docIos, lifeAndroid, lifeIos, banner, url)
		res.status(200).json({
			"data": verisonCreate
		})
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function resetPassword(req, res) {
	console.log("Password Reset api - " + req.swagger.params.username.value)
	try {
		const body = req.swagger.params.passwordBody.value
		const username = req.swagger.params.username.value
		const resetPassword = await account.resetPassword(body, username)
		res.status(200).json(await accountSerializer.serialize(resetPassword))
	} catch (err) {
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function resetUsername(req, res) {
	console.log("Username reset phone number - " + req.swagger.params.mobile.value)
	try {
		const mobile = req.swagger.params.mobile.value
		const resetUsername = await account.resetUsername(mobile)
		res.status(200).json(await accountSerializer.serialize(resetUsername))
	} catch (err) {
		console.log(err)
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}

export async function removeSec(req, res) {
	console.log(req.swagger.params.primary.value, req.swagger.params.secondary.value)
	try {
		const data = await account.removeSec(req.swagger.params.primary.value, req.swagger.params.secondary.value)
		console.log(data)
		res.status(200).json(await accountSerializer.serialize(data))
		//res.json({deleted:true}).status(200)
	} catch (err) {
		if (err.NoContent) {
			const deserializeError = await accountSerializer.error(errorsList.noContentFound)
			res.status(204).json(deserializeError)
		}
		else
			res.status(500).json(errorsList.pricingPlanServiceError)
	}
}