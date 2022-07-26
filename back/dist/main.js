"use strict";
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
exports.__esModule = true;
exports.check = exports.move = exports.status = exports.checkForUpdates = exports.connectToGame = exports.createGame = void 0;
var crypto = __importStar(require("crypto"));
var function_1 = require("./function");
var constants_1 = require("./constants");
var db_connect_1 = require("./db_connect");
var createGame = function (count) {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("INSERT INTO game(count) VALUES (?)", [count])
            .then(function (result) { return resolve(result[0].insertId); })["catch"](function (error) { return reject(error); });
    });
};
exports.createGame = createGame;
var connectToGame = function (game_id, nickname) {
    return new Promise(function (resolve, reject) {
        (0, function_1.getGameWithRounds)(game_id).then(function (game) {
            if (game.count <= game.players.length) {
                return reject('Max players count');
            }
            if (game.players.find(function (player) { return player.nickname == nickname; })) {
                return reject('Nickname is already used');
            }
            var token = crypto.createHash('sha256').update(crypto.randomUUID()).digest('hex');
            db_connect_1.pool.query("INSERT INTO player(game_id, nickname, token, status_update) VALUES (?, ?, ?, ?)", [game_id, nickname, token, constants_1.STATUS_NUMBER[constants_1.WAITING_FOR_START]])
                .then(function (result) {
                if (game.count - 1 == game.players.length) {
                    (0, function_1.startRound)(game.id);
                }
                return resolve(token);
            })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) { return reject(error); });
    });
};
exports.connectToGame = connectToGame;
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
        (0, function_1.sendError)(res, error);
    });
};
exports.checkForUpdates = checkForUpdates;
var status = function (game_id, token, onlyUnseen) {
    if (onlyUnseen === void 0) { onlyUnseen = 0; }
    return new Promise(function (resolve, reject) {
        (0, function_1.getGameWithRounds)(game_id)
            .then(function (game) {
            db_connect_1.pool.query("SELECT * FROM player WHERE game_id = ? AND token = ?", [game_id, token])
                .then(function (result) {
                if (result[0][0].seen == 0 || !onlyUnseen) {
                    switch (result[0][0].status_update) {
                        case 1:
                            return (0, function_1.setStatusSeen)(game_id, token)
                                .then(function (result) { return resolve({ state: constants_1.WAITING_FOR_START, game: game }); })["catch"](function (error) { return reject(error); });
                            break;
                        case 2:
                            return (0, function_1.setStatusSeen)(game_id, token)
                                .then(function (result) {
                                return (0, function_1.getGameWithMove)(game, token)
                                    .then(function (game) { return resolve({ state: constants_1.WAITING_FOR_MOVE, game: game }); })["catch"](function (error) { return reject(error); });
                            })["catch"](function (error) { return reject(error); });
                            break;
                        case 3:
                            return (0, function_1.setStatusSeen)(game_id, token)
                                .then(function (result) { return resolve({ state: constants_1.LOSE, game: (0, function_1.getGameWithoutLastRound)(game) }); })["catch"](function (error) { return reject(error); });
                            break;
                        case 4:
                            return (0, function_1.setStatusSeen)(game_id, token)
                                .then(function (result) { return resolve({ state: constants_1.WAITING_FOR_ROUND_START, game: game }); })["catch"](function (error) { return reject(error); });
                            break;
                        case 5:
                            return (0, function_1.setStatusSeen)(game_id, token)
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
        (0, function_1.getPairByPlayer)(game_id, token)
            .then(function (pair) {
            return (0, function_1.setStatusUpdate)(game_id, constants_1.STATUS_NUMBER[constants_1.WAITING_FOR_MOVE], token)
                .then(function (result) {
                return (0, function_1.setMove)(move, game_id, pair.round_id, pair.id, pair.position)
                    .then(function (result) { return resolve(result); })["catch"](function (error) { return reject(error); });
            })["catch"](function (error) { return reject(error); });
        })["catch"](function (error) { return reject('Player has lost'); });
    });
};
exports.move = move;
var check = function () {
    return new Promise(function (resolve, reject) {
        db_connect_1.pool.query("SELECT * FROM game WHERE ended = 0 AND time <= UNIX_TIMESTAMP(NOW())")
            .then(function (result) { return resolve(result[0]); })["catch"](function (error) { return reject(error); });
    });
};
exports.check = check;
