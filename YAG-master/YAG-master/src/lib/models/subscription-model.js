import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'

const SUBSCRIPTION_HOST = config.get('SUBSCRIPTION_HOST')
const SUBSCRIPTION_PORT = config.get('SUBSCRIPTION_PORT')

export default subscriptionmodel()
function subscriptionmodel() {
  return {
    getAllAccount: async function getAllAccount(authheader) {
      const options = {
        uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscriptions`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
          'Authorization': authheader
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
    getAccountByID: async function getAccountByID(username) {
      const options = {
        uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/${username}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
          // 'Authorization':authheader
        },
        method: 'GET'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        console.log(err)
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        console.log('errorstatuscode:' + err.statusCode)
      });
    },
    save: async function save(body) {
      const options = {
        uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscriptions`,
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
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        console.log('errorstatuscode:' + err.statusCode)
      })
    },
    update: async function update(username, body) {
      const options = {
        uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/${username}`,
        body: body,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'
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
        console.log('errorstatuscode:' + err.statusCode)
      })
    },
    getMasterAccountByID: async function getAccountByID(username) {
      const options = {
        uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/master/${username}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8',
          // 'Authorization':authheader
        },
        method: 'GET'
      }
      return request(options).then((response) => {
        return {
          "statusCode": response.statusCode,
          "body": response.body
        }
      }).catch((err) => {
        console.log(err)
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        console.log('errorstatuscode:' + err.statusCode)
      });
    },
    saveMaster: async function saveMaster(body) {
      const options = {
        uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscriptions/master`,
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
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        console.log('errorstatuscode:' + err.statusCode)
      })
    },
    updateMaster: async function updateMaster(username, body) {
      const options = {
        uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/master/${username}`,
        body: body,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'
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
        console.log('errorstatuscode:' + err.statusCode)
      })
    },
    share: async function share(username, body) {
      const options = {
        uri: `http://${SUBSCRIPTION_HOST}:${SUBSCRIPTION_PORT}/api/subscription/share/${username}`,
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