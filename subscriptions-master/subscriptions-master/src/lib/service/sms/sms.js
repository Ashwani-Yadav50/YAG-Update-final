const sinchSms = require('sinch-sms')({
    key: '20ed497b-eedb-4e30-a6bb-f9d28c940563',
    secret: 'lesOqGhfO0GZrgiis9iuqA=='
});

export default sms()
function sms() {
    return {
        sendSMS: async function sendSMS(username, no, token) {
            sinchSms.send(no, token).then(response => {
                sinchSms.send(no, 'Dear Sanket User, ' + username + ' wants to link your sanket app. Enter the key received through second SMS in the link section of Sanket user app.Download sanket app  now  Android - https://goo.gl/BGy67f     iOS - https://goo.gl/9YNSb2 ').then(response => {
                    console.log(response)
                }).fail(error => {
                    // Some type of error, see error object
                    console.log(error)
                })

                console.log(response)
            }).fail(error => {
                // Some type of error, see error object
                console.log(error)
            })
        }
    }
}
