import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'

const HEALTH_HOST = config.get('HEALTH_HOST')
const HEALTH_PORT = config.get('HEALTH_PORT')

export default ecgmodel()
function ecgmodel() {
  return {
    getStress: async function getECG(username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/stress/${username}`,
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
        console.log('errorstatuscode:' + err.statusCode)
      });
    },
    getstressbyobjid: async function getstressbyobjid(id) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/get/stress/${id}`,
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
    save: async function save(body, username, authheader) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/stress/${username}`,
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
    getStressByDate: async function getStressByDate(username,start,end) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/stress/${username}/${start}/${end}`,
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
    getStressByDevice: async function getStressByDevice(deviceId,start,end) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/stress/device/${deviceId}/${start}/${end}`,
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
    deleteStress: async function deleteStress(username, createdTs) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/Stress/${username}/${createdTs}`,
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
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/stress/updatesymptom/${id}`,
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