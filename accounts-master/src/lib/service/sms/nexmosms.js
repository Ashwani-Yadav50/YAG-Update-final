const Nexmo = require('nexmo')
const shortUrl = require('node-url-shortener');
var request = require("request");

const nexmo = new Nexmo({
    apiKey: '7fd8a21d',
    apiSecret: 'CyCjFpaQfdqZ23Vc'
})

export default sms()

function sms() {
    return {
        sendSMS: async function sendSMS(no, otp) {
            console.log('sending verification msg')
            console.log(no)
            const from = 'AGATSA'
            const to = no
            const text = 'Your verification code is ' + otp;
            nexmo.message.sendSms(from, to, text, (err, data) => {
                if (err) return err;
                console.log(data)
            })
            return "sent";
        },
        sendUsSMS: async function sendUsSMS(no, otp) {
            console.log('sending verification msg')
            const from = '12013505294'
            const to = no
            const text = 'Your verification code is ' + otp;
            nexmo.message.sendSms(from, to, text, (err, data) => {
                if (err) return err;
                console.log(data)
            })
            return "sent";
        },
        sendIndSms: async function sendIndSms(no, otp) {
            var options = {
                method: 'POST',
                url: 'https://www.alcodes.com/api/sms-compose',
                headers:
                {
                    'Postman-Token': '547d402f-d74a-4d43-ab99-cad0871fc01a',
                    'cache-control': 'no-cache',
                    Authorization: 'Basic MGNhYzFiNDYtZjIwNy00MDM4LWE5NzAtZmYxNzk4ODhiMjA0OnBhc3N3ZA==',
                    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
                },
                formData:
                {
                    countryCode: 'IN',
                    smsSenderId: 'AGATSA',
                    is_otp: 'true',
                    message: 'Your otp is '+otp,
                    phoneNumbers: no
                }
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
                return "sent";
            });
        },
        passwordReset: async function passwordReset(no, otp) {
            console.log('sending password reset msg')
            const from = 'AGATSA'
            const to = no
            shortUrl.short("http://sanketpro.westus.cloudapp.azure.com/yag/account/resetkey/" + otp, function (err, url) {
                //console.log(url);
                const text = 'Password change request. Follow link to change your password Link:-' + url
                //console.log(text)
                nexmo.message.sendSms(from, to, text, (err, data) => {
                    if (err) return err;
                    console.log(data)
                })
            });

            return "sent";
        },
        usernameReset: async function usernameReset(no, otp) {
            console.log('sending username reset msg')
            const from = 'AGATSA'
            const to = no
            const text = 'Dear Sanket User,' + "\r\n" + 'Please find the usernames associated with the mobile number ' + no + '.\r\n\n ' + otp + ' \n\nRegards\nTeam Sanket'
            //console.log(text)
            nexmo.message.sendSms(from, to, text, (err, data) => {
                if (err) return err;
                console.log(data)
            })
            return "sent";
        },
    }
}