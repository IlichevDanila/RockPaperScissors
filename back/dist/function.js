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
exports.startRound = exports.createRound = exports.getPlayers = exports.changeRoundState = exports.setRoundState = exports.endRound = exports.setTimer = exports.setWinner = exports.setWinners = exports.getGameWithMove = exports.setStatusUpdate = exports.setStatusSeen = exports.setMove = exports.getPairByPlayer = exports.getGameWithRounds = exports.getGameWithPlayers = exports.getGame = exports.getLastRound = exports.getGameWithoutLastRound = exports.sendError = void 0;
var db_connect_1 = require("./db_connect");
var constants_1 = require("./constants");
function sendError(res, error) {
    res.status(400);
    res.send({ error: error });
}
exports.sendError = sendError;
function getGameWithoutLastRound(game) {
    var game_ = {
        id: game.id,
        count: game.count,
        time: game.time,
        players: game.players
    };
    return __assign(__assign({}, game_), { rounds: game.rounds.slice(0, -1) });
}
exports.getGameWithoutLastRound = getGameWithoutLastRound;
var getLastRound = function (game_id) {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("SELECT * FROM round WHERE game_id = ? AND id = (SELECT MAX(id) FROM round WHERE game_id = ?)", [game_id, game_id])
            .then(function (result) {
            if (result[0][0]) {
                return resolve(result[0][0]);
            }
            else {
                return reject('Round do not exist');
            }
        })["catch"](function (error) { return reject(error); });
    });
};
exports.getLastRound = getLastRound;
var getGame = function (game_id) {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("SELECT * FROM game WHERE id = ?", [game_id])
            .then(function (result) {
            if (result[0][0]) {
                return resolve(result[0][0]);
            }
            else {
                return reject('Game do not exist');
            }
        })["catch"](function (error) { return reject(error); });
    });
};
exports.getGame = getGame;
var getGameWithPlayers = function (game_id) {
    return new Promise(function (resolve, reject) {
        (0, exports.getGame)(game_id).then(function (game) {
            var game_ = game;
            db_connect_1.pool.query("SELECT * FROM player WHERE game_id = ?", [game_id])
                .then(function (result) {
                game_.players = result[0].map(function (player) {
                    return {
                        nickname: player.nickname
                    };
                });
                return resolve(game_);
            })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) { return reject(error); });
    });
};
exports.getGameWithPlayers = getGameWithPlayers;
var getGameWithRounds = function (game_id) {
    return new Promise(function (resolve, reject) {
        (0, exports.getGameWithPlayers)(game_id).then(function (game) {
            db_connect_1.pool.query("SELECT *, (select nickname from player where token = player1) as player1_nickname, (select nickname from player where token = player2) as player2_nickname FROM pair JOIN round, game WHERE pair.round_id = round.id AND pair.game_id = game.id AND round.game_id = game.id AND game.id = ? ORDER BY pair.round_id, pair.id", [game_id])
                .then(function (result) {
                var game_ = game;
                game_.rounds = [];
                if (result[0].length == 0) {
                    return resolve(game_);
                }
                var last_j = 0;
                for (var i = 0; i <= result[0][result[0].length - 1].round_id; i++) {
                    var round = { pairs: [], state: 3 };
                    for (var j = last_j; j < result[0].length; j++) {
                        if (result[0][j].round_id == i) {
                            round.pairs.push({
                                player1: {
                                    nickname: result[0][j].player1_nickname
                                },
                                player2: {
                                    nickname: result[0][j].player2_nickname
                                },
                                player1_move: result[0][j].player1_move,
                                player2_move: result[0][j].player2_move,
                                winner: result[0][j].winner
                            });
                            round.state = result[0][j].state;
                        }
                        else {
                            last_j = j;
                            break;
                        }
                    }
                    game_.rounds.push(round);
                }
                return resolve(game_);
            })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) { return reject(error); });
    });
};
exports.getGameWithRounds = getGameWithRounds;
var getPairByPlayer = function (game_id, token) {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("SELECT *, IF(player1 = ?, 0, 1) as position FROM pair WHERE game_id = ? \nAND round_id = (SELECT max(id) FROM round WHERE game_id = ?) \nAND (player1 = ? OR player2 = ?)", [token, game_id, game_id, token, token])
            .then(function (result) {
            if (result[0].length == 0) {
                return reject('Pair do not exist');
            }
            return resolve(result[0][0]);
        })["catch"](function (error) { return reject(error); });
    });
};
exports.getPairByPlayer = getPairByPlayer;
var setMove = function (move, game_id, round_id, pair_id, position) {
    return db_connect_1.pool.query("UPDATE pair SET player" + (position ? "2" : "1") + "_move = ? WHERE game_id = ? AND round_id = ? AND id = ?", [move, game_id, round_id, pair_id]);
};
exports.setMove = setMove;
var setStatusSeen = function (game_id, token) {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("UPDATE player SET seen = 1 WHERE game_id = ? AND token = ?", [game_id, token])
            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
    });
};
exports.setStatusSeen = setStatusSeen;
var setStatusUpdate = function (game_id, value, token) {
    if (token === void 0) { token = null; }
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("UPDATE player SET status_update = ?, seen = 0 WHERE game_id = ?" + (token ? " AND token = ?" : ""), [value, game_id, token])
            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
    });
};
exports.setStatusUpdate = setStatusUpdate;
function getGameWithMove(game, token) {
    return new Promise(function (resolve, reject) {
        var game_ = {
            id: game.id,
            count: game.count,
            time: game.time,
            players: game.players
        };
        (0, exports.getPairByPlayer)(game.id, token)
            .then(function (pair) {
            if (pair.position == 0) {
                resolve(__assign(__assign({}, game_), { move: pair.player1_move }));
            }
            else {
                resolve(__assign(__assign({}, game_), { move: pair.player2_move }));
            }
        })["catch"](function (error) {
            resolve(__assign({}, game_));
        });
    });
}
exports.getGameWithMove = getGameWithMove;
var setWinners = function (data) {
    return new Promise(function (resolve, reject) {
        (0, exports.setWinner)(data, resolve);
    });
};
exports.setWinners = setWinners;
var setWinner = function (data, resolve) {
    var data_ = data.pop();
    db_connect_1.pool.execute("UPDATE pair SET winner = :winner WHERE \ngame_id = :game_id\nAND round_id = :round_id\nAND id = :pair_id", { winner: data_.winner, game_id: data_.game_id, round_id: data_.round_id, pair_id: data_.pair_id })
        .then(function (result) {
        if (data.length) {
            (0, exports.setWinner)(data, resolve);
        }
        else {
            return resolve(result);
        }
    });
};
exports.setWinner = setWinner;
var setTimer = function (game_id, offset) {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("UPDATE game SET time = UNIX_TIMESTAMP(NOW()) + ? WHERE id = ?", [offset, game_id])
            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
    });
};
exports.setTimer = setTimer;
var endRound = function (game_id) {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("SELECT * FROM pair WHERE game_id = ? \nAND round_id = (SELECT max(id) FROM round WHERE game_id = ?)", [game_id, game_id])
            .then(function (result) {
            var update_data = [];
            result[0].map(function (pair) {
                update_data.push({
                    game_id: game_id,
                    round_id: pair.round_id,
                    pair_id: pair.id,
                    winner: constants_1.WinRules[pair.player1_move][pair.player2_move]
                });
            });
            (0, exports.setWinners)(update_data)
                .then(function (result) {
                return (0, exports.setStatusUpdate)(game_id, constants_1.STATUS_NUMBER[constants_1.WAITING_FOR_ROUND_START])
                    .then(function (result) {
                    return (0, exports.setTimer)(game_id, 5)
                        .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
                })["catch"](function (error) { return reject(error); });
            })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) { return reject(error); });
    });
};
exports.endRound = endRound;
var setRoundState = function (state, game_id, round_id) {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("UPDATE round SET state = ? WHERE game_id = ? AND id = ?", [state, game_id, round_id])
            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
    });
};
exports.setRoundState = setRoundState;
var changeRoundState = function (game_id) {
    return new Promise(function (resolve, reject) {
        (0, exports.getLastRound)(game_id)
            .then(function (round) {
            switch (round.state) {
                case 1:
                    (0, exports.setRoundState)(2, game_id, round.id)
                        .then(function (result) {
                        return (0, exports.endRound)(game_id)
                            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
                    })["catch"](function (error) { return reject(error); });
                    break;
                case 2:
                    (0, exports.setRoundState)(3, game_id, round.id)
                        .then(function (result) {
                        return (0, exports.startRound)(game_id)
                            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
                    })["catch"](function (error) { return reject(error); });
                    break;
                case 3:
                    db_connect_1.pool.query("UPDATE game SET ended = 1 WHERE id = ?", [game_id])
                        .then(function (result) {
                        return (0, exports.setStatusUpdate)(game_id, constants_1.STATUS_NUMBER[constants_1.END])
                            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
                    })["catch"](function (error) { return reject(error); });
            }
        })["catch"](function (error) { return reject(error); });
    });
};
exports.changeRoundState = changeRoundState;
var getPlayers = function (game_id) {
    return new Promise(function (resolve, reject) {
        (0, exports.getLastRound)(game_id)
            .then(function (round) {
            db_connect_1.pool.query("SELECT * FROM player WHERE game_id = :game_id AND (\ntoken IN (SELECT player1 FROM pair WHERE (winner = 1 OR winner = 3) AND game_id = :game_id AND round_id = :round_id)\nOR \ntoken IN (SELECT player2 FROM pair WHERE (winner = 2 OR winner = 3) AND game_id = :game_id AND round_id = :round_id))", { game_id: game_id, round_id: round.id })
                .then(function (result) { return resolve({ players: result[0], round: round }); })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) {
            db_connect_1.pool.query("SELECT * FROM player WHERE game_id = :game_id", { game_id: game_id })
                .then(function (result) { return resolve({ players: result[0] }); })["catch"](function (error) { return reject(error); });
        });
    });
};
exports.getPlayers = getPlayers;
var createRound = function (game_id, round_id) {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("INSERT INTO round(id, game_id) VALUES(:round_id, :game_id)", { game_id: game_id, round_id: round_id })
            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
    });
};
exports.createRound = createRound;
var startRound = function (game_id) {
    return new Promise(function (resolve, reject) {
        (0, exports.getPlayers)(game_id).then(function (result) {
            var players = result.players;
            if (players.length <= 1) {
                return resolve(result);
            }
            var round_id = result.round ? result.round.id + 1 : 0;
            (0, exports.createRound)(game_id, round_id)
                .then(function (result) {
                var offset = Math.floor(Math.random() * players.length);
                var pairs = [];
                for (var i = 0; i < players.length - 1; i += 2) {
                    pairs.push([
                        i,
                        round_id,
                        game_id,
                        players[(i + offset) % players.length].token,
                        players[(i + 1 + offset) % players.length].token
                    ]);
                }
                if (players.length % 2 == 1) {
                    pairs.push([
                        players.length - 1,
                        round_id,
                        game_id,
                        players[(players.length - 1 + offset) % players.length].token,
                        null
                    ]);
                }
                db_connect_1.pool.query("INSERT INTO pair(id, round_id, game_id, player1, player2)\nVALUES ?", [pairs])
                    .then(function (result) {
                    db_connect_1.pool.query("UPDATE player SET status_update = IF(token IN (?), ?, ?), seen = 0 WHERE game_id = ?", [players.map(function (player) { return player.token; }),
                        constants_1.STATUS_NUMBER[constants_1.WAITING_FOR_MOVE], constants_1.STATUS_NUMBER[constants_1.LOSE], game_id])
                        .then(function (result) {
                        return (0, exports.setTimer)(game_id, 30)
                            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
                    })["catch"](function (error) { return reject(error); });
                })["catch"](function (error) { return reject(error); });
            })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) { return reject(error); });
    });
};
exports.startRound = startRound;
