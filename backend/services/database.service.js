const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.config.json')[env];


module.exports = require('knex')(config);
