import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'

const HEALTH_HOST = config.get('HEALTH_HOST')
const HEALTH_PORT = config.get('HEALTH_PORT')

export default sugarmodel()

function sugarmodel() {
  return {
    getSugar: async function getSugar(username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/sugar/${username}`,
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

    save: async function save(body, username) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/sugar/${username}`,
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

    deleteSugar: async function deleteSugar(username, createdTs) {
      const options = {
        uri: `http://${HEALTH_HOST}:${HEALTH_PORT}/api/health/sugar/${username}/${createdTs}`,
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


