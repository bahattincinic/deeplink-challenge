import querystring from 'querystring';
import { findSectionById } from '../repositories/section_repository';
import { findProductById } from '../repositories/product_repository';

const fallbackUrl = 'https://www.example.com';

const routes = {
  Home: [
    {
      url: () => fallbackUrl,
      rule: (queryString) => !queryString.SectionId,
    },
    {
      url: (p) => `${fallbackUrl}/boutique/list/${p.SectionId.slug}/`,
      rule: (queryString) => !!queryString.SectionId,
      params: {
        SectionId: findSectionById,
      },
    },
  ],
  Product: [{
    queryString: {
      CampaignId: 'boutiqueId',
      MerchantId: 'merchantId',
    },
    params: {
      ContentId: findProductById,
    },
    rule: () => true,
    url: (p) => (
      `${fallbackUrl}/${p.ContentId.brand}/${p.ContentId.slug}-p-${p.ContentId.id}`
    ),
  }],
  Search: [{
    url: () => `${fallbackUrl}/all-products`,
    queryString: {
      Query: 'q',
    },
    rule: () => true,
  }],
  Favorites: [{
    url: () => fallbackUrl,
    rule: () => true,
  }],
  Orders: [{
    url: () => fallbackUrl,
    rule: () => true,
  }],
};


export default async (deepLink) => {
  const namespace = 'dl://?';
  if (!deepLink.startsWith(namespace)) {
    return {
      found: false,
      url: null,
    };
  }

  const queryString = {
    ...(querystring.parse(deepLink.replace(namespace, '')) || {}),
  };

  const route = routes[(queryString.Page || '')] || [];
  const matchedConditions = route.filter((pattern) => pattern.rule(queryString));

  if (matchedConditions.length === 0) {
    return {
      found: false,
      url: null,
    };
  }

  const matchedCondition = matchedConditions[0];
  let populatedParams = {};
  let populatedQueryString = {};

  if (matchedCondition.params) {
    const availableKeys = Object.keys(matchedCondition.params)
      .filter((p) => p in queryString);

    populatedParams = await availableKeys.reduce(async (result, param) => {
      const value = queryString[param];
      const instance = await matchedCondition.params[param](value);
      return {
        ...result,
        ...(instance ? {
          [param]: instance,
        } : {}),
      };
    }, {});

    if (Object.keys(populatedParams).length !== Object.keys(matchedCondition.params).length) {
      return {
        found: false,
        url: null,
      };
    }
  }
  if (matchedCondition.queryString) {
    populatedQueryString = Object.keys(matchedCondition.queryString)
      .filter((p) => p in queryString)
      .reduce((result, param) => ({
        ...result,
        [matchedCondition.queryString[param]]: queryString[param],
      }), {});
  }

  let generatedUrl = matchedCondition.url(populatedParams);
  if (Object.keys(populatedQueryString).length > 0) {
    generatedUrl += `?${querystring.stringify(populatedQueryString)}`;
  }

  return {
    found: true,
    url: generatedUrl,
  };
};
