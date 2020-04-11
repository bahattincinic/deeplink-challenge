import Queue from '../queue/amqp';

export default async (url, status, request, response) => {
  const client = await Queue.init();

  const data = {
    url,
    status,
    response,
    request,
  };
  await client.sendToQueue(data);
};
