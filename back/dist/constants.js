"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.STATUS_NUMBER = exports.END = exports.WAITING_FOR_ROUND_START = exports.LOSE = exports.WAITING_FOR_MOVE = exports.WAITING_FOR_START = exports.DB = exports.PORT = exports.WinRules = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
exports.WinRules = {
    0: { 0: 0, 1: 2, 2: 2, 3: 2 },
    1: { 0: 1, 1: 3, 2: 1, 3: 2 },
    2: { 0: 1, 1: 2, 2: 3, 3: 1 },
    3: { 0: 1, 1: 1, 2: 2, 3: 3 }
};
exports.PORT = process.env.PORT;
exports.DB = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
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
