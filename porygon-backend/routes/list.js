var express = require('express');
var router = express.Router();

var data_api = require('./data_api');

var ITEMS_PER_PAGE = 10;

parse_movie = function(row) {
    return JSON.stringify({
        id: row.id,
        title: row.title,
        location: row.location,
        remarks: row.remarks});
}

parse_serie = function(row) {
    return JSON.stringify({
        id: row.id,
        title: row.title,
        season: row.season,
        location: row.location,
        remarks: row.remarks});
}

parse_location = function(row) {
    return JSON.stringify({
        id: row.id,
        name: row.location,
    });
}

router.get('/stats', function(req, res, next) {

    var number_of_movies = 0;
    var number_of_series = 0;

    data_api.count_movies(function(raw_data) {
        number_of_movies = raw_data[0]['COUNT(*)'];
        data_api.count_series(function(raw_data) {
            number_of_series = raw_data[0]['COUNT(*)'];
            req.sent_data = JSON.stringify({
                movies: number_of_movies,
                series: number_of_series
            });
            next();
        });
    });
})

router.get('/movies/all', function(req, res, next) {
    var final_data = [];

    data_api.get_movies_list(function(raw_data) {
        for (row_index in raw_data) {
            var row = raw_data[row_index];
            var final_row = parse_movie(row);
            final_data.push(JSON.parse(final_row));
        }
        req.sent_data = JSON.stringify(final_data);
        next();
    });
})

router.get('/movies/page/:page', function(req, res, next) {

    var id_min = (req.params.page-1)*ITEMS_PER_PAGE;
    var id_max = req.params.page*ITEMS_PER_PAGE-1;

    var final_data = [];

    data_api.get_movies_list(function(raw_data) {
        for (row_index in raw_data) {
            if (row_index>id_max) {
                break;
            }
            else if (row_index>=id_min) {
                var row = raw_data[row_index];
                var final_row = parse_movie(row);
                final_data.push(JSON.parse(final_row));
            }
        }
        req.sent_data = JSON.stringify(final_data);
        next();
    })
})

router.get('/movie/:id', function(req, res, next) {
    data_api.get_movie(req.params.id, function(raw_data) {
        var row = raw_data[0];
        var final_data = parse_movie(row);
        req.sent_data = final_data;
        next();
    });
})


router.get('/series/all', function(req, res, next) {
    var final_data = [];

    data_api.get_series_list(function(raw_data) {
        for (row_index in raw_data) {
            var row = raw_data[row_index];
            var final_row = parse_serie(row);
            final_data.push(JSON.parse(final_row));
        }
        req.sent_data = JSON.stringify(final_data);
        next();
    });
})

router.get('/serie/:id', function(req, res, next) {
    data_api.get_serie(req.params.id, function(raw_data) {
        var row = raw_data[0];
        var final_data = parse_serie(row);
        req.sent_data = final_data;
        next();
    });
})

router.get('/series/page/:page', function(req, res, next) {

    var id_min = (req.params.page-1)*ITEMS_PER_PAGE;
    var id_max = req.params.page*ITEMS_PER_PAGE-1;

    var final_data = [];

    data_api.get_series_list(function(raw_data) {
        for (row_index in raw_data) {
            if (row_index>id_max) {
                break;
            }
            else if (row_index>=id_min) {
                var row = raw_data[row_index];
                var final_row = parse_serie(row);
                final_data.push(JSON.parse(final_row));
            }
        }
        req.sent_data = JSON.stringify(final_data);
        next();
    })
})

router.get('/locations', function(req, res, next) {

    var final_data = [];

    data_api.get_locations_list(function(raw_data) {
        for (row_index in raw_data) {
            var row = raw_data[row_index];
            var final_row = JSON.stringify({
                id: row.id,
                name: row.location
            });
            final_data.push(JSON.parse(final_row));
        }
        req.sent_data = JSON.stringify(final_data);
        next();
    })
})

router.get('/location/:id', function(req, res, next) {
    data_api.get_location(req.params.id, function(raw_data) {
        var row = raw_data[0];
        var final_data = parse_location(row);
        req.sent_data = final_data;
        console.log(final_data);
        next();
    });
})


router.get('*', function(req, res) {
    res.header("Content-Type", "application/json");
    res.json(JSON.parse(req.sent_data));
})



module.exports = router;
