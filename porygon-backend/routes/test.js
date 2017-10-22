var express = require('express');
var router = express.Router();

var data_api = require('./data_api');


router.get('/connection', function(req, res, next) {
    data_api.test_connection();
})

// router.get('*', function(req, res) {
//     res.header("Content-Type", "application/json");
//     res.json(JSON.parse(req.sent_data));
// })

router.get('/locations', function(req, res, next) {
    data_api.getLocations();
})

module.exports = router;
