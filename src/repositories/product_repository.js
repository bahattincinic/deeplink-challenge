import Models from '../data/models';

const findProductById = async (id) => {
  const instance = await Models.Products.findOne({
    where: { id },
  });
  return instance;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  findProductById,
};
