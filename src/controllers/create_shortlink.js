import { Joi } from 'koa-joi-router';
import createShortLink from '../usecases/create_shortlink';
import logRequest from '../usecases/request_log';
import { appPort } from '../config';

const handler = async (ctx) => {
  /*
  Example WebURL request is below;
  {
    "webURL": "https://www.example.com/all-products?q=apple”"
  }
  Example deeplink request is below;
  {
    "deeplink": "dl://?Page=Search&Query=apple"
  }
 */
  const shortLink = await createShortLink(ctx.request.body);

  if (shortLink.result) {
    ctx.body = {
      shortlink: `http://localhost:${appPort}/${shortLink.code}`,
    };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Please enter valid `web_url` or `deeplink`' };
  }

  await logRequest(ctx.request.url, ctx.status || 200, ctx.request.body, ctx.body);
};

const validator = {
  deeplink: Joi.string().uri(),
  webURL: Joi.string().uri(),
};

export default (router) => {
  router.route([
    {
      method: 'post',
      path: '/short-link/create/',
      validate: {
        body: validator,
        type: 'json',
      },
      handler,
    },
  ]);
};
