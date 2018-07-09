const kafka = require('kafka-node');
const uuid = require('uuid');

const init = (host, port, clientId) => {
  const client = new kafka.KafkaClient(`${host}:${port}`, `${clientId}`, {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
  });
  const producer = new kafka.HighLevelProducer(client);

  producer.on('ready', () => {
    console.log('Yeehah!! Kafka is ready!!');
  });

  producer.on('error', error => {
    console.error(error);
  });
  return {
    sendRecord: (
      { type, userId, sessionId, data },
      topic,
      callback = () => {}
    ) => {
      const event = {
        id: uuid.v4(),
        timestamp: Date.now(),
        userId: userId,
        sessionId: sessionId,
        type: type,
        data: data
      };

      const buffer = new Buffer.from(JSON.stringify(event));

      // Create a new payload
      const record = [
        {
          topic: topic,
          messages: buffer,
          attributes: 1
        }
      ];

      producer.send(record, callback);
    }
  };
};

exports.init = init;
