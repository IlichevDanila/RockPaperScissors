import mysql from "mysql2";
import {DB} from "./constants";

export const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: DB.user,
    database: "rsp",
    password: DB.password,
    namedPlaceholders: true
}).promise();