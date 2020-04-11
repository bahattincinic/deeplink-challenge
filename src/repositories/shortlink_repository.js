import Models from '../data/models';


const createSortLink = async (code, deeplink, web_url) => {
  const instance = await Models.ShortLinks.create({
    code,
    web_url,
    deeplink,
  });
  return instance;
};

const findSortLinkByCode = async (code) => {
  const instance = await Models.ShortLinks.findOne({
    where: { code },
  });
  return instance;
};


export {
  createSortLink,
  findSortLinkByCode,
};
