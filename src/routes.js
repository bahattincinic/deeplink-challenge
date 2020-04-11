import Router from 'koa-joi-router';
import {
  webUrlToDeepLink,
  deepLinkToWebUrl,
} from './controllers';
import {
  apiVersion,
} from './config';

const appRouter = new Router();
appRouter.prefix(`/api/${apiVersion}`);

webUrlToDeepLink(appRouter);
deepLinkToWebUrl(appRouter);


export default appRouter;
