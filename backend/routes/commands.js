var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');

var models = require('../models/');
var Command = models.Command;

parse_command = function(old_command, body) {
    old_command.title = body.title;
    old_command.remarks = body.remarks;
}

router.get('/', function(req, res) {

    // Gets the sorting parameters
    var order = ['id', 'ASC'] // Default values

    // Query
    Command.findAll({
        order: [order]
    }).then(commands => {
        res.json(commands);
        });
})



router.post('/', function(req, res) {
    var command = new Command();
    parse_command(command, req.body)

    command.save().then(instance => {
        res.status(201).json({code:201, userMessage:"Command successfully created"});
    });
})



router.get('/:id', function(req, res) {
    Command.findById(req.params.id).then(command => {
        res.json(command);
    })
})



router.put('/:id', function(req, res) {
    Command.findById(req.params.id).then(function(command) {
        parse_command(command, req.body);
        if (command.changed()) {
            command.save().then(command => {
                res.status(205).send();
            });
        }
        else {
            res.status(204).send();
        }
    });
})



router.delete('/:id', function(req, res) {
    Command.findById(req.params.id).then(command => {
        command.destroy().then(() => {
            res.status(204).send();
        });
    });
})



module.exports = router;
