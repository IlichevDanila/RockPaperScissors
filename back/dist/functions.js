"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.GetGameWithoutRounds = exports.StartRound = exports.SetRoundState = exports.EndRound = exports.GetLastRound = exports.GetCountToStart = exports.GetGameById = exports.GetPairByPlayer = exports.games = void 0;
var constants_1 = require("./constants");
exports.games = [];
function GetPairByPlayer(round, player_token) {
    return round.pairs.find(function (el) { return (el.player1.token == player_token || el.player2.token == player_token); });
}
exports.GetPairByPlayer = GetPairByPlayer;
function GetGameById(key) {
    return exports.games.find(function (el) { return el.id == key; });
}
exports.GetGameById = GetGameById;
function GetCountToStart(game) {
    return game.count - game.players.length;
}
exports.GetCountToStart = GetCountToStart;
function GetLastRound(game) {
    return game.rounds[game.rounds.length - 1];
}
exports.GetLastRound = GetLastRound;
function EndRound(game, round) {
    round.pairs.map(function (pair) {
        pair.winner = constants_1.WinRules[pair.player1_move][pair.player2_move];
    });
    game.time = 5;
}
exports.EndRound = EndRound;
function SetRoundState(game) {
    if (game.time <= 0) {
        var round = GetLastRound(game);
        if (round.state == 1) {
            round.state = 2;
            EndRound(game, round);
            return;
        }
        if (round.state == 2) {
            round.state = 3;
            StartRound(game);
            return;
        }
    }
}
exports.SetRoundState = SetRoundState;
function StartRound(game) {
    var players = [];
    if (game.rounds.length > 0) {
        GetLastRound(game).pairs.map(function (pair) {
            switch (pair.winner) {
                case 1:
                    players.push(pair.player1);
                    break;
                case 2:
                    players.push(pair.player2);
                    break;
                case 3:
                    players.push(pair.player1);
                    players.push(pair.player2);
                    break;
            }
        });
    }
    else {
        players = game.players;
    }
    if (players.length <= 1) {
        return;
    }
    var pairs = [];
    for (var i = 0; i < players.length - 1; i += 2) {
        pairs.push({
            player1: players[i],
            player2: players[i + 1],
            player1_move: 0,
            player2_move: 0,
            winner: 0
        });
    }
    if (players.length % 2 == 1) {
        pairs.push({
            player1: players[players.length - 1],
            player2: undefined,
            player1_move: 0,
            player2_move: 0,
            winner: 0
        });
    }
    game.time = 30;
    game.rounds.push({ pairs: pairs, state: 1 });
}
exports.StartRound = StartRound;
function GetGameWithoutRounds(game, player_token, pair) {
    var game_ = {
        id: game.id,
        count: game.count,
        time: game.time,
        players: game.players
    };
    if (pair) {
        if (pair.player1.token == player_token) {
            return __assign(__assign({}, game_), { move: pair.player1_move });
        }
        else {
            return __assign(__assign({}, game_), { move: pair.player2_move });
        }
    }
    else {
        return game_;
    }
}
exports.GetGameWithoutRounds = GetGameWithoutRounds;
