import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import {
  databaseUrl,
} from '../../config';

const connection = new Sequelize(databaseUrl);
const models = {};

fs
  .readdirSync(__dirname)
  .filter((file) => ((file.indexOf('.') !== 0) && (file !== 'index.js')))
  .forEach((file) => {
    const model = connection.import(path.join(__dirname, file));
    models[model.name] = model;
  });

export { models };
