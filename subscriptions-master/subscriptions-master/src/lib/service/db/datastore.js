import Mongoose from 'mongoose'
import config from 'config'
import bluebird from 'bluebird';

export default datastore()

function datastore() {
  const mongoDBHost = config.get('MONGODB_HOST')
  const mongoDBPort = config.get('MONGODB_PORT')
  var options = {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }
  Mongoose.Promise = bluebird
  Mongoose.set('debug', true)
  // Mongoose.connect(`mongodb://${mongoDBHost}:${mongoDBPort}/sanket`, options, function (err, cb) {
  //   if (err) return console.log(err);
  //   console.log("Subscription API connected to Database")
  // })


  // implement new code

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
    addToStore: async function addToStore(obj, model) {
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
              throw new Error('Error while saving data to the database: ', err)
            } else {
              resolve(doc)
            }
          })
        })
      })
    },
    findAll: async function findAll(obj) {
      return new Promise((resolve, reject) => {
        obj.find({}, (err, doc) => {
          if (err) {
            reject(err)
          } else {
            (doc) ? resolve(doc) : reject('Subscription with id: ' + id + ' not found!')
          }
        })
      })
    },
    findOne: async function findOne(acc, id) {
      return new Promise((resolve, reject) => {
        acc.findOne({ username: id }, (err, doc) => {
          if (err) {
            reject(err)
          } else {
            (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
          }
        })
      })
    },
    upsert: async function upsert(acc, id, data) {
      return new Promise((resolve, reject) => {
        acc.findOneAndUpdate({ username: id }, data, (err, doc) => {
          if (err) {
            //throw new Error(err)
            reject(err)
          } else {
            (doc) ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!')
          }
        })
      })
    },
    shareKey: async function shareKey(acc, body, username) {
      return new Promise((resolve, reject) => {
        acc.findOne({ "username": username, "shareKey.key": body.key }, (err, doc2) => {
          if (err) {
            throw new Error(err)
          } else {
            (doc2) ? reject({ "Already": 'Account with id link:' + body.key + ' already find !' }) : resolve()
          }
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          acc.findOneAndUpdate({ "username": username }, { $push: { "shareKey": body } }, { new: true }, (err, doc) => {
            if (err) {
              reject(err)
            } else {
              (doc) ? resolve(doc) : reject('Subscription with usernme: ' + username + ' not found!')
            }
          })
        })
      })
    },

    authenticate: async function authenticate(acc, credentials) {
      let temp = (credentials).split(" ")
      let buf = new Buffer(temp[1], 'base64'); // create a buffer and tell it the data coming in is base64
      let plain_auth = buf.toString();        // read it back out as a string
      let cred = plain_auth.split(':')
      return new Promise((resolve, reject) => {
        acc.findOne({ username: cred[0] }, (err, doc) => {
          if (err) {
          } else {
            if (doc) {
              if (doc.password === cred[1]) {
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

    }
  }
}
