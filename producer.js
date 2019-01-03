const kafka = require('kafka-node');
const uuid = require('uuid');

const KeyedMessage = kafka.KeyedMessage;

const initProducer = (host, port, clientId) => {
  console.log('init producer properties: ', {
    kafkaHost: `${host}:${port}`,
    clientId: `${clientId}`,
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  });
  const client = new kafka.KafkaClient({
    kafkaHost: `${host}:${port}`,
    clientId: `${clientId}`,
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  });
  console.log('client is: ', client);
  const producer = new kafka.Producer(client, {
    requireAcks: 1,
    ackTimeoutMs: 100,
    partitionerType: 3
  });

  producer.on('ready', () => {
    console.log('Yeehah!! Kafka is ready!!');
  });

  producer.on('error', error => {
    console.log('kafka-non-producer error: ', error);
  });
  return {
    sendRecord: ({ type, userId, data }, key, topic, callback = () => {}) => {
      const event = {
        id: uuid.v4(),
        timestamp: Date.now(),
        userId: userId,
        type: type,
        data: data
      };
      buffer = new KeyedMessage(
        `${key}`,
        new Buffer.from(JSON.stringify(event))
      );
      if (buffer) {
        const record = [
          { topic: topic, messages: buffer, key: `${key}`, attributes: 1 }
        ];
        producer.send(record, callback);
      } else {
        console.log('KAFKA PRODUCER LEVEL:50', {
          type: type,
          userId: userId,
          data: data,
          key: key,
          topic: topic
        });
      }
    },
    sendEvent: (data, key, topic, callback = () => {}) => {
      const event = data;
      buffer = new KeyedMessage(
        `${key}`,
        new Buffer.from(JSON.stringify(event))
      );

      const record = [
        { topic: topic, messages: buffer, key: `${key}`, attributes: 1 }
      ];

      producer.send(record, callback);
    }
  };
};

exports.initProducer = initProducer;
