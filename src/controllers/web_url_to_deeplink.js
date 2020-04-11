export default async (ctx) => {
  const { body } = ctx.request;
  ctx.body = body;
};
