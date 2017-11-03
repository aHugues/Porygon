let sequelize = require('sequelize');
let Rx = require('rx');

let models = require('../models/');
let Location = models.Location;
let Movie = models.Movie;
let Serie = models.Serie;

let service = {};

let getAllLocations = (query) => {

    // Get the fields selector
    let attributes = query.attributes;
    if (attributes) {
        attributes = attributes.split(',');
    }

    let labelSearch = '%'
    // Gets the search parameters, replaces with '%' if none provided
    if (query.label) {
        labelSearch = '%' + query.label + '%';
    }

    // Gets the sorting parameters
    let order = ['label', 'ASC'] // Default values
    if (query.sort) {
        if (query.sort[0]=='-') {
            order[1] = 'DESC';
            order[0] = query.sort.substring(1);
        }
        else {
            order[0] = query.sort;
        }
    }

    let finalQuery = {
        attributes: attributes,
        where: {
            label: sequelize.where(sequelize.fn('LOWER', sequelize.col('label')), 'LIKE', labelSearch)
        },
        order: [order]
    }

    let observable = Rx.Observable.create((obs) => {
        Location.findAll(finalQuery)
            .then((locations) => {
                obs.onNext(locations);
                obs.onCompleted();
            })
            .catch((error) => {
                obs.onError(error);
            })
    });
    return observable;
}


let getLocationById = (id) => {
    let observable = Rx.Observable.create((obs) => {
        Location.findById(id)
            .then((location) => {
                if (location == null) {
                    throw {message: "not found", resource: "location"};
                }
                else {
                    obs.onNext(location);
                    obs.onCompleted();
                }
            })
            .catch((error) => {
                obs.onError(error);
            })
    })
    return observable;
}


let createLocation = (fields) => {
    let observable = Rx.Observable.create((obs) => {
        let location = new Location(fields);
        location.save()
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


let updateLocation = (id, fields) => {
    let observable = Rx.Observable.create((obs) => {
        Location.update(fields, {where: {id: id}})
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


let deleteLocation = (id) => {
    let observable = Rx.Observable.create((obs) => {
        Location.findById(id)
            .then((location) => {
                location.destroy()
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



let countForLocation = (id) => {
    const query = {
        where: {
            location: id
        }
    };
    let loops = 2;
    let observable = Rx.Observable.create((obs) => {

        Movie.count(query)
            .then((count) => {
                obs.onNext(["movies", count]);
                loops -= 1;
                if (loops == 0) {
                    obs.onCompleted();
                }
            })
            .catch((error) => {
                obs.onError(error);
            });

        Serie.count(query)
            .then((count) => {
                obs.onNext(["series", count]);
                loops -= 1;
                if (loops == 0) {
                    obs.onCompleted();
                }
            })
    })

    return observable;
}


service.getAllLocations = getAllLocations;
service.getLocationById = getLocationById;
service.createLocation = createLocation;
service.updateLocation = updateLocation;
service.deleteLocation = deleteLocation;
service.countForLocation = countForLocation;

module.exports = service;
