import { Joi } from 'koa-joi-router';
import {
  deepLinkToWebUrl,
} from '../usecases';

const handler = async (ctx) => {
  /*
  Example request is below;
  {
    "deeplink": " ty://?Page=Home&SectionId=2"
  }
 */
  const { deeplink } = ctx.request.body;
  const result = await deepLinkToWebUrl(deeplink);

  if (result.found) {
    ctx.body = {
      webURL: result.url,
    };
  } else {
    ctx.status = 400;
    ctx.body = { message: 'Invalid url' };
  }
};

const validator = {
  deeplink: Joi.string().uri().required(),
};

export default (router) => {
  router.route([
    {
      method: 'post',
      path: '/deeplink-to-web-url',
      validate: {
        body: validator,
        type: 'json',
      },
      handler,
    },
  ]);
};
