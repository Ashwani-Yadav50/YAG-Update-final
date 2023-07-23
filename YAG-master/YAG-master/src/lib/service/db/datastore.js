import Mongoose from 'mongoose'
import config from 'config'

export default datastore()

function datastore () {
  const mongoDBHost = config.get('MONGODB_HOST')
  const mongoDBPort = config.get('MONGODB_PORT')

  var options = {
    poolSize: 10
  }
  Mongoose.connect(`mongodb://agatsa62:jksparkle0605@40.83.251.117:4000/sanket?authSource=admin`,options,function(err,cb){
    if(err) return console.log(err);
    console.log('hello db from yag')
  })

  // Mongoose.connection.on(console.error.bind(console, 'Error connecting to MongoDB instance. '))
  return {
    addToStore: async function addToStore (obj) {
      return new Promise((resolve, reject) => {
        obj.save(function (err, doc) {
          if (err) {
            throw new Error('Error while saving data to the database: ', err)
          } else {
            resolve(doc)
          }
        })
      })
    },
    findAll: async function findAll () {
      return new Promise((resolve, reject) => {
        /* store.find({}, (err, doc) => {
          if (err) {
            throw new Error(err)
          } else {
            resolve(doc)
          }
        }) */
      })
    },
    findOne: async function findOne (id) {
      return new Promise((resolve, reject) => {
        /* store.findOne({_id: id}, (err, doc) => {
          if (err) {
            throw new Error(err)
          } else {
            (doc) ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!')
          }
        }) */
      })
    }
  }
}
