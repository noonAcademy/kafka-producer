const axios = require('axios');
const uuid = require('uuid');
const noonGateProducerConstants = require('./lib/constants/noon_gate_producer');

const noonGateAddress = `${noonGateProducerConstants.noonGateRpcHostConstant}`;

sendRecordToNoonGate = async (
  { type, userId, data },
  topic,
  isAsync = false
) => {
  let response;
  const url = `${noonGateAddress}/${
    noonGateProducerConstants.noonGateRouteConstant
  }/${topic}?sync=${isAsync}`;
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
    console.log(
      'NOONGATE URL IS: ',
      `${noonGateAddress}/${
        noonGateProducerConstants.noonGateRouteConstant
      }/${topic}?sync=${isAsync}`
    );
    throw new Error(`noon_gate_producer_internal_error ${error}`);
  }
  return response;
};

exports.sendRecordToNoonGate = sendRecordToNoonGate;
