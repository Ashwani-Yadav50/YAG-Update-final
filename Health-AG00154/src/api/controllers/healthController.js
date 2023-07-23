import bp from '../../lib/models/bp'
import sugar from '../../lib/models/sugar'
import cholesterol from '../../lib/models/cholesterol'
import ecg from '../../lib/models/ecg'
import stress from '../../lib/models/stress'
import healthSerializer from '../../lib/serializers/healthSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function create(req, res) {
  const reqbody = req.swagger.params.account.value
  try {
    const deserializeData = await accountSerializer.deserialize(reqbody)
    deserializeData.map(v => v.username = req.swagger.params.username.value)
    const accountResponse = await account.createNew(deserializeData)
    res.status(201).send(await accountSerializer.serialize(accountResponse))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else {
      console.log(err)
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}


export async function getAll(req, res) {
  try {

    let data = [];
   
    let count = devices.length;
    devices.map(async (item, index) => {
      // setTimeout(async ()=>{
      let obj = {};
      obj.deviceId = item.deviceId
      let lastecgdate = await ecg.findLast(item.deviceId)
      let laststressdate = await stress.findLast(item.deviceId)
      //console.log(lastecgdate)
      lastecgdate.map((ite)=>{
        if (lastecgdate.createdTs) {
          objEcg.lastecgdate = ite.createdTs
        } else {
          //console.log('no data')
          objEcg.lastecgdate = ""
        }
      })
      

      if (laststressdate.createdTs) {
        //console.log('no data')
        obj.laststressdate = laststressdate.createdTs.split('T')[0]
      } else {
        obj.laststressdate = "";
      }
      // },1000*index)
      data.push(obj)
      //console.log(data)
      count--;
      console.log(count)
      console.log(devices.length)
    })
    setTimeout(()=>{
      res.json({ data: data}).status(200)
    },20000)
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function getHealthByID(req, res) {
  try {
    const username = req.swagger.params.username.value
    console.log("Getting All Health Data by username - " + username)
    const healthResponse = {}
    healthResponse.ecg = await ecg.getByID(username)
    healthResponse.bp = await bp.getByID(username)
    healthResponse.sugar = await sugar.getByID(username)
    healthResponse.cholesterol = await cholesterol.getByID(username)
    healthResponse.stress = await stress.getByID(username)
    res.status(200).json(await healthSerializer.serialize(healthResponse))
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function getallDatawithouttestingdata(req, res) {
  try {
    const username = req.swagger.params.username.value
    const deviceId = req.swagger.params.deviceId.value
    console.log("Getting All Health Data by username - " + username, deviceId)
    const healthResponse = {}
    healthResponse.ecg = await ecg.getByIDAndUsername(username, deviceId)
    healthResponse.stress = await stress.getByIDAndUsername(username, deviceId)
    res.status(200).json(await healthSerializer.serialize(healthResponse))
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

export async function updateByID(req, res) {
  const reqbody = req.swagger.params.updateAccount.value
  try {
    const deserializeData = await accountSerializer.deserialize(reqbody)
    const accountUpdateResponse = await account.updateByID(deserializeData, req.swagger.params.userId.value)
    res.status(200).json(await accountSerializer.serialize(accountUpdateResponse))
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}