import { Joi } from 'koa-joi-router';
import getShortLink from '../usecases/get_shortlink';
import logRequest from '../usecases/request_log';

const handler = async (ctx) => {
  /*
  Example request is below;
  {
    "shortlink": "http://localhost:4040/xssas"
  }
 */
  const { shortlink } = ctx.request.body;
  const shortLink = await getShortLink(shortlink);

  if (shortLink.result) {
    ctx.body = shortLink.data;
  } else {
    ctx.status = 400;
    ctx.body = { message: 'invalid url' };
  }

  await logRequest(ctx.request.url, ctx.status || 200, ctx.request.body, ctx.body);
};

const validator = {
  shortlink: Joi.string().uri().required(),
};

export default (router) => {
  router.route([
    {
      method: 'post',
      path: '/short-link/get/',
      validate: {
        body: validator,
        type: 'json',
      },
      handler,
    },
  ]);
};
