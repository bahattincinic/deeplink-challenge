import Router from 'koa-router';
import {
  webUrlToDeepLink,
} from './controllers';

const appRouter = new Router();
appRouter.post('/api/v1/web-url-to-deeplink', webUrlToDeepLink);

export default appRouter;
