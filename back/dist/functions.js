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
exports.getGameWithoutLastRound = exports.sendError = void 0;
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
