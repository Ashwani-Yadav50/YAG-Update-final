import rp from 'request-promise'
import config from 'config'

export default accountService()

// Use the template below to call the REST APIs of other microservices.

export function accountService () {
  const accountsHost = config.get('MS_ACCOUNTS_HOST')
  const accountsPort = config.get('MS_ACCOUNTS_PORT')
  return {
    getAccountById: async function getAccountById (accountId) {
      return rp({
        uri: `http://${accountsHost}:${accountsPort}/api/v1/accounts/` + accountId,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json; charset=utf-8'
        },
        method: 'GET'
      }).then(function (res) {
        return true
      }).catch(function (err) {
        if (err.statusCode === 404) {
          return false
        } else { console.log(err) }
      })
    }
  }
}