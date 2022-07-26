"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.pool = void 0;
var mysql2_1 = __importDefault(require("mysql2"));
var constants_1 = require("./constants");
exports.pool = mysql2_1["default"].createPool({
    connectionLimit: 5,
    host: "localhost",
    user: constants_1.DB.user,
    database: "rsp",
    password: constants_1.DB.password,
    namedPlaceholders: true
}).promise();
