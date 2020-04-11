import Amqp from './amqp';
import processRequestLog from '../usecases/process_request_log';


export default async (client = null) => {
  let amqpClient = client;
  if (!client) {
    amqpClient = await Amqp.init();
  }

  amqpClient.consume(async (body, ack) => {
    await processRequestLog(body);
    await ack();
  });
};
