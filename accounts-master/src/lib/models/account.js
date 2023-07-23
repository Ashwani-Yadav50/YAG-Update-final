import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'
import mailer from '../../lib/service/mail/mailer'
import sms from '../../lib/service/sms/sms'
import push from '../../lib/service/mail/pushNotification'
import msg91 from '../../lib/service/sms/msg91';
import nexmosms from '../../lib/service/sms/nexmosms';

export default accountModel()

function accountModel() {
  const Schema = Mongoose.Schema

  const AccountSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      dropDups: true
    },
    lastname: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    countrycode: { type: String },
    mobile: Number,
    email: String,
    dob: String,
    bloodGroup: String,
    gender: String,
    height: Number,
    weight: Number,
    userType: String,
    profilePic: String,
    smoker: Boolean,
    diabetic: Boolean,
    alcoholic: Boolean,
    isHeartPatient: Boolean,
    primaryUser: String,
    symptoms: String,
    patientId:String,
    secondary: [
      {
        username: { type: String, required: true },
        name: { type: String, required: false },
        lastname: { type: String, required: false },
        password: { type: String },
        countrycode: { type: String },
        mobile: { type: Number },
        deleted: {
          type: Boolean,
          default: false
        }
      }
    ],
    follower: [
      {
        username: { type: String, required: true },
        name: { type: String, required: true },
        state: { type: Number, required: true, default: 0 }
      }
    ],
    following: [
      {
        username: { type: String, required: true },
        name: { type: String, required: true },
        state: { type: Number, required: true, default: 0 }
      }
    ],
    links: [{
      username: { type: String, required: true },
      name: { type: String, required: true },
      key: { type: String, required: true },
      portal: { type: Boolean, required: false }
    }],
    linkedAccounts: [{
      username: { type: String, required: true },
      name: { type: String, required: true },
      key: { type: String, required: true }
    }],
    linkedUsers: [
      {
        username: { type: String, required: false },
        name: { type: String, required: false },
        key: { type: String, required: false },
        state: { type: Number, required: false, default: 0 }
      }
    ],
    subscribers: [{
      username: { type: String, required: false },
      name: { type: String, required: false },
      key: { type: String, required: false }
    }],
    creationDate: Date,
    modificationDate: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    otp: { type: Number },
    authPhone: { type: Number }
  })

  return {
    createNew: async function createNew(account) {
      AccountSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      AccountSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.addToStore(AccountModel, new AccountModel(account))
    },
    createNewSecondary: async function createNewSecondary(account) {
      AccountSchema.pre('save', function (next) {
        this.creationDate = new Date()
        this.modificationDate = new Date()
        next()
      })

      AccountSchema.set('toJSON', {
        transform: function (doc, ret, options) {
          ret.id = ret._id
          delete ret._id
          delete ret.__v
        }
      })
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.addToStoreSecondary(new AccountModel(account), AccountModel)
    },
    getAll: async function getAll() {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.findAll(AccountModel)
    },
    getByID: async function getByID(id) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.findOne(AccountModel, id)
    },

    pushSec: async function pushSec(secondary) {
      console.log(secondary)
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.pushSecond(AccountModel, secondary)
    },

    getByPhone: async function getByPhone(id) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.findPhone(AccountModel, id)
    },

    findAllByID: async function findAllByID(id) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.findAllToFollow(AccountModel, id)
    },
    updateByID: async function updateByID(updateAccount, id) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.upsert(AccountModel, id, updateAccount)
    },
    Add: async function Add(link, user) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      push.universalPush(link.username, user + " has requested to follow you to monitor your Health data.")
      const doc = await datastore.Add(AccountModel, link, user)
      return doc

    },
    Delete: async function Delete(link, user) {
      push.universalPush(link.username, user + " has rejected your request.")
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.Delete(AccountModel, link, user)
    },
    Accept: async function Accept(link, user) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      push.universalPush(link.username, user + " has approved you to access his Health Data.")
      const doc = await datastore.Accept(AccountModel, link, user)
      return doc
    },
    Links: async function Links(link, user) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.Links(AccountModel, link, user)
    },
    LinkAcc: async function LinkAcc(link, user) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.LinkAcc(AccountModel, link, user)
    },
    authenticate: async function authenticate(credentials) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.authenticate(AccountModel, credentials)
    },
    authenticatePhone: async function authenticatePhone(credentials) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.authenticatePhone(AccountModel, credentials)
    },
    checkPhone: async function checkPhone(phoneObj) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.checkPhone(AccountModel, phoneObj)
    },
    addPhoneLogin: async function addPhoneLogin(phone,otp) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.addPhoneLogin(AccountModel, phone,otp)
    },
    findOtpUser: async function findOtpUser(otp) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.findOtpUser(AccountModel,otp)
    },
    checkKey: async function checkKey(key) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      return await datastore.checkKey(AccountModel, key)
    },
    resetID: async function resetID(username, token) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      const doc = await datastore.resetID(AccountModel, username, token)
      const smsno = (doc.countrycode + "" + doc.mobile).toString()
      if (!doc.email) {
        console.log('email not fount')
        console.log(smsno)
        nexmosms.passwordReset(smsno, token)
        // msg91.sendSMS(doc.countrycode,smsno,token)
        return { "NOEmail": "Email not found" }
      } else {
        console.log('email found')
        const read = await mailer.read(token)
        const send = mailer.send(doc.email, read)
        console.log(smsno)
        nexmosms.passwordReset(smsno, token)
        return { "Email": "Mail send Successfuly" }
      }
    },
    sendOtpAccountUpdate: async function sendOtpAccountUpdate(username, token) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      const doc = await datastore.sendOtp(AccountModel, username, token)
      const smsno = (doc.countrycode + "" + doc.mobile).toString()
      nexmosms.sendSMS(smsno, token)
      return doc
    },
    resetPassword: async function resetPassword(passwordBody, username) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      const doc = await datastore.resetPassword(AccountModel, username, passwordBody)
      return doc
    },
    removeSec: async function removeSec(primary, secondary) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      const doc = await datastore.removeSec(AccountModel, primary, secondary)
      return doc
    },
    resetUsername: async function resetUsername(mobile) {
      const AccountModel = Mongoose.model('account', AccountSchema)
      const res = await datastore.resetUsername(AccountModel, mobile)
      let user = [];
      for (var x in res) {
        user.push(res[x].username)
      }
      nexmosms.usernameReset(res[0].countrycode + "" + res[0].mobile, user)
      return res
    }
  }
}
