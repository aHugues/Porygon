var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');

var models = require('../models/');
var Serie = models.Serie;
var Movie = models.Movie;
var Location = models.Location;

router.get('/', function(req, res) {

    var number_of_movies = 0;
    var number_of_series = 0;
})

module.exports = router;
