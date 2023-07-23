const sinchSms = require('sinch-sms')({
    key: '20ed497b-eedb-4e30-a6bb-f9d28c940563',
    secret: 'lesOqGhfO0GZrgiis9iuqA=='
}); 

export default sms()

function sms(){
    return{
        sendSMS : async function sendSMS(no ,token){
            sinchSms.send(no, 'Password change request. Follow link to change your password Link:- http://sanketpro.westus.cloudapp.azure.com/yag/account/resetkey/'+token).then(response => {
                //All good, response contains messageId
                console.log(response)
                }).fail(error => {
                // Some type of error, see error object
                console.log(error)
                })
        },
        sendUser: async function sendUser(no,acc){
            sinchSms.send(no, 'Dear Sanket User,'+"\r\n"+'Please find the usernames associated with the mobile number '+no+'.\r\n\n '+acc+' \n\nRegards\nTeam Sanket').then(response=>{
                            //All good, response contains messageId
                            console.log(response)
                        }).fail(error => {
                        // Some type of error, see error object
                        console.log(error)
                        })
        }
    }
}
