var express = require('express');
var router = express.Router();

var data_api = require('./data_api');

router.post('/movie', function(req, res, next) {

    var id = req.body.id;

    data_api.delete_movie(id, function() {
        next();
    });
})

router.post('/serie', function(req, res, next) {

    var id = req.body.id;

    data_api.delete_serie(id, function() {
        next();
    });
})

router.post('/location', function(req, res, next) {

    var id=req.body.id;

    data_api.delete_location(id, function() {
        next();
    });
})

router.post('*', function(req, res) {
    res.header("Content-Type", "application/json");
    res.json(req.body);
})


module.exports = router;
