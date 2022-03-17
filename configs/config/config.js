const _ = require('lodash');
require('dotenv').config();

const dbConnectionSettings = require('./dbSettings');
const env = process.env.NODE_ENV || 'local';
const envConfig = require('./' + env);

let defaultConfig = {
    env: env,
    dbSettings: dbConnectionSettings
};

module.exports = _.merge(defaultConfig, envConfig);