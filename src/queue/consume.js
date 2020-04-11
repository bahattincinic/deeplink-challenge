import Amqp from './amqp';
import {
  logRequest,
} from '../usecases';


export default async (client = null) => {
  let amqpClient = client;
  if (!client) {
    amqpClient = await Amqp.init();
  }

  amqpClient.consume(async (body, ack) => {
    await logRequest(body);
    await ack();
  });
};
