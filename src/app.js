import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import router from './routes';
import errorHandling from './middlewares/error_handling';


const app = new Koa();
app
  .use(bodyParser())
  .use(logger())
  .use(errorHandling)
  .use(router.middleware());

export default app;
