var express = require('express');
var router = express.Router();

var data_api = require('./data_api');

router.post('/movie', function(req, res, next) {

    var id = req.body.id;
    var title = req.body.title;
    var remarks = req.body.remarks;
    var location =  req.body.location;

    data_api.update_movie(id, title, location, remarks, function() {
        next();
    });
})

router.post('/serie', function(req, res, next) {

    var id = req.body.id;
    var title = req.body.title;
    var remarks = req.body.remarks;
    var location = req.body.location;
    var season = req.body.season;

    data_api.update_serie(id, title, season, location, remarks, function() {
        next();
    });
})

router.post('/location', function(req, res, next) {

    var id = req.body.id;
    var location = req.body.name;

    data_api.update_location(id, location, function() {
        next();
    });
})

router.post('*', function(req, res) {
    res.header("Content-Type", "application/json");
    res.json(req.body);
})


module.exports = router;
