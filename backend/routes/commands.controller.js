const express = require('express');

const router = express.Router();
const Rx = require('rx');

const errorHandler = require('../middlewares/error-handler');

const CommandsService = require('../services/commands.service');


const getAllCommands = (req, res) => {
  const order = ['id', 'asc']; // Default values

  const onNext = (data) => {
    res.json(data);
  };
  const onComplete = () => {};
  const onError = (error) => {
    console.error(error);
  };

  CommandsService.getAllCommands(order).subscribe(onNext, onError, onComplete);
};


const createCommand = (req, res) => {
  const onNext = () => {};
  const onComplete = () => {
    res.status(201).json({
      code: 201,
      userMessage: 'Command successfully created',
    });
  };
  const onError = (error) => {
    console.error(error);
  };

  CommandsService.createCommand(req.body).subscribe(onNext, onError, onComplete);
};


const getCommandById = (req, res) => {
  const onNext = (data) => {
    res.json(data);
  };
  const onComplete = () => {};
  const onError = (error) => {
    errorHandler(error, (errorPacket) => {
      res.status(errorPacket.status).json(errorPacket.message);
    });
  };

  CommandsService.getCommandById(req.params.id).subscribe(onNext, onError, onComplete);
};


const updateCommand = (req, res) => {
  const onNext = (modified) => {
    if (modified) {
      res.status(205).send();
    } else {
      res.status(204).send();
    }
  };
  const onComplete = () => {};
  const onError = (error) => {
    if (error === 'not found') {
      res.status(404).send();
    }
    console.error(error);
  };

  CommandsService.updateCommand(req.params.id, req.body).subscribe(onNext, onError, onComplete);
};


const deleteCommand = (req, res) => {
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

  CommandsService.deleteCommand(req.params.id).subscribe(onNext, onError, onComplete);
};


router.get('/', getAllCommands);
router.post('/', createCommand);
router.get('/:id', getCommandById);
router.put('/:id', updateCommand);
router.delete('/:id', deleteCommand);


module.exports = router;
