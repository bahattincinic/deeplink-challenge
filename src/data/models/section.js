export default (Sequelize, DataTypes) => Sequelize.define('Sections', {
  name: DataTypes.STRING,
  slug: DataTypes.STRING,
});
