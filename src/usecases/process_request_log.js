import { addRequestLog } from '../repositories/request_log_repository';

export default async (body) => {
  await addRequestLog(body.url, body.status, body.request, body.response);
};
