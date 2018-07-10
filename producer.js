const kafka = require('kafka-node');
const uuid = require('uuid');

const KeyedMessage = kafka.KeyedMessage;

const initProducer = (host, port, clientId) => {
  const client = new kafka.KafkaClient(`${host}:${port}`, `${clientId}`, {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  });
  const producer = new kafka.Producer(client, {
    requireAcks: 1,
    ackTimeoutMs: 100,
    partitionerType: 3
  });

  producer.on('ready', () => {
    console.log('Yeehah!! Kafka is ready!!');
  });

  producer.on('error', error => {
    console.error(error);
  });
  return {
    sendRecord: ({ type, userId, data }, topic, callback = () => {}) => {
      const event = {
        id: uuid.v4(),
        timestamp: Date.now(),
        userId: userId,
        type: type,
        data: data
      };
      buffer = new KeyedMessage(
        `${userId}`,
        new Buffer.from(JSON.stringify(event))
      );

      const record = [
        { topic: topic, messages: buffer, key: `${userId}`, attributes: 1 }
      ];

      producer.send(record, callback);
    }
  };
};

exports.initProducer = initProducer;
