export default (Sequelize, DataTypes) => Sequelize.define('Products', {
  name: DataTypes.STRING,
  slug: DataTypes.STRING,
  brand: DataTypes.STRING,
});
