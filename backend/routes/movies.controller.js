let express = require('express');

let router = express.Router();

const errorHandler = require('../middlewares/error-handler');

const MoviesService = require('../services/movies.service');


getAllMovies = (req, res) => {
  const onNext = (data) => {
    res.json(data);
  };
  const onComplete = () => {};
  const onError = (error) => {
    console.error(error);
  };
  MoviesService.getAllMovies(req.query).subscribe(onNext, onError, onComplete);
};


const countMovies = (req, res) => {
  const onNext = (data) => {
    res.json(data);
  };
  const onComplete = () => {};
  const onError = (error) => {
    console.error(error);
  };

  MoviesService.countMovies(req.query.title).subscribe(onNext, onError, onComplete);
};


const createMovie = (req, res) => {
  const onNext = () => {};
  const onComplete = () => {
    res.status(201).json({
      code: 201,
      userMessage: 'Movie successfully created',
    });
  };
  const onError = (error) => {
    console.error(error);
  };

  MoviesService.createMovie(req.body).subscribe(onNext, onError, onComplete);
};


const getMovieById = (req, res) => {
  const onNext = (data) => {
    res.json(data);
  };
  const onComplete = () => {};
  const onError = (error) => {
    errorHandler(error, (errorPacket) => {
      res.status(errorPacket.status).json(errorPacket.message);
    });
  };

  MoviesService.getMovieById(req.params.id).subscribe(onNext, onError, onComplete);
};


const updateMovie = (req, res) => {
  const onNext = (modified) => {
    if (modified) {
      res.status(205).send();
    } else {
      res.status(204).send();
    }
  };
  const onComplete = () => {};
  const onError = (error) => {
    if (error === 'not foud') {
      res.status(404).send();
    }
    console.error(error);
  };

  MoviesService.updateMovie(req.params.id, req.body).subscribe(onNext, onError, onComplete);
};


const deleteMovie = (req, res) => {
  const onNext = () => {};
  const onComplete = () => {
    res.status(204).send();
  };
  const onError = (error) => {
    if (error === 'not found') {
      res.status(404).send();
    }
    console.error(error);
  };

  MoviesService.deleteMovie(req.params.id).subscribe(onNext, onError, onComplete);
};


router.get('/', getAllMovies);
router.post('/', createMovie);
router.get('/count', countMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
