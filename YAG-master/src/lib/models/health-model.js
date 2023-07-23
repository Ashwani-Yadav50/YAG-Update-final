import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'

const HEALTH_HOST = config.get('HEALTH_HOST')
const HEALTH_PORT = config.get('HEALTH_PORT')

export default bpmodel()
function bpmodel() {
  return {
    getHealth: async function getHealth(username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/${username}`,
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
        console.log('errorstatuscode:' + err.statusCode)
      });
    },
    getrealdata: async function getrealdata(username,deviceId) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/real/`+username+'/'+deviceId,
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
        console.log('errorstatuscode:' + err.statusCode)
      });
    },
    save: async function save(body, username, authheader) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/bp/${username}`,
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
        console.log('errorstatuscode:' + err.statusCode)
      })
    },
    getecgofdeviceid: async function getecgofdeviceid(deviceId) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/getecgofdeviceid/`+deviceId,
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
        console.log('errorstatuscode:' + err.statusCode)
      });
    },
    getstressofdeviceid: async function getstressofdeviceid(deviceId) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/getstressofdeviceid/`+deviceId,
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
        console.log('errorstatuscode:' + err.statusCode)
      });
    },
  }
}