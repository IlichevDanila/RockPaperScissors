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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.startRound = exports.createRound = exports.getPlayers = exports.changeRoundState = exports.setRoundState = exports.endRound = exports.setTimer = exports.setWinner = exports.setWinners = exports.getGameWithMove = exports.check = exports.move = exports.status = exports.checkForUpdates = exports.setStatusUpdate = exports.setStatusSeen = exports.connectToGame = exports.createGame = exports.setMove = exports.getPairByPlayer = exports.getGameWithRounds = exports.getGameWithPlayers = exports.getGame = exports.getLastRound = void 0;
var mysql2_1 = __importDefault(require("mysql2"));
var crypto = __importStar(require("crypto"));
var functions_1 = require("./functions");
var constants_1 = require("./constants");
var pool = mysql2_1["default"].createPool({
    connectionLimit: 5,
    host: "localhost",
    user: constants_1.DB.user,
    database: "rsp",
    password: constants_1.DB.password,
    namedPlaceholders: true
}).promise();
var getLastRound = function (game_id) {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM round WHERE game_id = ? AND id = (SELECT MAX(id) FROM round WHERE game_id = ?)", [game_id, game_id])
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
        pool.query("SELECT * FROM game WHERE id = ?", [game_id])
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
            pool.query("SELECT * FROM player WHERE game_id = ?", [game_id])
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
            pool.query("SELECT *, (select nickname from player where token = player1) as player1_nickname, (select nickname from player where token = player2) as player2_nickname FROM pair JOIN round, game WHERE pair.round_id = round.id AND pair.game_id = game.id AND round.game_id = game.id AND game.id = ? ORDER BY pair.round_id, pair.id;", [game_id])
                .then(function (result) {
                var game_ = game;
                game_.rounds = [];
                if (result[0].length == 0) {
                    return resolve(game_);
                }
                var last_j = 0;
                for (var i = 0; i <= result[0].at(-1).round_id; i++) {
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
            })["catch"](function (error) { return reject('Error during run function: getGameWithPlayers'); });
        })["catch"](function (error) { return reject(error); });
        ;
    });
};
exports.getGameWithRounds = getGameWithRounds;
var getPairByPlayer = function (game_id, token) {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT *, IF(player1 = ?, 0, 1) as position FROM pair WHERE game_id = ? \nAND round_id = (SELECT max(id) FROM round WHERE game_id = ?) \nAND (player1 = ? OR player2 = ?)", [token, game_id, game_id, token, token])
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
    return pool.query("UPDATE pair SET player" + (position ? "2" : "1") + "_move = ? WHERE game_id = ? AND round_id = ? AND id = ?", [move, game_id, round_id, pair_id]);
};
exports.setMove = setMove;
var createGame = function (count) {
    return new Promise(function (resolve, reject) {
        pool.query("INSERT INTO game(count) VALUES (?)", [count])
            .then(function (result) { return resolve(result[0].insertId); })["catch"](function (error) { return reject(error); });
    });
};
exports.createGame = createGame;
var connectToGame = function (game_id, nickname) {
    return new Promise(function (resolve, reject) {
        (0, exports.getGameWithRounds)(game_id).then(function (game) {
            if (game.count <= game.players.length) {
                return reject('Max players count');
            }
            if (game.players.find(function (player) { return player.nickname == nickname; })) {
                return reject('Nickname is already used');
            }
            var token = crypto.createHash('sha256').update(crypto.randomUUID()).digest('hex');
            pool.query("INSERT INTO player(game_id, nickname, token, status_update) VALUES (?, ?, ?, ?)", [game_id, nickname, token, constants_1.STATUS_NUMBER[constants_1.WAITING_FOR_START]])
                .then(function (result) {
                if (game.count - 1 == game.players.length) {
                    (0, exports.startRound)(game.id);
                }
                return resolve(token);
            })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) { return reject(error); });
    });
};
exports.connectToGame = connectToGame;
var setStatusSeen = function (game_id, token) {
    return new Promise(function (resolve, reject) {
        /*console.log(mysql.format("UPDATE player SET seen = 1 WHERE game_id = ?",
            [game_id]));*/
        pool.query("UPDATE player SET seen = 1 WHERE game_id = ? AND token = ?", [game_id, token])
            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
    });
};
exports.setStatusSeen = setStatusSeen;
var setStatusUpdate = function (game_id, value, token) {
    if (token === void 0) { token = null; }
    return new Promise(function (resolve, reject) {
        /*console.log("UPDATE player SET status_update = ?, seen = 0 WHERE game_id = ?",
            [value, game_id]);*/
        pool.query("UPDATE player SET status_update = ?, seen = 0 WHERE game_id = ?" + (token ? " AND token = ?" : ""), [value, game_id, token])
            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
    });
};
exports.setStatusUpdate = setStatusUpdate;
var checkForUpdates = function (game_id, token, res, count) {
    if (count === void 0) { count = 0; }
    if (count >= 60) {
        res.status(502);
        return res.send({ error: 'Timeout' });
    }
    (0, exports.status)(game_id, token, 1)
        .then(function (status) { return res.send(status); })["catch"](function (error) {
        if (error.updates === 0) {
            return setTimeout(function () { return (0, exports.checkForUpdates)(game_id, token, res, count + 1); }, 1000);
        }
        (0, functions_1.sendError)(res, error);
    });
};
exports.checkForUpdates = checkForUpdates;
var status = function (game_id, token, onlyUnseen) {
    if (onlyUnseen === void 0) { onlyUnseen = 0; }
    return new Promise(function (resolve, reject) {
        (0, exports.getGameWithRounds)(game_id)
            .then(function (game) {
            pool.query("SELECT * FROM player WHERE game_id = ? AND token = ?", [game_id, token])
                .then(function (result) {
                //console.log(result);
                if (result[0][0].seen == 0 || !onlyUnseen) {
                    switch (result[0][0].status_update) {
                        case 1:
                            return (0, exports.setStatusSeen)(game_id, token)
                                .then(function (result) { return resolve({ state: constants_1.WAITING_FOR_START, game: game }); })["catch"](function (error) { return reject(error); });
                            break;
                        case 2:
                            return (0, exports.setStatusSeen)(game_id, token)
                                .then(function (result) {
                                return getGameWithMove(game, token)
                                    .then(function (game) { return resolve({ state: constants_1.WAITING_FOR_MOVE, game: game }); })["catch"](function (error) { return reject(error); });
                            })["catch"](function (error) { return reject(error); });
                            break;
                        case 3:
                            return (0, exports.setStatusSeen)(game_id, token)
                                .then(function (result) { return resolve({ state: constants_1.LOSE, game: (0, functions_1.getGameWithoutLastRound)(game) }); })["catch"](function (error) { return reject(error); });
                            break;
                        case 4:
                            return (0, exports.setStatusSeen)(game_id, token)
                                .then(function (result) { return resolve({ state: constants_1.WAITING_FOR_ROUND_START, game: game }); })["catch"](function (error) { return reject(error); });
                            break;
                        case 5:
                            return (0, exports.setStatusSeen)(game_id, token)
                                .then(function (result) { return resolve({ state: constants_1.END, game: game }); })["catch"](function (error) { return reject(error); });
                            break;
                    }
                }
                return reject({ updates: 0 });
            })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) { return reject(error); });
    });
};
exports.status = status;
var move = function (game_id, token, move) {
    return new Promise(function (resolve, reject) {
        (0, exports.getPairByPlayer)(game_id, token)
            .then(function (pair) {
            return (0, exports.setStatusUpdate)(game_id, constants_1.STATUS_NUMBER[constants_1.WAITING_FOR_MOVE], token)
                .then(function (result) {
                return (0, exports.setMove)(move, game_id, pair.round_id, pair.id, pair.position)
                    .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
            })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) { return reject('Player has lost'); });
    });
};
exports.move = move;
var check = function () {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM game WHERE ended = 0 AND time <= UNIX_TIMESTAMP(NOW())")
            .then(function (result) { return resolve(result[0]); })["catch"](function (error) { return reject(error); });
    });
};
exports.check = check;
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
    pool.execute("UPDATE pair SET winner = :winner WHERE \ngame_id = :game_id\nAND round_id = :round_id\nAND id = :pair_id", { winner: data_.winner, game_id: data_.game_id, round_id: data_.round_id, pair_id: data_.pair_id })
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
        pool.query("UPDATE game SET time = UNIX_TIMESTAMP(NOW()) + ? WHERE id = ?", [offset, game_id])
            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
    });
};
exports.setTimer = setTimer;
var endRound = function (game_id) {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM pair WHERE game_id = ? \nAND round_id = (SELECT max(id) FROM round WHERE game_id = ?)", [game_id, game_id])
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
        pool.query("UPDATE round SET state = ? WHERE game_id = ? AND id = ?", [state, game_id, round_id])
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
                    pool.query("UPDATE game SET ended = 1 WHERE id = ?", [game_id])
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
            console.log(round);
            pool.query("SELECT * FROM player WHERE game_id = :game_id AND (\ntoken IN (SELECT player1 FROM pair WHERE (winner = 1 OR winner = 3) AND game_id = :game_id AND round_id = :round_id)\nOR \ntoken IN (SELECT player2 FROM pair WHERE (winner = 2 OR winner = 3) AND game_id = :game_id AND round_id = :round_id))", { game_id: game_id, round_id: round.id })
                .then(function (result) { return resolve({ players: result[0], round: round }); })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) {
            console.log(error);
            pool.query("SELECT * FROM player WHERE game_id = :game_id", { game_id: game_id })
                .then(function (result) { return resolve({ players: result[0] }); })["catch"](function (error) { return reject(error); });
        });
    });
};
exports.getPlayers = getPlayers;
var createRound = function (game_id, round_id) {
    return new Promise(function (resolve, reject) {
        pool.query("INSERT INTO round(id, game_id) VALUES(:round_id, :game_id)", { game_id: game_id, round_id: round_id })
            .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
    });
};
exports.createRound = createRound;
var startRound = function (game_id) {
    return new Promise(function (resolve, reject) {
        (0, exports.getPlayers)(game_id).then(function (result) {
            var players = result.players;
            console.log(players);
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
                        players[(players.length - 1 + offset) % players.length],
                        null
                    ]);
                }
                pool.query("INSERT INTO pair(id, round_id, game_id, player1, player2)\nVALUES (?)", pairs)
                    .then(function (result) {
                    pool.query("UPDATE player SET status_update = IF(token IN (?), ?, ?), seen = 0 WHERE game_id = ?", [players.map(function (player) { return player.token; }),
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
