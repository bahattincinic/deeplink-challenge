import { Joi } from 'koa-joi-router';
import createShortLink from '../usecases/create_shortlink';
import { appPort } from '../config';

const handler = async (ctx) => {
  /*
  Example WebURL request is below;
  {
    "webURL": "https://www.trendyol.com/tum--urunler?q=elbise”"
  }
  Example deeplink request is below;
  {
    "deeplink": "ty://?Page=Search&Query=elbise"
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
