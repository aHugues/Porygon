var Sequelize = require ('sequelize');


const sequelize = new Sequelize('movies_series', 'USER', 'PASSWORD', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

const Location = sequelize.import("../models/location");

function getLocations() {
    Location.findAll().then(locations => {
        console.log(locations)
    })
}

var exports = module.exports = {};

function test_connection() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}

exports.test_connection = test_connection;
exports.getLocations = getLocations;
