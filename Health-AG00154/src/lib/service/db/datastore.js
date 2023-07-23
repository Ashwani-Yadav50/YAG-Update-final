import Mongoose from 'mongoose'
import config from 'config'
import bluebird from 'bluebird';

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
        Mongoose.set('debug', true)
        // Mongoose.connect(`mongodb://${mongoDBHost}:${mongoDBPort}/sanket`, options, function (err, cb) {
        //      if (err) return console.log(err);
        //      console.log('Health API connected to Database')
        // })

        // Mongoose.connect("mongodb://agatsa62:jksparkle0605@40.83.251.117:4000/sanket?authSource=admin", options, function (err, cb) {
        //         if (err) return console.log(err);
        //         console.log('Health API connected to Database')
        // })

        // Mongoose.connect("mongodb+srv://agatsa62:OD9sykKylSNhND6y@cluster0.vnegceg.mongodb.net/sanket?authSource=admin", options, function (err, cb) {
        //         if (err) return console.log(err);
        //         console.log('Health API connected to Database')
        // })

          //below code for handle custom error in database 

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
                addToStore: async function addToStore(obj) {
                        return new Promise((resolve, reject) => {
                                obj.save(function (err, doc) {
                                        if (err) {
                                                reject(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                addToStoreRaw: async function addToStoreRaw(obj) {
                        console.log('raw db')
                        return new Promise((resolve, reject) => {
                                obj.save(function (err, doc) {
                                        if (err) {
                                                reject(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                findAll: async function findAll(obj, s, e) {
                        return new Promise((resolve, reject) => {
                                obj.find({}, { limit: 10 }, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                                // console.log(s,e)
                                // obj.count({createdTs:{$gte:s,$lte:e}}, (err, doc) => {
                                //      if (err) {
                                //              throw new Error(err)
                                //      } else {
                                //              doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                //      }
                                // })
                        })
                },
                getEcgByDate: async function getEcgByDate(obj, username, start, end) {
                        return new Promise((resolve, reject) => {
                                console.log(username, start, end)
                                obj.find({
                                        "username": username, createdTs: {
                                                $gte: start,
                                                $lte: end
                                        }
                                }, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id:  not found!' })
                                        }
                                })
                        })
                },
                getEcgByDevice: async function getEcgByDevice(obj, deviceId, start, end) {
                        return new Promise((resolve, reject) => {
                                console.log(deviceId, start, end)
                                obj.count({
                                        "deviceId": deviceId, createdTs: {
                                                $gte: start,
                                                $lte: end
                                        }
                                }, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: not found!' })
                                        }
                                })
                        })
                },
                getStressByDate: async function getStressByDate(obj, username, start, end) {
                        return new Promise((resolve, reject) => {
                                console.log(username, start, end)
                                obj.find({
                                        "username": username, createdTs: {
                                                $gte: start,
                                                $lte: end
                                        }
                                }, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' })
                                        }
                                })
                        })
                },
                getStressByDevice: async function getStressByDevice(obj, deviceId, start, end) {
                        return new Promise((resolve, reject) => {
                                console.log(deviceId, start, end)
                                obj.count({
                                        "deviceId": deviceId, createdTs: {
                                                $gte: start,
                                                $lte: end
                                        }
                                }, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id not found!' })
                                        }
                                })
                        })
                },
                findOne: async function findOne(acc, id) {
                        return new Promise((resolve, reject) => {
                                acc.find({ "username": id }, (err, doc) => {
                                        if (err) {
                                                // reject(err)
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                getallbyusername: async function getallbyusername(acc, id) {
                        return new Promise((resolve, reject) => {
                                console.log(id)
                                acc.find({ "username": new RegExp(id) }, (err, doc) => {
                                        if (err) {
                                                // reject(err)
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                getallbydeviceId: async function getallbydeviceId(acc, id) {
                        return new Promise((resolve, reject) => {
                                console.log(id)
                                acc.find({ "deviceId": new RegExp(id) }, (err, doc) => {
                                        console.log(doc)
                                        if (err) {
                                                // reject(err)
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                getEcgByecgid: async function getEcgByecgid(acc, id) {
                        return new Promise((resolve, reject) => {
                                acc.findOne({ "_id": id }, (err, doc) => {
                                        if (err) {
                                                // reject(err)
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                getByIDAndUsername: async function getByIDAndUsername(modal, username, deviceId) {
                        return new Promise((resolve, reject) => {
                                modal.find({ "username": username, "deviceId": deviceId }, (err, doc) => {
                                        if (err) {
                                                // reject(err)
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                findOneByLimit: async function findOneByLimit(acc, id) {
                        return new Promise((resolve, reject) => {
                                acc.find({ "username": id }, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                }).limit(20).sort({ "createdTs": -1 })
                        })
                },
                remove: async function remove(obj, username, createdTs) {
                        return new Promise((resolve, reject) => {
                                obj.remove({ "username": username, "createdTs": createdTs }, (err, data) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                (data) ? resolve(data) : reject('ECG with ts: ' + createdTs + ' not found!')
                                        }
                                })
                        })
                },
                remove: async function remove(obj, username, createdTs) {
                        return new Promise((resolve, reject) => {
                                obj.remove({ "username": username, "createdTs": createdTs }, (err, data) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                (data) ? resolve(data) : reject('ECG with ts: ' + createdTs + ' not found!')
                                        }
                                })
                        })
                },
                upsert: async function upsert(acc, id, data) {
                        return new Promise((resolve, reject) => {
                                acc.findByIdAndUpdate(id, data, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject('Pricing plan with id: ' + id + ' not found!')
                                        }
                                })
                        })
                },
                changeStatus: async function changeStatus(acc, id, data) {
                        return new Promise((resolve, reject) => {
                                acc.findByIdAndUpdate(id, data, { new: true }, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject('Ecg with this id not found!')
                                        }
                                })
                        })
                },
                findLast: async function findLast(acc, id) {
                        return new Promise((resolve, reject) => {
                                acc.find({ deviceId: id }, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                //console.log(doc)
                                                (doc) ? resolve(doc) : resolve(1)
                                        }
                                })
                        })
                },
                findfw: async function findfw(acc, id) {
                        return new Promise((resolve, reject) => {
                                acc.findOne({ deviceId: id },{"username":1,"firmwareVersion":1,"deviceId":1}, (err, doc) => {
                                        if (err) {
                                                throw new Error(err)
                                        } else {
                                                //console.log(doc)
                                                (doc) ? resolve(doc) : resolve(1)
                                        }
                                }).sort({"_id":-1}).limit(1)
                        })
                },
                updatesymptom: async function updatesymptom(acc, id, sys) {
                        return new Promise((resolve, reject) => {
                                acc.findByIdAndUpdate(id, { $set: { "symptoms": sys.symptoms } }, { new: true }, (err, doc) => {
                                        if (err) {
                                                // reject(err)
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                addTosdkpdf: async function addTosdkpdf(obj) {
                        console.log('raw db')
                        return new Promise((resolve, reject) => {
                                obj.save(function (err, doc) {
                                        if (err) {
                                                reject(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                changedeletestate: async function changedeletestate(modal, url) {
                        console.log('raw db')
                        return new Promise((resolve, reject) => {
                                modal.update({ "pdfUrl": url }, { $set: { isDeleted: true } }, (err, doc) => {
                                        if (err) {
                                                reject(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                findreportlab: async function findreportlab(modal, labusername, deviceId) {
                        // console.log('raw db')
                        return new Promise((resolve, reject) => {
                                modal.find({ "username": labusername, "deviceId": deviceId }, (err, doc) => {
                                        if (err) {
                                                reject(err)
                                        } else {
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                }).sort({ "_id": -1 })
                        })
                },
                findPatientId: async function findPatientId(modal, patientId) {
                        console.log('Patient ID - '+patientId)
                        return new Promise((resolve, reject) => {
                                modal.find({ "patientId": patientId }, (err, doc) => {
                                        if (err) {
                                                reject(err)
                                        } else {
                                                console.log(doc)
                                                doc ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                getEcgsByDeviceId: async function getEcgsByDeviceId(acc, id) {
                        return new Promise((resolve, reject) => {
                                acc.find({ "deviceId": id },{"username":1,"createdTs":1,"_id":1}, (err, doc) => {
                                        if (err) {
                                                // reject(err)
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                getStressByDeviceId: async function getStressByDeviceId(acc, id) {
                        return new Promise((resolve, reject) => {
                                acc.find({ "deviceId": id },{"username":1,"createdTs":1,"_id":1}, (err, doc) => {
                                        if (err) {
                                                // reject(err)
                                                throw new Error(err)
                                        } else {
                                                (doc) ? resolve(doc) : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                        }
                                })
                        })
                },
                getCountByUsername: async function getCountByUsername(acc, id) {
                        return new Promise((resolve, reject) => {
                                acc.count({ "username": new RegExp(id) }, (err, doc) => {
                                        if (err) {
                                                // reject(err)
                                                throw new Error(err)
                                        } else {
                                                // (doc) ? : reject({ "NoContent": 'User Account with id: ' + id + ' not found!' })
                                                resolve(doc) 
                                        }
                                })
                        })
                },
                authenticate: async function authenticate(acc, credentials) {
                        let temp = (credentials).split(" ")
                        let buf = new Buffer(temp[1], 'base64');
                        let plain_auth = buf.toString();
                        let cred = plain_auth.split(':')
                        return new Promise((resolve, reject) => {
                                acc.findOne({ username: cred[0] }, (err, doc) => {
                                        if (err) {
                                                console.log("datastore error " + err)
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