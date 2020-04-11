/* eslint-disable */
require('babel-core/register');

const configFile = require('../config');

// sequelize database config file.
module.exports = {
  development: {
    url: configFile.databaseUrl,
    dialect: 'postgres',
  },
  production: {
    url: configFile.databaseUrl,
    dialect: 'postgres',
  }
};
