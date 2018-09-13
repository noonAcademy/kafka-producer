const ConsumerGroup = require('kafka-node').ConsumerGroup;
const async = require('async');
const {
  consumerOptionsFormalizer,
  consumerTopicsArrayFormalizer
} = require('./lib/helper_functions');

const q = async.queue((data, callback) => {
  data.func(data.data, () => {
    callback();
  });
}, 1);

function init(consumerOptionsObject, onMessageFunction, onErrorFunction) {
  const consumerOptions = consumerOptionsFormalizer(consumerOptionsObject);

  const topics = consumerTopicsArrayFormalizer(consumerOptionsObject);
  const consumerGroupInstance = new ConsumerGroup(
    Object.assign(
      { id: consumerOptionsObject.consumerId || 'consumer1' },
      consumerOptions
    ),
    topics
  );

  q.drain = () => {
    consumerGroupInstance.resume();
  };

  consumerGroupInstance.on('error', onErrorFunction);

  consumerGroupInstance.on('message', message => {
    try {
      const messageData = JSON.parse(message.value);
      if (consumerOptionsObject.isAsync) {
        onMessageFunction(messageData, () => {});
      } else {
        consumerGroupInstance.pause();
        q.push({ data: messageData, func: onMessageFunction }, err => {
          console.log('err: ', err);
        });
      }
    } catch (error) {
      // console.log('KAFKA ERROR LEVEL:50', error, message);
    }
  });

  process.once('SIGINT', () => {
    async.each([consumerGroupInstance], (consumer, callback) => {
      consumer.close(true, callback);
    });
  });
  return consumerGroupInstance;
}

exports.initConsumer = init;
