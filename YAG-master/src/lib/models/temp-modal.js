import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'

const HEALTH_HOST = config.get('HEALTH_HOST')
const HEALTH_PORT = config.get('HEALTH_PORT')

export default bpmodel()
function bpmodel() {
  return {
    getTemp: async function getTemp(username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/temperature/${username}`,
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
    save: async function save(body, username, authheader) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/temperature/${username}`,
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
    deleteBP: async function deleteBP(username, createdTs) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/bp/${username}/${createdTs}`,
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
    tempall: async function tempall(username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/tempall/${username}`,
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
      })
    },
    tempalldevice: async function tempalldevice(deviceId) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/tempalldevice/${deviceId}`,
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
      })
    }
  }
}