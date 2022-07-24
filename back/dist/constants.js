"use strict";
exports.__esModule = true;
exports.STATUS_NUMBER = exports.END = exports.WAITING_FOR_ROUND_START = exports.LOSE = exports.WAITING_FOR_MOVE = exports.WAITING_FOR_START = exports.DB = exports.PORT = exports.WinRules = void 0;
exports.WinRules = {
    0: { 0: 0, 1: 2, 2: 2, 3: 2 },
    1: { 0: 1, 1: 3, 2: 1, 3: 2 },
    2: { 0: 1, 1: 2, 2: 3, 3: 1 },
    3: { 0: 1, 1: 1, 2: 2, 3: 3 }
};
exports.PORT = 3000;
exports.DB = {
    user: 'root',
    password: 'spitintoeternity1572080'
};
exports.WAITING_FOR_START = 'waiting_for_start';
exports.WAITING_FOR_MOVE = 'waiting_for_move';
exports.LOSE = 'lose';
exports.WAITING_FOR_ROUND_START = 'waiting_for_round_start';
exports.END = 'end';
exports.STATUS_NUMBER = {
    waiting_for_start: 1,
    waiting_for_move: 2,
    lose: 3,
    waiting_for_round_start: 4,
    end: 5
};
