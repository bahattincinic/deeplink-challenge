import { Joi } from 'koa-joi-router';
import {
  webUrlToDeepLink,
} from '../usecases';

const handler = async (ctx) => {
  /*
  Example request is below;
  {
    "webURL" : "https://www.trendyol.com/butik/liste/erkek"
  }
 */
  const { webURL } = ctx.request.body;

  ctx.body = {
    deeplink: await webUrlToDeepLink(webURL),
  };
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
