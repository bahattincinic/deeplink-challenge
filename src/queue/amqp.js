import amqp from 'amqplib';
import Logger from '../logger';
import { queueConf } from '../config';


export default class Queue {
  constructor(connection, channel) {
    this.connection = connection;
    this.channel = channel;
    this.queueName = queueConf.queueName;
    this.durable = queueConf.durable;
    this.deliveryMode = queueConf.deliveryMode;
  }

  static async init() {
    const connection = await amqp.connect(queueConf.brokerUrl);
    const channel = await connection.createConfirmChannel();

    return new Queue(connection, channel);
  }

  static encodeData(data) {
    return Buffer.from(JSON.stringify(data));
  }

  static decodeData(data) {
    return JSON.parse(data.toString());
  }

  async sendToQueue(item) {
    await this.channel.assertQueue(this.queueName, { durable: this.durable });
    await this.channel.sendToQueue(
      this.queueName,
      Queue.encodeData(item),
      { deliveryMode: this.deliveryMode },
    );

    // if message has been nacked, this will result in an error (rejected promise);
    await this.channel.waitForConfirms();

    Logger.info(`Added item to the ${this.queueName} Queue`);
  }

  async consume(callback) {
    await this.channel.prefetch(queueConf.prefetchCount);
    await this.channel.assertQueue(this.queueName, { durable: this.durable });

    this.channel.consume(this.queueName, async (msg) => {
      const body = Queue.decodeData(msg.content);
      Logger.info('Message Received');
      await callback(body, this.ack.bind(this, msg));
    }, { noAck: false });
  }

  async ack(msg) {
    await this.channel.ack(msg);

    // if message has been nacked, this will result in an error (rejected promise);
    await this.channel.waitForConfirms();
  }

  async close() {
    await this.connection.close();
  }
}
