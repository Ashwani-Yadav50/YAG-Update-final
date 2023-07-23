import account from '../../lib/models/account'
import phonevalid from '../../lib/models/phonevalid'
import verison from '../../lib/models/verison'
import accountSerializer from '../../lib/serializers/accountSerializer'
import keyDecoder from '../../lib/serializers/keyDeserializer'
import { errorsList } from '../../lib/errors/errorsList'
import crypto from 'crypto'
import nexmosms from '../../lib/service/sms/nexmosms';
import request from 'request';

//for git

function getuser(cb){
    var options = {
        method: 'GET',
        url: 'https://sdklab.blob.core.windows.net/users/labuser.json',
        headers:
        {
            'Postman-Token': 'd3c18ed9-d7da-4a23-80a1-3bd13182b101',
            'cache-control': 'no-cache'
        }
    };

    request(options,async function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        cb(body)
    });
}
export async function getlist(req, res) {
    console.log("get labuser list")
    try {
        console.log("Secondary")
        getuser(data=>{
            res.status(200).json({ data: JSON.parse(data) })
        })
       
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode).json(err.error)
        } else if (err.code) {
            const deserializeError = await accountSerializer.error(errorsList.duplicateIDFound)
            res.status(409).json(deserializeError)
        } else {
            res.status(500).json(errorsList.accountServiceError)
        }

    }
}
