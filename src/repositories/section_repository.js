import Models from '../data/models';

const findSectionBySlug = async (slug) => {
  const instance = await Models.Sections.findOne({
    where: { slug },
  });
  return instance;
};

export {
  findSectionBySlug,
};
