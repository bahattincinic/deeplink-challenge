export default (Sequelize, DataTypes) => Sequelize.define('Products', {
  name: DataTypes.STRING,
  slug: DataTypes.STRING,
  // it can be different db model.
  brand: DataTypes.STRING,
});
