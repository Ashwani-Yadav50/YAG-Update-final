import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'

const HEALTH_HOST = config.get('HEALTH_HOST')
const HEALTH_PORT = config.get('HEALTH_PORT')

export default ecgmodel()
function ecgmodel() {
  return {
    getECG: async function getECG(username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/${username}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        },
        method: 'GET'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        console.log(err);
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        console.log('errorstatuscode:' + err.statusCode)
      });
    },
    getecgbyobjid: async function getecgbyobjid(id) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/get/ecg/${id}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        },
        method: 'GET'
      }
      return request(options).then((response) => {
        console.log(response.statusCode)
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        console.log(err);
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        //console.log('errorstatuscode:' + err.statusCode)
      });
    },
    getEcgByDate: async function getEcgByDate(username,start,end) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/${username}/${start}/${end}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        },
        method: 'GET'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
      });
    },
    getEcgByDeviceIdPagination: async function getEcgByDeviceIdPagination(deviceId,index) {
      console.log('pagination' + deviceId + " "+ index)
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/lab/devicedata/${deviceId}/${index}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        },
        method: 'GET'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
      });
    },
    getEcgByDevice: async function getEcgByDevice(deviceId,start,end) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/device/${deviceId}/${start}/${end}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        },
        method: 'GET'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
      });
    },
    saveECG: async function save(body, username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/${username}`,
        body: body,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        },
        method: 'POST'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        // console.log(err);
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        console.log('errorstatuscode:' + err.statusCode)
      })
    },
    saveRawECG: async function saveRawECG(body,username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecgRaw/${username}`,
        body: body,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        },
        method: 'POST'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
       // console.log(err);
       console.log(err.statusCode)
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        console.log('errorstatuscode:' + err.statusCode)
      })
    },
    deleteECG: async function deleteECG(username, createdTs) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/ecg/${username}/${createdTs}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        },
        method: 'DELETE'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        console.log(err);
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        console.log('errorstatuscode:' + err.statusCode)
      })
    },
    updatesymptom: async function updatesymptom(id,body) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/ecg/updatesymptom/${id}`,
        body: body,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
        },
        method: 'PUT'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        console.log(err);
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        //console.log('errorstatuscode:' + err.statusCode)
      })
    },
  }
}