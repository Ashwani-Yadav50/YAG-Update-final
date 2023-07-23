import nodemailer from 'nodemailer'
import fs from 'fs'

export default mailer()

function mailer() {
    return {
        send: async function send(mail, html) {
            const smtpConfig = {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'info@sanketlife.com',
                    pass: 'agatsa1#5'
                }
            }

            const transporter = nodemailer.createTransport(smtpConfig)
            const mailData = {
                from: 'sanketagatsa@gmail.com',
                to: mail,//mail
                subject: 'Reset your Sanket password',//sub
                //text: text1,
                html: html
            }
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailData, (error, obj) => {
                    if (error) {
                        console.log("Error code 3844");
                        reject(error);
                    }
                    else {
                        console.log('Message %s sent: %s', info.messageId, info.response)
                        resolve('Message %s sent: %s', info.messageId, info.response)
                    }
                })
            })
        },
        read: async function read(token) {
            const link = `http://40.83.251.117:80/yag/account/resetkey/${token}`
            return new Promise((resolve, reject) => {
                fs.readFile('./src/lib/service/mail/Password_Reset.txt', (err, data) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    else {
                        //console.log(link)
                        const text = data.toString()
                        const html = text.replace('Password_Change_HERE', link)
                        resolve(html)
                    }
                })
            })
        }
    }
}
