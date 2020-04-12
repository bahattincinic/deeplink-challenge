/* eslint-disable */
const env = process.env.NODE_ENV || 'development';

require('dotenv').config();

require('babel-polyfill');
if (env === 'development') {
  // for development use babel/register for faster runtime compilation
  require('babel-register');
}

const port = require('./src/config').appPort;
const app = require('./src/app').default;

app.listen(port, () => console.log(`API Server listening on http://localhost:${port}`));
