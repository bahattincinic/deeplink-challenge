export default async function errorHandling(ctx, next) {
  /*
  koa-js documentation:
  https://github.com/koajs/koa/wiki/Error-Handling
  */
  try {
    await next();
    if (ctx.status === 404) {
      ctx.body = { error: 'not found' };
    }
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    if (ctx.status === 400 || ctx.status === 500) {
      ctx.body = {
        message: ctx.body,
        type: err.name,
        details: err.details,
      };
    }
  }
}
