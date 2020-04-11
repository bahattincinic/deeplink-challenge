import shortid from 'shortid';
import webUrlToDeepLink from './web_url_to_deeplink';
import deepLinkToWebUrl from './deeplink_to_web_url';
import { createSortLink } from '../repositories/shortlink_repository';
import Cache from '../services/cache';

const commonErrorMessage = {
  result: false,
  error: 'Please enter valid `web_url` or `deeplink`',
};

export default async (links) => {
  let { webURL, deeplink } = links.webURL;

  if (!webURL && !deeplink) {
    return commonErrorMessage;
  }

  if (webURL) {
    const result = webUrlToDeepLink(webURL);
    if (!result.found) {
      return commonErrorMessage;
    }
    deeplink = result.url;
  } else {
    const result = deepLinkToWebUrl(deeplink);
    if (!result.found) {
      return commonErrorMessage;
    }
    webURL = result.url;
  }

  const code = shortid.generate().toLowerCase();
  await createSortLink(code, deeplink, webURL);

  // add created link to cache.
  const client = Cache();
  await client.set(code, {
    deeplink, webURL,
  });

  return {
    result: true,
    code,
  };
};
