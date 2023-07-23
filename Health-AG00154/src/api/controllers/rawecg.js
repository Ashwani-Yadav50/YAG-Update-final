import ecg from '../../lib/models/rawEcg'
import ecgSerializer from '../../lib/serializers/ecgSerializer'
import { errorsList } from '../../lib/errors/errorsList'

export async function createRawEcg(req, res) {
  console.log("raw")
  console.log('Data Entry - ECG , username - ' + req.swagger.params.username.value)
  const reqbody = req.swagger.params.ecgBody.value
  try {
    let ecgResponse = {}
    const deserializeData = await ecgSerializer.deserialize(reqbody)
    deserializeData.map(v => v.username = req.swagger.params.username.value)
    ecgResponse = await ecg.createNew(deserializeData[0])
    res.status(201).json(deserializeData)
    // res.send('200')
  } catch (err) {
    // console.log(err)
    if (err.statusCode) {
      res.status(err.statusCode).json(err.error)
    }
    else if (err.NoContent) {
      const deserializeError = await accountSerializer.error(errorsList.noContentFound)
      res.status(204).json(deserializeError)
    }
    else if (err.code) {
      const deserializeError = await bpSerializer.error(errorsList.duplicateIDFound)
      res.status(409).json(deserializeError)
    } else {
      res.status(500).json(errorsList.accountServiceError)
    }
  }
}