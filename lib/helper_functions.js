function consumerOptionsFormalizer(consumerOptionsObject) {
  return {
    host: consumerOptionsObject.host || '127.0.0.1:2181',
    groupId: consumerOptionsObject.groupId || 'ExampleTestGroup',
    sessionTimeout: consumerOptionsObject.sessionTimeout || 15000,
    protocol: consumerOptionsObject.protocol || ['roundrobin'],
    fetchMaxWaitMs: consumerOptionsObject.fetchMaxWaitMs || 1000,
    fetchMaxBytes: consumerOptionsObject.fetchMaxBytes || 1024 * 1024,
    fromOffset: consumerOptionsObject.fromOffset || 'earliest'
  };
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
