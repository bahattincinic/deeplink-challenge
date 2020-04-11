export default (Sequelize, DataTypes) => Sequelize.define('ShortLinks', {
  code: DataTypes.STRING,
  web_url: DataTypes.STRING,
  deeplink: DataTypes.STRING,
});
