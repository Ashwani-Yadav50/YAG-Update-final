import datastore from '../../lib/service/db/datastore'
import Mongoose from 'mongoose'
import nexmosms from '../../lib/service/sms/nexmosms';

export default validModal()

function validModal() {
    const Schema = Mongoose.Schema

    const ValidSchema = new Schema({
        phone: { type: Number },
        otp: { type: Number }
    })

    return {
        createOtp: async function createOtp(phone, otp) {
            let obj = {
                "phone":phone,
                "otp":otp
            }
            const ValidModel = Mongoose.model('valid', ValidSchema)
            const doc = await datastore.createOtp(ValidModel,new ValidModel(obj))
            let phonee = phone + "";
            let cc = phonee.slice(0,-10); 
            console.log("cc = "+cc)
            if(cc == 1){
                console.log("usa phone number :- " + phone)
                nexmosms.sendUsSMS(phone, otp)
            }else if(cc == 91){
                phone = phonee.slice(-10);
                console.log("phone number :- " + phone)
                nexmosms.sendIndSms(phone, otp)
            }else{
                console.log("usa phone number :- " + phone)
                nexmosms.sendUsSMS(phone, otp)
            }   
            return doc
        }
    }
}
