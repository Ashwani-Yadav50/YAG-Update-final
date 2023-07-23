import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'

const HEALTH_HOST = config.get('HEALTH_HOST')
const HEALTH_PORT = config.get('HEALTH_PORT')

export default cholesterolmodel()
function cholesterolmodel() {
  return {
    getCholesterolByID: async function getCholesterol(username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/cholesterol/${username}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'
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
    saveCholesterol: async function save(body, username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/cholesterol/${username}`,
        body: body,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'
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
    deleteCholesterol: async function deleteBP(username, createdTs) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/cholesterol/${username}/${createdTs}`,
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
    }
  }
}