var express = require('express');
var router = express.Router();
let Rx = require('rx');

let errorHandler = require('../middlewares/error-handler');

let SeriesService = require('../services/series.service');


getAllSeries = (req, res) => {

    let onNext = (data) => {
        res.json(data);
    }
    let onCompleted = () => {}
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    SeriesService.getAllSeries(req.query).subscribe(observer);
}



let countSeries = (req, res) => {

    let onNext = (data) => {
        res.json(data);
    }
    let onCompleted = () => {}
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    SeriesService.countSeries(req.query.title).subscribe(observer);
}



let createSerie = (req, res) => {

    let onNext = (data) => {};
    let onCompleted = () => {
        res.status(201).json({
            code: 201,
            userMessage: "Serie successfully created"
        })
    }
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    SeriesService.createSerie(req.body).subscribe(observer);

}



let getSerieById = (req, res) => {

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
    SeriesService.getSerieById(req.params.id).subscribe(observer);
}



let updateSerie = (req, res) => {

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
        if (error == "not found") {
            res.status(404).send();
        }
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    SeriesService.updateSerie(req.params.id, req.body).subscribe(observer);
}



let deleteSerie = (req, res) => {

        let onNext = () => {}
        let onCompleted = () => {
            res.status(204).send();
        }
        let onError = (error) => {
            if (error == "not found") {
                res.status(404).send();
            }
            console.error(error);
        }

        let observer = Rx.Observer.create(onNext, onError, onCompleted);
        SeriesService.deleteSerie(req.params.id).subscribe(observer);
}



router.get('/', getAllSeries);
router.post('/', createSerie);
router.get('/count', countSeries);
router.get('/:id', getSerieById);
router.put('/:id', updateSerie);
router.delete('/:id', deleteSerie);

module.exports = router;
