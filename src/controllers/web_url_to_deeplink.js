import { Joi } from 'koa-joi-router';
import webUrlToDeepLink from '../usecases/web_url_to_deeplink';
import logRequest from '../usecases/request_log';

const handler = async (ctx) => {
  /*
  Example request is below;
  {
    "webURL" : "https://www.trendyol.com/butik/liste/erkek"
  }
 */
  const { webURL } = ctx.request.body;
  const result = await webUrlToDeepLink(webURL);

  if (result.found) {
    ctx.body = {
      deeplink: result.url,
    };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Invalid url' };
  }

  await logRequest(ctx.request.url, ctx.status || 200, ctx.request.body, ctx.body);
};

const validator = {
  webURL: Joi.string().uri().required(),
};

export default (router) => {
  router.route([
    {
      method: 'post',
      path: '/web-url-to-deeplink',
      validate: {
        body: validator,
        type: 'json',
      },
      handler,
    },
  ]);
};
