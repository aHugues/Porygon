var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');

var models = require('../models/');
var Location = models.Location;
var Movie = models.Movie;
var Serie = models.Serie;


router.get('/', function(req, res) {

    // Get the fields selector
    var fields = req.query.fields;
    if (fields) {
        fields = fields.split(',');
    }

    // Gets the search parameters, replaces with '%' if none provided
    if (req.query.label) {
        var labelSearch = '%' + req.query.label + '%';
    }
    else {
        var labelSearch = '%';
    }

    // Gets the sorting parameters
    var order = ['label', 'ASC'] // Default values
    if (req.query.sort) {
        if (req.query.sort[0]=='-') {
            order[1] = 'DESC';
            order[0] = req.query.sort.substring(1);
        }
        else {
            order[0] = req.query.sort;
        }
    }

    // Query
    Location.findAll({
        attributes: fields,
        where: {
            label: sequelize.where(sequelize.fn('LOWER', sequelize.col('label')), 'LIKE', labelSearch)
        },
        order: [order]
    }).then(locations => {
        res.json(locations);
        });
})



router.post('/', function(req, res) {
    var location = new Location();
    location.label = req.body.label;

    location.save().then(instance => {
        res.status(201).json({code:201, userMessage:"Location successfully created"});
    });
})



router.get('/:id', function(req, res) {
    Location.findById(req.params.id).then(location => {
        res.json(location);
    })
})



router.get('/:id/count', function(req, res) {
    var moviesTotal = 0;
    var seriesTotal = 0;

    Movie.count({
        where: {location: req.params.id}
    }).then(count => {
        moviesTotal = count;
        Serie.count({
            where: {location: req.params.id}
        }).then(count => {
            seriesTotal = count;
            res.json({movies:moviesTotal, series:seriesTotal});
        });
    });
})



router.put('/:id', function(req, res) {
    Location.findById(req.params.id).then(function(location) {
        if (location.label == req.body.label) {
            res.status(204).send();
        }
        else {
            location.label = req.body.label;

            location.save().then(location => {
                res.status(205).send();
            });
        }
    });
})



router.delete('/:id', function(req, res) {
    Location.findById(req.params.id).then(location => {
        location.destroy().then(() => {
            res.status(204).send();
        });
    });
})


module.exports = router;
