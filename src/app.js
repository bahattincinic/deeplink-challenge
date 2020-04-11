import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import router from './routes';


const app = new Koa();
app
  .use(bodyParser())
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
