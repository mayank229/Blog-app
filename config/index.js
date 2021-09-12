const app = require('./app')
const logger = require('../config/winston');

module.exports = {
    //mongo db url
    dbUri: app.db,

    // jsonwebtoken secret
    jwtSecret: '!!secret phrase!!',

    // Env variable
    port: app.port,

    wlogger: logger
};