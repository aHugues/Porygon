var express = require('express');
var router = express.Router();
let Rx = require('rx');

let errorHandler = require('../middlewares/error-handler');

let MoviesService = require('../services/movies.service');


getAllMovies = (req, res) => {

    let onNext = (data) => {
        res.json(data);
    }
    let onCompleted = () => {}
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    MoviesService.getAllMovies(req.query).subscribe(observer);
}



let countMovies = (req, res) => {

    let onNext = (data) => {
        res.json(data);
    }
    let onCompleted = () => {}
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    MoviesService.countMovies(req.query.title).subscribe(observer);
}



let createMovie= (req, res) => {

    let onNext = (data) => {};
    let onCompleted = () => {
        res.status(201).json({
            code: 201,
            userMessage: "Movie successfully created"
        })
    }
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    MoviesService.createMovie(req.body).subscribe(observer);

}



let getMovieById = (req, res) => {

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
    MoviesService.getMovieById(req.params.id).subscribe(observer);
}



let updateMovie = (req, res) => {

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
        if (error == "not foud") {
            res.status(404).send();
        }
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    MoviesService.updateMovie(req.params.id, req.body).subscribe(observer);
}



let deleteMovie = (req, res) => {

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
        MoviesService.deleteMovie(req.params.id).subscribe(observer);
}



router.get('/', getAllMovies);
router.post('/', createMovie);
router.get('/count', countMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
