"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var functions_1 = require("./functions");
var constants_1 = require("./constants");
var app = (0, express_1["default"])();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.get('/create_game', function (req, res) {
    var countString = req.query.count.toString();
    if (!/^[1-9]\d*$/.test(countString) || parseInt(countString) < 2) {
        res.send({ error: 'Count must be integer not less than 2' });
        return;
    }
    var id = functions_1.games.length.toString();
    functions_1.games.push({ id: id, count: parseInt(countString), players: [], rounds: [], time: 0 });
    res.send({ id: id });
});
app.get('/connect', function (req, res) {
    var idString = req.query.id.toString();
    if (!/^[A-z0-9]+$/.test(idString)) {
        res.send({ error: 'Count must be integer not less than 2' });
        return;
    }
    var nickname = req.query.nickname.toString();
    if (!/^[A-z0-9А-яЁё]+$/.test(nickname)) {
        res.send({ error: 'Nickname must include only letters or numbers' });
        return;
    }
    var game = (0, functions_1.GetGameById)(idString);
    if (!game) {
        res.send({ error: 'Id must be not negative integer' });
        return;
    }
    if (game.players.length >= game.count) {
        res.send({ error: 'Max players count' });
        return;
    }
    var token = game.players.length;
    game.players.push({ nickname: nickname, token: token.toString() });
    if ((0, functions_1.GetCountToStart)(game) == 0) {
        (0, functions_1.StartRound)(game);
    }
    res.send({ token: token });
});
app.get('/status', function (req, res) {
    var game = (0, functions_1.GetGameById)(req.query.id.toString());
    if (!game) {
        res.send({ error: 'Id must be not negative integer' });
        return;
    }
    var tokenString = req.query.token.toString();
    if (!/^\d+$/.test(tokenString) || parseInt(tokenString) >= game.count) {
        res.send({ error: 'token must be integer less than players count' });
        return;
    }
    var count_to_start = (0, functions_1.GetCountToStart)(game);
    if (count_to_start > 0) {
        res.send({ state: "waiting_for_start", game: game });
        return;
    }
    var round = (0, functions_1.GetLastRound)(game);
    if (round.state == 1) {
        var pair = (0, functions_1.GetPairByPlayer)(round, tokenString);
        if (pair) {
            res.send({ state: 'waiting_for_move', game: (0, functions_1.GetGameWithoutRounds)(game, tokenString, pair) });
            return;
        }
        else {
            res.send({ state: 'lose', game: (0, functions_1.GetGameWithoutRounds)(game, tokenString, pair) });
            return;
        }
    }
    else if (round.state == 2) {
        res.send({ state: 'waiting_for_round_start', game: game });
        return;
    }
    else {
        res.send({ state: 'end', game: game });
        return;
    }
});
app.get('/move', function (req, res) {
    var game = (0, functions_1.GetGameById)(req.query.id.toString());
    if (!game) {
        res.send({ error: 'Id must be not negative integer' });
        return;
    }
    var tokenString = req.query.token.toString();
    if (!/^\d+$/.test(tokenString) || parseInt(tokenString) >= game.count) {
        res.send({ error: 'token must be integer less than players count' });
        return;
    }
    var round = (0, functions_1.GetLastRound)(game);
    var pair = (0, functions_1.GetPairByPlayer)(round, tokenString);
    if (!pair) {
        res.send({ result: 'error', desc: 'lose' });
    }
    var move = parseInt(req.query.move.toString());
    if (pair.player1.token == tokenString) {
        pair.player1_move = move;
    }
    else {
        pair.player2_move = move;
    }
    res.send({ result: 'Ok' });
});
setInterval(function () {
    functions_1.games.map(function (game) {
        if (game.rounds.length > 0) {
            game.time -= 1;
            (0, functions_1.SetRoundState)(game);
        }
    });
}, 1000);
app.listen(constants_1.PORT);
