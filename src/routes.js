import Router from 'koa-joi-router';
import {
  webUrlToDeepLink,
} from './controllers';
import {
  apiVersion,
} from './config';

const appRouter = new Router();
appRouter.prefix(`/api/${apiVersion}`);
webUrlToDeepLink(appRouter);


export default appRouter;
