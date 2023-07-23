const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: '7fd8a21d',
  apiSecret: 'CyCjFpaQfdqZ23Vc'
})

export default sms()

function sms(){
    return{
        sendSMS : async function sendSMS(username,no ,key){
            console.log('Sending key of -' + username +" to - "+ no)
            const from = 'AGATSA'
            const to = '918076185132'
            const text = "Dear Sanket user, Enter the given key in the link section of sanket app. \r\n\nYour Key :- "+ key
            console.log(text)
            nexmo.message.sendSms(from, to, text,(err,data)=>{
                if(err) return err;
                console.log(data)
            })
            return "sent";
        },
    }
}