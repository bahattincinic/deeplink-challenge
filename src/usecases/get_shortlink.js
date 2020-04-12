import url from 'url';
import Logger from '../logger';
import Cache from '../services/cache';
import { findSortLinkByCode } from '../repositories/shortlink_repository';

export default async (shortLink) => {
  const parsedUrl = url.parse(shortLink);
  const code = parsedUrl.pathname.replace('/', '');

  const client = new Cache();
  const cachedInstance = await client.get(code);
  if (cachedInstance) {
    Logger.info(`${code} hitted the cache`);
    return {
      result: true, data: cachedInstance,
    };
  }

  const instance = await findSortLinkByCode(code);
  if (!instance) {
    return {
      result: false, data: null,
    };
  }

  const data = {
    deeplink: instance.deeplink,
    webURL: instance.webURL,
  };

  // add created link to cache.
  await client.set(code, data);

  return {
    result: true,
    data,
  };
};
