/*
Queue & RabbitMQ confs.
https://github.com/squaremo/amqp.node
http://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
*/
export const queueConf = {
  brokerUrl: process.env.BROKER_URL || 'amqp://172.18.0.1',
  durable: true,
  deliveryMode: 2, // 1 (non-persistent) 2 (persistent)
  prefetchCount: 1,
  queueName: 'deeplink',
};


export const apiVersion = 'v1';
export const databaseUrl = (
  process.env.DATABASE_URL || 'postgres://postgres:postgres@172.18.0.1:5432/challenge'
);
