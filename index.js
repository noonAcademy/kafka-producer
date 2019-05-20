const initConsumer = require('./consumer').initConsumer;
const initProducer = require('./producer').initProducer;
const sendRecordToNoonGate = require('./noon_gate_producer')
  .sendRecordToNoonGate;

exports.initConsumer = initConsumer;
exports.initProducer = initProducer;
exports.sendRecordToNoonGate = sendRecordToNoonGate;
