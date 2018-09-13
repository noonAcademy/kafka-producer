function consumerOptionsFormalizer(consumerOptionsObject) {
  const isAutoCommitAvailable = consumerOptionsObject.autoCommit;
  const returnConsumerOptionsObject = {
    kafkaHost: consumerOptionsObject.kafkaHost,
    groupId: consumerOptionsObject.groupId || 'ExampleTestGroup',
    sessionTimeout: consumerOptionsObject.sessionTimeout || 15000,
    protocol: consumerOptionsObject.protocol || ['roundrobin'],
    fetchMaxWaitMs: consumerOptionsObject.fetchMaxWaitMs || 1000,
    fetchMaxBytes: consumerOptionsObject.fetchMaxBytes || 1024 * 1024,
    fromOffset: consumerOptionsObject.fromOffset || 'earliest'
  };
  if (isAutoCommitAvailable === false) {
    returnConsumerOptionsObject.autoCommit = false;
  } else {
    returnConsumerOptionsObject.autoCommit = true;
  }
  return returnConsumerOptionsObject;
}

function consumerTopicsArrayFormalizer(consumerOptionsObject) {
  let returnTopicsArray = [];
  if (consumerOptionsObject.topics) {
    returnTopicsArray = consumerOptionsObject.topics;
  } else {
    returnTopicsArray = ['webevents.dev1'];
  }
  return returnTopicsArray;
}

exports.consumerOptionsFormalizer = consumerOptionsFormalizer;
exports.consumerTopicsArrayFormalizer = consumerTopicsArrayFormalizer;
