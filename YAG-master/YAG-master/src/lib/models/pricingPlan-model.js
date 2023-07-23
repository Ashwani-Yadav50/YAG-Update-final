import { errorsList } from '../../lib/errors/errorsList'
import request from 'request-promise'
import config from 'config'

const PRICING_HOST = config.get('PRICING_HOST')
const PRICING_PORT = config.get('PRICING_PORT')

export default pricingPlanmodel()
function pricingPlanmodel() {
  return {
    getPlans: async function getPlans() {
      const options = {
        uri: `http://${PRICING_HOST}:${PRICING_PORT}/api/pricingPlans`,
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
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
      });
    },
    save: async function save(body) {
      const options = {
        uri: `http://${PRICING_HOST}:${PRICING_PORT}/api/pricingPlans`,
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
    getMasterPlans: async function getMasterPlans() {
      const options = {
        uri: `http://${PRICING_HOST}:${PRICING_PORT}/api/pricingPlans/master`,
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
        if (err.statusCode) {
          return {
            "statusCode": err.statusCode,
            "body": err.title
          }
        }
        //console.log('errorstatuscode:' + err.statusCode)
      });
    },
    saveMaster: async function saveMaster(body) {
      const options = {
        uri: `http://${PRICING_HOST}:${PRICING_PORT}/api/pricingPlans/master`,
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


