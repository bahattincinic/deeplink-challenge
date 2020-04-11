import Models from '../data/models';

const findSectionBySlug = async (slug) => {
  const instance = await Models.Sections.findOne({
    where: { slug },
  });
  return instance;
};

const findSectionById = async (id) => {
  const instance = await Models.Sections.findOne({
    where: {
      id: parseInt(id),
    },
  });
  return instance;
};

export {
  findSectionBySlug,
  findSectionById,
};
