/*
Queue & RabbitMQ confs.
https://github.com/squaremo/amqp.node
http://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
*/
export const queueConf = {
  brokerUrl: process.env.BROKER_URL || 'amqp://172.18.0.1',
  durable: true, // the queue will survive broker restarts
  deliveryMode: 2, // 1 (non-persistent) 2 (persistent)
  prefetchCount: 1, // how many items we fetch at the same time.
  queueName: 'deeplink',
};

/*
Default API version.
*/
export const apiVersion = 'v1';

/*
Database connection string.
https://sequelize.org/master/manual/getting-started.html
* */
export const databaseUrl = (
  process.env.DATABASE_URL || 'postgres://postgres:postgres@172.18.0.1:5432/challenge'
);

/*
Redis connection string.
https://github.com/NodeRedis/node-redis#options-object-properties
 */
export const cacheUrl = process.env.CACHE_URL || 'redis://172.18.0.1:6379';

/*
Api Port.
 */
export const appPort = process.env.PORT || 4000;
