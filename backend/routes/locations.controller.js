const express = require('express');

const router = express.Router();
const Rx = require('rx');
const rxjs = require('rxjs');

const errorHandler = require('../middlewares/error-handler');

const LocationsService = require('../services/locations.service');


const getAllLocations = (req, res) => {
  const onNext = (data) => {
    res.json(data);
  };
  const onComplete = () => {};
  const onError = (error) => {
    console.error(error);
  };

  LocationsService.getAllLocations(req.query).subscribe(onNext, onError, onComplete);
};


const createLocation = (req, res) => {
  const onNext = (data) => {};
  const onComplete = () => {
    res.status(201).json({
      code: 201,
      userMessage: 'Location successfully created',
    });
  };
  const onError = (error) => {
    console.error(error);
  };

  LocationsService.createLocation(req.body).subscribe(onNext, onError, onComplete);
};


const getLocationById = (req, res) => {
  const onNext = (data) => {
    res.json(data);
  };
  const onComplete = () => {
    res.return('ok');
  };
  const onError = (error) => {
    errorHandler(error, (errorPacket) => {
      res.status(errorPacket.status).json(errorPacket.message);
    });
  };

  LocationsService.getLocationById(req.params.id).subscribe(onNext, onError, onComplete);
};


const countForLocation = (req, res) => {
  const result = {
    movies: 0,
    series: 0,
  };

  const onNext = (data) => {
    result[data[0]] = data[1];
  };
  const onError = (error) => {
    console.error(error);
  };
  const onComplete = () => {
    res.json(result);
  };

  LocationsService.countForLocation(req.params.id).subscribe(onNext, onError, onComplete);
};


const updateLocation = (req, res) => {
  const onNext = (modified) => {
    if (modified) {
      res.status(205).send();
    } else {
      res.status(204).send();
    }
  };
  const onComplete = () => {};
  const onError = (error) => {
    console.error(error);
  };

  LocationsService.updateLocation(req.params.id, req.body).subscribe(onNext, onError, onComplete);
};


const deleteLocation = (req, res) => {
  const onNext = () => {};
  const onComplete = () => {
    res.status(204).send();
  };
  const onError = (error) => {
    console.error(error);
  };
  LocationsService.deleteLocation(req.params.id).subscribe(onNext, onError, onComplete);
};


router.get('/', getAllLocations);
router.post('/', createLocation);
router.get('/:id/count/', countForLocation);
router.get('/:id', getLocationById);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);


module.exports = router;
