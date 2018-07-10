const ConsumerGroup = require('kafka-node').ConsumerGroup;
const async = require('async');
const {
  consumerOptionsFormalizer,
  consumerTopicsArrayFormalizer
} = require('./lib/helper_functions');

function init(consumerOptionsObject, onMessageFunction, onErrorFunction) {
  const consumerOptions = consumerOptionsFormalizer(consumerOptionsObject);

  // function onError(error) {
  //   console.error(error);
  //   console.error(error.stack);
  // }

  // function onMessage(message) {
  //   console.log(
  //     `ClientId: ${this.client.clientId} Topic=${message.topic} Partition=${
  //       message.partition
  //     } Offset=${message.offset}`
  //   );
  // }

  const topics = consumerTopicsArrayFormalizer(consumerOptionsObject);
  const consumerGroup = new ConsumerGroup(
    Object.assign(
      { id: consumerOptionsObject.consumerId || 'consumer1' },
      consumerOptions
    ),
    topics
  );
  consumerGroup.on('error', onErrorFunction);
  consumerGroup.on('message', onMessageFunction);

  process.once('SIGINT', () => {
    async.each([consumerGroup], (consumer, callback) => {
      consumer.close(true, callback);
    });
  });
}

exports.initConsumer = init;
