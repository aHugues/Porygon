var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');

var models = require('../models/');
var Serie = models.Serie;
var Location = models.Location;


function parseSerie(serie, body) {

    serie.title = body.title;
    serie.location = body.location;
    serie.season = body.season;
    serie.remarks = body.remarks;
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
        ["season", "%"]
    ];
    for (var searchIndex in searchArray) {
        if (req.query[searchArray[searchIndex][0]]) {
            searchArray[searchIndex][1] = req.query[searchArray[searchIndex][0]];
            if (searchIndex!=1 && searchIndex!=2) {
                searchArray[searchIndex][1] = '%'+searchArray[searchIndex][1]+'%'
            }
        }
    }

    // Gets the sorting parameters
    var order = ['title', 'ASC'] // Default values
    var secondaryOrder = ['title', 'ASC'] // Secondary value for sorting
    var tertiaryOrder = ['location', 'ASC'] // Tertiary value for sorting
    var lastOrder = ['season', 'ASC'] // Last value for sorting
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
    var limit = 99999; // Large number to get everything
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }

    // Query
    Serie.findAll({
        attributes: fields,
        where: {
            title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', searchArray[0][1]),
            season: {$like: searchArray[2][1]}
        },
        order: [order, secondaryOrder, tertiaryOrder, lastOrder],
        offset: offset,
        limit: limit,
        include: [{
            model: Location,
            where: { id: {$like: searchArray[1][1]} }
        }]
    }).then(series => {
        res.json(series);
        });
})



router.get('/count', function(req, res) {
    var title = "%"
    if (req.query.title) {
        title = '%' + req.query.title + '%';
    };
    Serie.count({
        where: {
            title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', title),
        }
    }).then(total => {
        res.json(total);
    });
})



router.post('/', function(req, res) {
    var serie = new Serie();
    parseSerie(serie, req.body);

    serie.save().then(instance => {
        res.status(201).json({code:201, userMessage:"Serie successfully created"});
    });
})



router.get('/:id', function(req, res) {
    Serie.findOne({
        where: { id: req.params.id },
        include: [ { model: Location}]
    }).then(serie => {
        res.json(serie);
    });
})



router.put('/:id', function(req, res) {
    Serie.findById(req.params.id).then(function(serie) {
        parseSerie(serie, req.body);

        if (serie.changed()) {
            serie.save().then(serie => {
                res.status(205).send();
            });
        }
        else {
            res.status(204).send();
        }
    });
})



router.delete('/:id', function(req, res) {
    Serie.findById(req.params.id).then(serie => {
        serie.destroy().then(() => {
            res.status(204).send();
        });
    });
})


module.exports = router;
