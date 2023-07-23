import bp from '../../lib/models/bp'
import bpSerializer from '../../lib/serializers/bpSerializer'
import {
  errorsList
} from '../../lib/errors/errorsList'
import request from "request";

export async function createbp(req, res) {
  console.log('Data Entry - BP , username - ' + req.swagger.params.username.value)
  const reqbody = req.swagger.params.bpBody.value
  try {
    const deserializeData = await bpSerializer.deserialize(reqbody)
    deserializeData.map(v => v.username = req.swagger.params.username.value)
    const bpResponse = await bp.createNew(deserializeData[0])
    
    // Commented by Saurabh
    // var options = {
    //   'method': 'POST',
    //   'url': 'http://35.228.111.244:8011/bp',
    //   'headers': {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(bpResponse)
    // };
    // request(options, function (error, response) {
    //   if (error) throw new Error(error);
    //   console.log(response.body);
    // });

    res.status(201).send(await bpSerializer.serialize(bpResponse))
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else {
      console.log(err)
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getallbp(req, res) {
  console.log("Getting all BPs")
  try {
    const allBpResponse = await bp.getAll()
    res.status(200).json(await bpSerializer.serialize(allBpResponse))
  } catch (err) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    } else if (err.code) {
      const deserializeError = await bpSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}

export async function getBpByID(req, res) {
  console.log("Getting BPs by username - " + req.swagger.params.username.value)
  try {
    const accountByIdResponse = await bp.getByID(req.swagger.params.username.value)
    res.status(200).json(await bpSerializer.serialize(accountByIdResponse))
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

export async function updateByID(req, res) {
  console.log("fake as fake")
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
export async function deleteBP(req, res) {
  console.log("Deleting BP by createdTs - " + req.swagger.params.createdTs.value + " By username - " + req.swagger.params.username.value)
  try {
    const username = req.swagger.params.username.value
    const createdTs = req.swagger.params.createdTs.value
    const deleteBpResponse = await bp.deleteBp(username, createdTs)
    res.status(200).json(deleteBpResponse)
  } catch (err) {
    console.log(err)
    res.status(500).json(errorsList.pricingPlanServiceError)
  }
}

//get all data by username
export async function getallbpbyusername(req, res) {
  console.log("Getting BPs by username - " + req.swagger.params.username.value)
  try {
    const accountByIdResponse = await bp.getallbyusername(req.swagger.params.username.value)
    res.status(200).json(await bpSerializer.serialize(accountByIdResponse))
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

export async function getallbpbydeviceId(req, res) {
  console.log("Getting BPs by username - " + req.swagger.params.deviceId.value)
  try {
    const accountByIdResponse = await bp.getallbydeviceId(req.swagger.params.deviceId.value)
    res.status(200).json(await bpSerializer.serialize(accountByIdResponse))
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