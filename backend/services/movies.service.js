let sequelize = require('sequelize');
let Rx = require('rx');

let models = require('../models/');
let Location = models.Location;
let Movie = models.Movie;

let service = {};

let getAllMovies = (query) => {

    // Get the fields selector
    let attributes = query.attributes;
    if (attributes) {
        attributes = attributes.split(',');
    }

    // Gets the search parameters, replaces with '%' if none provided
    let searchArray = [
        ["title", "%"],
        ["location", "%"],
        ["director", "%"],
        ["actors", "%"],
        ["year", "%"]
    ];
    for (let searchIndex in searchArray) {
        if (query[searchArray[searchIndex][0]]) {
            searchArray[searchIndex][1] = query[searchArray[searchIndex][0]];
            if (searchIndex!=1 && searchIndex!=3) {
                searchArray[searchIndex][1] = "%"+searchArray[searchIndex][1]+"%";
            }
        }
    }

    // Gets the sorting parameters
    let order = ['title', 'ASC'] // Default values
    let secondaryOrder = ['title', 'ASC'] // Secondary value for sorting
    if (query.sort) {
        if (query.sort[0]=='-') {
            order[1] = 'DESC';
            order[0] = query.sort.substring(1);
        }
        else {
            order[0] = query.sort;
        }
    }

    // Gets the page related parameters
    var offset = 0;
    var limit = 99999; // Large number to get everything
    if (query.offset) {
        offset = parseInt(query.offset);
    }
    if (query.limit) {
        limit = parseInt(query.limit);
    }

    let finalQuery = {
        attributes: attributes,
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
    }

    let observable = Rx.Observable.create((obs) => {
        Movie.findAll(finalQuery)
            .then((movies) => {
                obs.onNext(movies);
                obs.onCompleted();
            })
            .catch((error) => {
                obs.onError(error);
            })
    });
    return observable;
}


let getMovieById = (id) => {
    let observable = Rx.Observable.create((obs) => {
        Movie.findOne({
            where: { id: id },
            include: [ { model: Location } ]
        })
            .then((movie) => {
                if (movie == null) {
                    throw {message: "not found", resource: "movie"};
                }
                else {
                    obs.onNext(movie);
                    obs.onCompleted();
                }
            })
            .catch((error) => {
                obs.onError(error);
            })
    })
    return observable;
}


let createMovie = (fields) => {
    let observable = Rx.Observable.create((obs) => {
        let movie = new Movie(fields);
        movie.save()
            .then((instance) => {
                obs.onNext(instance);
                obs.onCompleted();
            })
            .catch((error) => {
                obs.onError(error);
            })
    })
    return observable;
}


let updateMovie = (id, fields) => {
    let observable = Rx.Observable.create((obs) => {
        Movie.update(fields, {where: {id: id}})
            .then((affectedRows) => {
                if (affectedRows[0] > 0) {
                    obs.onNext(true);
                }
                else {
                    obs.onNext(false);
                }
                obs.onCompleted();
            })
            .catch((error) => {
                obs.onError(error);
            })
    })
    return observable;
}


let deleteMovie = (id) => {
    let observable = Rx.Observable.create((obs) => {
        Movie.findById(id)
            .then((movie) => {
                if (movie == null) {
                    throw "not found";
                }
                movie.destroy()
                    .then(() => {
                        obs.onCompleted();
                    })
                    .catch((error) => {
                        throw error;
                    })
            })
            .catch((error) => {
                obs.onError(error);
            })
    })
    return observable;
}



let countMovies = (queryTitle) => {
    let title = "%";
    if (typeof queryTitle != 'undefined') {
        title = '%' + queryTitle + '%';
    };
    let observable = Rx.Observable.create((obs) => {
        Movie.count({
            where: {
                title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', title),
            }
        })
            .then((count) => {
                obs.onNext(count);
                obs.onCompleted();
            })
            .catch((error) => {
                obs.onError(error);
            })
    })
    return observable;
}

service.getAllMovies = getAllMovies;
service.getMovieById = getMovieById;
service.createMovie = createMovie;
service.updateMovie = updateMovie;
service.deleteMovie = deleteMovie;
service.countMovies = countMovies;

module.exports = service;
