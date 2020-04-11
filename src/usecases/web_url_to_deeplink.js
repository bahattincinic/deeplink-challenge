import url from 'url';
import querystring from 'querystring';
import { findSectionBySlug } from '../repositories/section_repository';
import Logger from '../logger';

const routes = [
  {
    path: '^/$',
    page: 'Home',
  },
  {
    path: '^/butik/liste/$',
    page: 'Home',
  },
  {
    path: '^/butik/liste/([\\w-]+)/$',
    page: 'Home',
    params: [
      {
        name: 'SectionId',
        value: (instance) => instance.id,
        fetcher: findSectionBySlug,
      },
    ],
  },
  {
    path: '^/Hesabim/*',
    page: 'Home',
  },
  {
    web_path: '^/tum--urunler$',
    page: 'Search',
    queryString: {
      q: 'Query',
    },
  },
];

export default async (webUrl) => {
  const parsedUrl = url.parse(webUrl);

  const matchedRoutes = routes.filter((route) => {
    const re = new RegExp(route.path);
    return re.test(parsedUrl.path);
  });

  if (!matchedRoutes) {
    return {
      found: false, url: null,
    };
  }

  // Get first matched route. Because router list is sorted.
  const matchedRoute = matchedRoutes[0];
  Logger.info(`${matchedRoute.path} URL matched.`);

  let deeplink = `ty://?page=${matchedRoute.page}`;

  // handle query string params (for example search)
  if (matchedRoute.queryString && parsedUrl.query) {
    const parsedQs = {
      ...querystring.parse(parsedUrl.query),
    };
    const qsResult = Object.keys(parsedQs)
      .filter((q) => q in matchedRoute.queryString)
      .reduce((result, q) => ({
        ...result,
        [matchedRoute.queryString[q]]: parsedQs[q],
      }), {});
    if (qsResult) {
      deeplink += `&${querystring.stringify(qsResult)}`;
    }
  }

  // Handle dynamic url params
  const matchedParams = [
    ...parsedUrl.path.match(matchedRoute.path),
  ];
  let generatedParams = null;
  if (matchedParams && matchedParams.length > 1 && matchedRoute.params) {
    matchedParams.shift(); // remove URL from the array.
    generatedParams = await matchedParams.reduce(async (result, param, index) => {
      const rule = matchedRoute.params[index];
      const instance = await rule.fetcher(param);
      return {
        ...result,
        ...(instance ? {
          [rule.name]: rule.value(instance),
        } : {}),
      };
    }, {});
  }

  if (generatedParams) {
    deeplink += `&${querystring.stringify(generatedParams)}`;
  }

  return {
    found: true,
    url: deeplink,
  };
};
