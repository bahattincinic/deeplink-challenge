import Queue from '../queue/amqp';

export default async (url, status, request, response) => {
  // it can be added to KoaJS middleware to log every request. i have only 4 endpoints.
  // that's why I didn't do this.

  const client = await Queue.init();

  const data = {
    url,
    status,
    response,
    request,
  };
  await client.sendToQueue(data);
};
