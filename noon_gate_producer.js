const axios = require('axios');
const uuid = require('uuid');
const noonGateProducerConstants = require('./lib/constants/noon_gate_producer');

const noonGateAddress = `${noonGateProducerConstants.noonGateRpcHostConstant}:${
  noonGateProducerConstants.noonGateRpcPortConstant
}`;

sendRecordToNoonGate = async ({ type, userId, data }, topic) => {
  let response;
  const url = `${noonGateAddress}/${
    noonGateProducerConstants.noonGateRouteConstant
  }/${topic}`;
  const bodyData = {
    id: uuid.v4(),
    timestamp: Date.now(),
    userId: userId,
    type: type,
    data: data,
    topic: topic
  };
  try {
    response = await axios.post(url, bodyData);
  } catch (error) {
    throw new Error('noon_gate_producer_internal_error');
  }
  return response;
};

exports.sendRecordToNoonGate = sendRecordToNoonGate;
