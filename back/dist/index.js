"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var functions_1 = require("./functions");
var constants_1 = require("./constants");
var db_1 = require("./db");
var app = (0, express_1["default"])();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.get('/create_game', function (req, res) {
    var countString = req.query.count.toString();
    if (!/^[1-9]\d*$/.test(countString) || parseInt(countString) < 2) {
        return (0, functions_1.sendError)(res, 'Count must be integer not less than 2');
    }
    return (0, db_1.createGame)(parseInt(countString))
        .then(function (id) { return res.send({ id: id }); })["catch"](function (error) { return (0, functions_1.sendError)(res, error); });
    ;
});
app.get('/connect', function (req, res) {
    var idString = req.query.id.toString();
    if (!/^[0-9]+$/.test(idString)) {
        return (0, functions_1.sendError)(res, 'Game id must be integer');
    }
    var nickname = req.query.nickname.toString();
    if (!/^[A-z0-9А-яЁё]+$/.test(nickname)) {
        return (0, functions_1.sendError)(res, 'Nickname must include only letters or numbers');
    }
    return (0, db_1.connectToGame)(parseInt(idString), nickname)
        .then(function (token) { return res.send({ token: token }); })["catch"](function (error) { return (0, functions_1.sendError)(res, error); });
});
app.get('/status', function (req, res) {
    var idString = req.query.id.toString();
    if (!/^[0-9]+$/.test(idString)) {
        return (0, functions_1.sendError)(res, 'Game id must be integer');
    }
    var tokenString = req.query.token.toString();
    if (!/^[A-z0-9]{64}$/.test(tokenString)) {
        return (0, functions_1.sendError)(res, 'Token must be 64 characters of length and include only letters or numbers');
    }
    return (0, db_1.status)(parseInt(idString), tokenString)
        .then(function (status) { return res.send(status); })["catch"](function (error) { return (0, functions_1.sendError)(res, error); });
});
app.get('/move', function (req, res) {
    var idString = req.query.id.toString();
    if (!/^[0-9]+$/.test(idString)) {
        return (0, functions_1.sendError)(res, 'Game id must be integer');
    }
    var tokenString = req.query.token.toString();
    if (!/^[A-z0-9]{64}$/.test(tokenString)) {
        return (0, functions_1.sendError)(res, 'Token must be 64 characters of length and include only letters or numbers');
    }
    var moveString = req.query.move.toString();
    if (!/^1|2|3$/.test(idString)) {
        return (0, functions_1.sendError)(res, 'Move value must be 1, 2 or 3');
    }
    return (0, db_1.move)(parseInt(idString), tokenString, parseInt(moveString))
        .then(function (result) { return res.send({ result: 'Ok' }); })["catch"](function (error) { return (0, functions_1.sendError)(res, error); });
});
var checking = function () {
    (0, db_1.check)().then(function (games) {
        games.map(function (game) { return (0, db_1.changeRoundState)(game.id); });
        checking();
    });
};
checking();
app.listen(constants_1.PORT);
