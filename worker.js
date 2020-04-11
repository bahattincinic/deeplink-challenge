#!/usr/bin/env node

const env = process.env.NODE_ENV || 'development';

require('babel-polyfill');
if (env === 'development') {
  // for development use babel/register for faster runtime compilation
  require('babel-register');
}

require('dotenv').config();

const client = require('./src/queue/amqp').default;
const consume = require('./src/queue/consume').default;

console.log(' [*] Waiting for messages. To exit press CTRL+C');

let amqpClient = null;
client.init().then((amqp) => {
  amqpClient = amqp;
  consume(amqp);
});

process.once('SIGINT', () => {
  if (amqpClient) {
    console.log('SIGINT event...');
    amqpClient.close();
  }
});
