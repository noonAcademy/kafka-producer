const ConsumerGroup = require('kafka-node').ConsumerGroup;
const async = require('async');
const {
  consumerOptionsFormalizer,
  consumerTopicsArrayFormalizer
} = require('./lib/helper_functions');

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
  consumerGroupInstance.on('error', onErrorFunction);
  consumerGroupInstance.on('message', onMessageFunction);

  process.once('SIGINT', () => {
    async.each([consumerGroupInstance], (consumer, callback) => {
      consumer.close(true, callback);
    });
  });
  return consumerGroupInstance;
}

exports.initConsumer = init;
