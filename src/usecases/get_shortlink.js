import url from 'url';
import Cache from '../services/cache';
import { findSortLinkByCode } from '../repositories/shortlink_repository';

export default async (shortLink) => {
  const parsedUrl = url.parse(shortLink);
  const code = parsedUrl.pathname.replace('/', '');

  const client = Cache();
  const cachedInstance = client.get(code);
  if (cachedInstance) {
    return {
      result: true, data: cachedInstance,
    };
  }

  const instance = await findSortLinkByCode(code);
  if (!instance) {
    return {
      result: false, error: 'invalid url',
    };
  }

  const data = {
    deeplink: instance.deeplink,
    webURL: instance.webURL,
  };

  // add created link to cache.
  await client.set(code, data);

  return data;
};
