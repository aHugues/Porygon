let express = require('express');
let router = express.Router();
let Rx = require('rx');

let errorHandler = require('../middlewares/error-handler');

let CommandsService = require('../services/commands.service');


let getAllCommands = (req, res) => {

    let order = ['id', 'ASC'] // Default values

    let onNext = (data) => {
        res.json(data);
    }
    let onCompleted = () => {}
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    CommandsService.getAllCommands({order: [order]}).subscribe(observer);
}



let createCommand = (req, res) => {

    let onNext = (data) => {};
    let onCompleted = () => {
        res.status(201).json({
            code: 201,
            userMessage: "Command successfully created"
        })
    }
    let onError = (error) => {
        console.error(error);
    }

    let observer = Rx.Observer.create(onNext, onError, onCompleted);
    CommandsService.createCommand(req.body).subscribe(observer);
}



let getCommandById = (req, res) => {

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
    CommandsService.getCommandById(req.params.id).subscribe(observer);
}



let updateCommand = (req, res) => {

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
    CommandsService.updateCommand(req.params.id, req.body).subscribe(observer);
}



let deleteCommand = (req, res) => {

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
        CommandsService.deleteCommand(req.params.id).subscribe(observer);
}


router.get('/', getAllCommands);
router.post('/', createCommand);
router.get('/:id', getCommandById);
router.put('/:id', updateCommand);
router.delete('/:id', deleteCommand);


module.exports = router;
