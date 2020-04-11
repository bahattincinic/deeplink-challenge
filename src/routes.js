import Router from 'koa-joi-router';
import {
  webUrlToDeepLink,
  deepLinkToWebUrl,
  serveShortLink,
  createShortLink,
} from './controllers';
import {
  apiVersion,
} from './config';

const appRouter = new Router();
appRouter.prefix(`/api/${apiVersion}`);

webUrlToDeepLink(appRouter);
deepLinkToWebUrl(appRouter);
serveShortLink(appRouter);
createShortLink(appRouter);


export default appRouter;
