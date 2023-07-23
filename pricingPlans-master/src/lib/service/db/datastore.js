import Mongoose from 'mongoose'
import config from 'config'
import bluebird from 'bluebird'

export default datastore()

function datastore() {
  const mongoDBHost = config.get('MONGODB_HOST')
  const mongoDBPort = config.get('MONGODB_PORT')
  var options = {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }
  // Mongoose.connect(`mongodb://${mongoDBHost}:${mongoDBPort}/sanket`,options,(err,cb)=>{
  //   if (err) return console.log(err);
  //   console.log('Pricing plan API connected to Database')
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

// End of mongodb connnnetion ///

  Mongoose.Promise = bluebird
  Mongoose.set('debug', true)
  return {
    addToStore: async function addToStore(obj) {
      return new Promise((resolve, reject) => {
        obj.save(function (err, doc) {
          if (err) {
            reject(err)
          } else {
            resolve(doc)
          }
        })
      })
    },
    findAll: async function findAll(model) {
      return new Promise((resolve, reject) => {
        model.find({}, (err, doc) => {
          if (err) {
            reject(err)
          } else {
            resolve(doc)
          }
        })
      })
    },
    findAllMaster: async function findAllMaster(model) {
      return new Promise((resolve, reject) => {
        model.find({}, (err, doc) => {
          if (err) {
            reject(err)
          } else {
            resolve(doc)
          }
        })
      })
    },
    findOne: async function findOne(model, planname) {
      return new Promise((resolve, reject) => {
        model.findOne({ plantitle: planname }, (err, doc) => {
          if (err) {
            reject(err)
          } else {
            (doc) ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!')
          }
        })
      })
    },
    upsert: async function upsert(model, id, data) {
      return new Promise((resolve, reject) => {
        model.findOneAndUpdate(id, data, { new: true, upsert: true }, (err, doc) => {
          if (err) {
            reject(err)
          } else {
            (doc) ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!')
          }
        })
      })
    }
  }
}
