import shortid from 'shortid';
import webUrlToDeepLink from './web_url_to_deeplink';
import deepLinkToWebUrl from './deeplink_to_web_url';
import { createSortLink } from '../repositories/shortlink_repository';
import Cache from '../services/cache';

const commonErrorMessage = {
  result: false,
  code: null,
};

export default async (links) => {
  let { webURL, deeplink } = links;

  if (!webURL && !deeplink) {
    return commonErrorMessage;
  }

  if (webURL) {
    const result = await webUrlToDeepLink(webURL);
    if (!result.found) {
      return commonErrorMessage;
    }
    deeplink = result.url;
  } else {
    const result = await deepLinkToWebUrl(deeplink);
    if (!result.found) {
      return commonErrorMessage;
    }
    webURL = result.url;
  }

  const code = shortid.generate().toLowerCase();
  await createSortLink(code, deeplink, webURL);

  // add created link to cache.
  const client = new Cache();
  await client.set(code, {
    deeplink, webURL,
  });

  return {
    result: true,
    code,
  };
};
