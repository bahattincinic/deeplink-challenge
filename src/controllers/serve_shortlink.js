import { Joi } from 'koa-joi-router';
import getShortLink from '../usecases/get_shortlink';

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
    ctx.body = { message: shortLink.error };
  }
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
