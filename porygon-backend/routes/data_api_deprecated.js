var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'backend',
    password: 'b1yayqxj',
    database: 'movies_series',
});

var exports = module.exports = {};

connection.connect();

function get_locations_list(callback) {
    var query_string = "SELECT * FROM Location";
    connection.query(query_string, function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}

function get_movies_list(callback) {
    var query_fields = "Movies.id, Movies.title, Location.location, Movies.remarks";
    var query_string =  'SELECT ' + query_fields + ' FROM Movies';
    query_string +=  ' INNER JOIN Location ON Movies.location = Location.id';
    query_string += ' ORDER BY Movies.title';
    connection.query(query_string, function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}

function get_series_list(callback) {
    var query_fields = "Series.id, Series.title, Series.season, Location.location, Series.remarks";
    var query_string = "SELECT " + query_fields + " FROM Series";
    query_string += " INNER JOIN Location ON Series.location = Location.id";
    query_string += " ORDER BY Series.title";
    connection.query(query_string, function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}

function get_movie(id, callback) {
    var query_fields = "Movies.id, Movies.title, Location.location, Movies.remarks";
    var query_string =  'SELECT ' + query_fields + ' FROM Movies';
    query_string +=  ' INNER JOIN Location ON Movies.location = Location.id';
    query_string += ' WHERE Movies.id = ' + id;
    connection.query(query_string, function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}


function get_serie(id, callback) {
    var query_fields = "Series.id, Series.title, Series.season, Location.location, Series.remarks";
    var query_string = "SELECT " + query_fields + " FROM Series";
    query_string += " INNER JOIN Location ON Series.location = Location.id";
    query_string += " WHERE Series.id = " + id;
    connection.query(query_string, function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}

function get_location(id, callback) {
    var query_fields = "Location.id, Location.location";
    var query_string = "SELECT " + query_fields + " FROM Location";
    query_string += " WHERE Location.id = " + id;
    connection.query(query_string, function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}

function count_movies(callback) {
    var query_string = "SELECT COUNT(*) FROM Movies";
    connection.query(query_string, function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}

function count_movies_in_location(id, callback) {
    var query_string = "SELECT COUNT(*) FROM Movies ";
    query_string += "WHERE Movies.location=?";
    connection.query(query_string, [id], function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}

function count_series(callback) {
    var query_string = "SELECT COUNT(*) FROM Series";
    connection.query(query_string, function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}

function count_series_in_location(id, callback) {
    var query_string = "SELECT COUNT(*) FROM Series ";
    query_string += "WHERE Series.location=?";
    connection.query(query_string, [id], function(error, results, fields) {
        if (error) throw error
        callback(results);
    });
}


function add_movie(title, location_id, remarks, callback) {
    var query_fields = "Movies.id, Movies.title, Movies.location, Movies.remarks";
    var query_string = "INSERT INTO Movies (" + query_fields + ") ";
    query_string += "VALUES (NULL, ?, ?, ?)";
    connection.query(query_string, [title, location_id, remarks], function(error, results, fields) {
        if (error) throw error
        callback();
    })
}

function add_serie(title, season, location_id, remarks, callback) {
    var query_fields = "Series.id, Series.title, Series.season, Series.location, Series.remarks";
    var query_string = "INSERT INTO Series (" + query_fields + ") ";
    query_string += "VALUES (NULL, ?, ?, ?, ?)";
    connection.query(query_string, [title, season, location_id, remarks], function(error, results, fields) {
        if (error) console.log(error)
        callback();
    })
}

function add_location(name, callback) {
    var query_fields = "Location.id, Location.location";
    var query_string = "INSERT INTO Location (" + query_fields + ") ";
    query_string += "VALUES (NULL, ?)";
    connection.query(query_string, [name], function(error, results, fields) {
        if (error) console.log(error)
        callback();
    })
}

function update_movie(id, title, location_id, remarks, callback) {
    var query_string = "UPDATE Movies SET ";
    query_string += "title=?, location=?, remarks=? ";
    query_string += "WHERE id=?";
    connection.query(query_string, [title, location_id, remarks, id], function(error, results, fields) {
        if (error) console.log(error)
        callback();
    })
}

function update_serie(id, title, season, location_id, remarks, callback) {
    var query_string = "UPDATE Series SET ";
    query_string += "title=?, season=?, location=?, remarks=? ";
    query_string += "WHERE id=?";
    connection.query(query_string, [title, season, location_id, remarks, id], function(error, results, fields) {
        if (error) console.log(error)
        callback();
    })
}

function update_location(id, name, callback) {
    var query_string = "UPDATE Location SET ";
    query_string += "location=? ";
    query_string += "WHERE id=?";
    connection.query(query_string, [name, id], function(error, results, fields) {
        if (error) console.log(error)
        callback();
    })
}

function delete_movie(id, callback) {
    var query_string = "DELETE FROM Movies ";
    query_string += "WHERE id=?";
    connection.query(query_string, [id], function(error, results, fields) {
        if (error) console.log(error)
        callback();
    })
}

function delete_serie(id, callback) {
    var query_string = "DELETE FROM Series ";
    query_string += "WHERE id=?";
    connection.query(query_string, [id], function(error, results, fields) {
        if (error) console.log(error)
        callback();
    })
}

function delete_location(id, callback) {
    var query_string = "DELETE FROM Location ";
    query_string += "WHERE id=?";
    connection.query(query_string, [id], function(error, results, fields) {
        if (error) console.log(error)
        callback();
    })
}




exports.get_locations_list = get_locations_list;
exports.get_movies_list = get_movies_list;
exports.get_series_list = get_series_list;
exports.get_movie = get_movie;
exports.get_serie = get_serie;
exports.get_location = get_location;

exports.count_movies = count_movies;
exports.count_series = count_series;
exports.count_movies_in_location = count_movies_in_location;
exports.count_series_in_location = count_series_in_location;

exports.add_movie = add_movie;
exports.add_serie = add_serie;
exports.add_location = add_location;

exports.update_movie = update_movie;
exports.update_serie = update_serie;
exports.update_location = update_location;

exports.delete_movie = delete_movie;
exports.delete_serie = delete_serie;
exports.delete_location = delete_location;
