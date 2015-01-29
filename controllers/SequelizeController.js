/**
 * Created by kingdaeki on 2015-01-27.
 */
var Sequelize = require('sequelize');

var sequelize = new Sequelize('cupd', 'castis', 'castis', {
    host: '172.16.51.101',
    port: '3306',
    logging: false
});

module.exports = sequelize;