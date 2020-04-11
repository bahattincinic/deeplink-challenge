import Models from '../data/models';

const addRequestLog = async (url, status, request, response) => {
  const instance = await Models.RequestLogs.create({
    operation: url,
    status,
    request,
    response,
  });
  return instance;
};

export {
  addRequestLog,
};
