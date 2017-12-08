let sequelize = require('sequelize');
let Rx = require('rx');

let models = require('../models/');
let Location = models.Location;
let Serie = models.Serie;

let service = {};

let getAllSeries = (query) => {

    // Get the fields selector
    let attributes = query.attributes;
    if (attributes) {
        attributes = attributes.split(',');
    }

    // Gets the search parameters, replaces with '%' if none provided
    let searchArray = [
        ["title", "%"],
        ["location", "%"],
        ["season", "%"]
    ];
    for (let searchIndex in searchArray) {
        if (query[searchArray[searchIndex][0]]) {
            searchArray[searchIndex][1] = query[searchArray[searchIndex][0]];
            if (searchIndex!=1 && searchIndex!=2) {
                searchArray[searchIndex][1] = '%'+searchArray[searchIndex][1]+'%'
            }
        }
    }

    // Gets the sorting parameters
    let order = ['title', 'ASC'] // Default values
    let secondaryOrder = ['title', 'ASC'] // Secondary value for sorting
    let tertiaryOrder = ['location', 'ASC'] // Tertiary value for sorting
    let lastOrder = ['season', 'ASC'] // Last value for sorting
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
    let offset = 0;
    let limit = 99999; // Large number to get everything
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
            season: {$like: searchArray[2][1]}
        },
        order: [order, secondaryOrder, tertiaryOrder, lastOrder],
        offset: offset,
        limit: limit,
        include: [{
            model: Location,
            where: { id: {$like: searchArray[1][1]} }
        }]
    };

    let observable = Rx.Observable.create((obs) => {
        Serie.findAll(finalQuery)
            .then((series) => {
                obs.onNext(series);
                obs.onCompleted();
            })
            .catch((error) => {
                obs.onError(error);
            })
    });
    return observable;
}


let getSerieById = (id) => {
    let observable = Rx.Observable.create((obs) => {
        Serie.findOne({
            where: { id: id },
            include: [ { model: Location } ]
        })
            .then((serie) => {
                if (serie == null) {
                    throw {message: "not found", resource: "serie"};
                }
                else {
                    obs.onNext(serie);
                    obs.onCompleted();
                }
            })
            .catch((error) => {
                obs.onError(error);
            })
    })
    return observable;
}


let createSerie = (fields) => {
    let observable = Rx.Observable.create((obs) => {
        let serie = new Serie(fields);
        serie.save()
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


let updateSerie = (id, fields) => {
    let observable = Rx.Observable.create((obs) => {
        Serie.update(fields, {where: {id: id}})
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


let deleteSerie = (id) => {
    let observable = Rx.Observable.create((obs) => {
        Serie.findById(id)
            .then((serie) => {
                if (serie == null) {
                    throw "not found";
                }
                serie.destroy()
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



let countSeries = (queryTitle) => {
    let title = "%";
    if (typeof queryTitle != 'undefined') {
        title = '%' + queryTitle + '%';
    };
    let observable = Rx.Observable.create((obs) => {
        Serie.count({
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

service.getAllSeries = getAllSeries;
service.getSerieById = getSerieById;
service.createSerie = createSerie;
service.updateSerie = updateSerie;
service.deleteSerie = deleteSerie;
service.countSeries = countSeries;

module.exports = service;
