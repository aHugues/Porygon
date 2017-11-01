var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');

var models = require('../models/');
var Movie = models.Movie;
var Location = models.Location;


function parseMovie(movie, body) {

    movie.title = body.title;
    movie.location = body.location;
    movie.remarks = body.remarks;
    movie.director = body.director;
    movie.actors = body.actors;
    movie.year = body.year;
}


router.get('/', function(req, res) {

    // Get the fields selector
    var fields = req.query.fields;
    if (fields) {
        fields = fields.split(',');
    }

    // Gets the search parameters, replaces with '%' if none provided
    var searchArray = [
        ["title", "%"],
        ["location", "%"],
        ["director", "%"],
        ["actors", "%"],
        ["year", "%"]
    ];
    for (var searchIndex in searchArray) {
        if (req.query[searchArray[searchIndex][0]]) {
            searchArray[searchIndex][1] = req.query[searchArray[searchIndex][0]];
            if (searchIndex!=1 && searchIndex!=3) {
                searchArray[searchIndex][1] = "%"+searchArray[searchIndex][1]+"%";
            }
        }
    }

    // Gets the sorting parameters
    var order = ['title', 'ASC'] // Default values
    var secondaryOrder = ['title', 'ASC'] // Secondary value for sorting
    if (req.query.sort) {
        if (req.query.sort[0]=='-') {
            order[1] = 'DESC';
            order[0] = req.query.sort.substring(1);
        }
        else {
            order[0] = req.query.sort;
        }
    }

    // Gets the page related parameters
    var offset = 0;
    var limit = 99999; // large number to get everything
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }

    // Query
    Movie.findAll({
        attributes: fields,
        where: {
            title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', searchArray[0][1]),
            director: sequelize.where(sequelize.fn('LOWER', sequelize.col('director')), 'LIKE', searchArray[2][1]),
            actors: sequelize.where(sequelize.fn('LOWER', sequelize.col('location')), 'LIKE', searchArray[3][1]),
            year: {$like: searchArray[4][1]}
        },
        order: [order, secondaryOrder],
        offset: offset,
        limit: limit,
        include: [{
            model: Location,
            where: { id: {$like: searchArray[1][1]} }
        }]
    }).then(movies => {
        res.json(movies);
        });
})



router.get('/count', function(req, res) {
    var title = "%"
    if (req.query.title) {
        title = '%' + req.query.title + '%';
    };
    Movie.count({
        where: {
            title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', title),
        }
    }).then(total => {
        res.json(total);
    });
})



router.post('/', function(req, res) {
    var movie = new Movie();
    parseMovie(movie, req.body);

    movie.save().then(instance => {
        res.status(201).json({code:201, userMessage:"Movie successfully created"});
    });
})



router.get('/:id', function(req, res) {
    Movie.findOne({
        where: { id: req.params.id },
        include: [ { model: Location}]
    }).then(movie => {
        res.json(movie);
    });
})



router.put('/:id', function(req, res) {
    Movie.findById(req.params.id).then(function(movie) {
        parseMovie(movie, req.body);

        if (movie.changed()) {
            movie.save().then(movie => {
                res.status(205).send();
            });
        }
        else {
            res.status(204).send();
        }
    });
})



router.delete('/:id', function(req, res) {
    Movie.findById(req.params.id).then(movie => {
        movie.destroy().then(() => {
            res.status(204).send();
        });
    });
})


module.exports = router;
