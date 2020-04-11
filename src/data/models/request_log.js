export default (Sequelize, DataTypes) => Sequelize.define('RequestLogs', {
  operation: DataTypes.STRING,
  status: DataTypes.INTEGER,
  request: DataTypes.JSONB,
  response: DataTypes.JSONB,
});
