let sequelize = require('sequelize');
let Rx = require('rx');

let models = require('../models/');
let Command = models.Command;

let service = {};


let getAllCommands = (query) => {

    let observable = Rx.Observable.create((obs) => {
        Command.findAll(query)
            .then((commands) => {
                obs.onNext(commands);
                obs.onCompleted();
            })
            .catch((error) => {
                obs.onError(error)
            })
    });
    return observable;
}


let getCommandById = (id) => {
    let observable = Rx.Observable.create((obs) => {
        Command.findById(id)
            .then((command) => {
                if (command == null) {
                    throw {message: "not found", resource: "command"};
                }
                else {
                    obs.onNext(command);
                    obs.onCompleted();
                }
            })
            .catch((error) => {
                obs.onError(error);
            })
    })
    return observable;
}


let createCommand = (fields) => {
    let observable = Rx.Observable.create((obs) => {
        let command = new Command(fields);
        command.save()
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


let updateCommand = (id, fields) => {
    let observable = Rx.Observable.create((obs) => {
        Command.findById(id)
            .then((command) => {
                if (command == null) {
                    throw "not found";
                }
                command.title = fields.title;
                command.remarks = fields.remarks;
                if (command.changed()) {
                    command.save()
                        .then((command) => {
                            obs.onNext(true);
                            obs.onCompleted();
                        })
                        .catch((error) => {
                            console.log(error);
                            throw error;
                        })
                }
                else {
                    obs.onNext(false);
                    obs.onCompleted();
                }
            })
            .catch((error) => {
                obs.onError(error);
            })
    });
    return observable;
}


let deleteCommand = (id) => {
    let observable = Rx.Observable.create((obs) => {
        Command.findById(id)
            .then((command) => {
                if (command == null) {
                    throw "not found";
                }
                command.destroy()
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


service.getAllCommands = getAllCommands;
service.getCommandById = getCommandById;
service.createCommand = createCommand;
service.updateCommand = updateCommand;
service.deleteCommand = deleteCommand;

module.exports = service;
