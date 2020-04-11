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
    params: {
      0: {
        name: 'SectionId',
        value: (instance) => instance.id,
        fetcher: findSectionBySlug,
      },
    },
  },
  {
    path: '^/Hesabim/*',
    page: 'Home',
  },
  {
    path: '^/tum--urunler/$',
    page: 'Search',
    queryString: {
      q: 'Query',
    },
  },
  {
    path: '^/([\\w-]+)/([\\w-]+)-p-([\\w-]+)/',
    page: 'Product',
    queryString: {
      boutiqueId: 'CampaignId',
      merchantId: 'MerchantId',
    },
    params: {
      2: {
        name: 'ContentId',
        value: (currentValue) => currentValue,
      },
    },
  },
];

export default async (webUrl) => {
  const parsedUrl = url.parse(webUrl);
  let parsedUrlPath = parsedUrl.pathname;

  if (!parsedUrlPath.endsWith('/')) {
    // Avoid inconsistent match.
    parsedUrlPath += '/';
  }

  const matchedRoutes = routes.filter((route) => {
    const re = new RegExp(route.path);
    return re.test(parsedUrlPath);
  });

  if (matchedRoutes.length === 0) {
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
    ...(parsedUrlPath.match(matchedRoute.path) || []),
  ];
  let generatedParams = null;
  if (matchedParams && matchedParams.length > 1 && matchedRoute.params) {
    matchedParams.shift(); // remove URL from the array.
    generatedParams = await matchedParams.reduce(async (result, param, index) => {
      const rule = matchedRoute.params[index];
      if (!rule) {
        // unexpected param.
        return result;
      }

      let instance = null;
      if (rule.fetcher) {
        instance = await rule.fetcher(param);
      }

      return {
        ...result,

        // Handle db fields
        ...(instance ? {
          [rule.name]: rule.value(instance),
        } : {}),

        // Handle Proxy fields
        ...((!instance && rule.value) ? {
          [rule.name]: rule.value(param),
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
