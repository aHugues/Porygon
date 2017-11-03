let express = require('express');
let router = express.Router();
let Rx = require('rx');

let errorHandler = require('../middlewares/error-handler');

let LocationsService = require('../services/locations.service');


let getAllLocations = (req, res) => {

    let onNext = (data) => {
        res.json(data);
    }
    let onCompleted = () => {}
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    LocationsService.getAllLocations(req.query).subscribe(observer);
}



let createLocation = (req, res) => {

    let onNext = (data) => {};
    let onCompleted = () => {
        res.status(201).json({
            code: 201,
            userMessage: "Location successfully created"
        })
    }
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    LocationsService.createLocation(req.body).subscribe(observer);
}



let getLocationById = (req, res) => {

    let onNext = (data) => {
        res.json(data);
    }
    let onCompleted = () => {}
    let onError = (error) => {
        errorHandler(error, (errorPacket) => {
            res.status(errorPacket.status).json(errorPacket.message);
        })
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    LocationsService.getLocationById(req.params.id).subscribe(observer);
}


let countForLocation = (req, res) => {

    let result = {
        movies: 0,
        series: 0
    };

    let onNext = (data) => {
        result[data[0]] = data[1];
    }
    let onError = (error) => {
        console.error(error);
    }
    let onCompleted = () => {
        res.json(result);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    LocationsService.countForLocation(req.params.id).subscribe(observer);
}



let updateLocation = (req, res) => {

    let onNext = (modified) => {
        if (modified) {
            res.status(205).send();
        }
        else {
            res.status(204).send();
        }
    }
    let onCompleted = () => {}
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    LocationsService.updateLocation(req.params.id, req.body).subscribe(observer);
}



let deleteLocation = (req, res) => {

        let onNext = () => {}
        let onCompleted = () => {
            res.status(204).send();
        }
        let onError = (error) => {
            console.error(error);
        }

        let observer = Rx.Observer.create(onNext, onError, onCompleted);
        LocationsService.deleteLocation(req.params.id).subscribe(observer);
}


router.get('/', getAllLocations);
router.post('/', createLocation);
router.get('/:id/count/', countForLocation);
router.get('/:id', getLocationById);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);


module.exports = router;
