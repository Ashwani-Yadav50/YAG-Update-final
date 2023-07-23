const msg9 = require('msg91-sms')

const authkey = "195576Aja9HMgGlG5a6ed97d"
const senderid = "SANKET"
const route = "4"


export default msg91()



function msg91(){
    return{
        sendSMS : async function sendSMS(dialcode, number ,token){
            return new Promise((resolve,reject)=>{
           msg9.sendOne(authkey,number,'Password change request. Follow link to change your password Link:- http://40.83.251.117/yag/account/resetkey/'+token,senderid,route,"0",function(response){
           // msg9.sendOne(authkey,"+971507485829",'test by Vipin Mohan',senderid,route,"0",function(response){
 
                //Returns Message ID, If Sent Successfully or the appropriate Error Message 
                console.log(response);
                resolve(response)
                })
            })
        },
        sendUser: async function sendUser(dialcode,number,acc){
            return new Promise((resolve,reject)=>{
            msg9.sendOne(authkey,number,'Dear Sanket User,'+"\r\n"+'Please find the usernames associated with the mobile number '+number+'.\r\n\n '+acc+' \n\nRegards\nTeam Sanket',senderid,route,"0",function(response){
 
                //Returns Message ID, If Sent Successfully or the appropriate Error Message 
                console.log(response);
                resolve(response)
                })
            })
        }
    }
}