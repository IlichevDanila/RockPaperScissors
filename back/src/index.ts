import express from 'express';
import {
    changeRoundState,
    sendError
} from "./function";
import {PORT} from "./constants";
import {check, checkForUpdates, connectToGame, createGame, move, status} from "./main";
import {Game} from "./types";
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/create_game', (req, res) => {
    let countString = req.query.count.toString();
    if(!/^[1-9]\d*$/.test(countString) || parseInt(countString) < 2)
    {
        return sendError(res,'Count must be integer not less than 2');
    }

    return createGame(parseInt(countString))
        .then(id => res.send({id: id}))
        .catch(error => sendError(res, error));
});

app.get('/connect', (req, res) => {
    let idString = req.query.id.toString();
    if(!/^[0-9]+$/.test(idString))
    {
        return sendError(res, 'Game id must be integer');
    }

    let nickname = req.query.nickname.toString();
    if(!/^[A-z0-9А-яЁё]+$/.test(nickname))
    {
        return sendError(res,'Nickname must include only letters or numbers');
    }

    return connectToGame(parseInt(idString), nickname)
        .then(token => res.send({nickname: nickname, token: token}))
        .catch(error => sendError(res, error));
});

app.get('/status', (req, res) => {
    let idString = req.query.id.toString();
    if(!/^[0-9]+$/.test(idString))
    {
        return sendError(res, 'Game id must be integer');
    }

    let tokenString = req.query.token.toString();
    if(!/^[A-z0-9]{64}$/.test(tokenString))
    {
        return sendError(res, 'Token must be 64 characters of length and include only letters or numbers');
    }

    return status(parseInt(idString), tokenString)
        .then(status => res.send(status))
        .catch(error => sendError(res, error));
});

app.get('/statusSubscribe', (req, res) => {
    let idString = req.query.id.toString();
    if(!/^[0-9]+$/.test(idString))
    {
        return sendError(res, 'Game id must be integer');
    }

    let tokenString = req.query.token.toString();
    if(!/^[A-z0-9]{64}$/.test(tokenString))
    {
        return sendError(res, 'Token must be 64 characters of length and include only letters or numbers');
    }

    return checkForUpdates(parseInt(idString), tokenString, res);
});

app.get('/move', (req, res) => {

    let idString = req.query.id.toString();
    if(!/^[0-9]+$/.test(idString))
    {
        return sendError(res, 'Game id must be integer');
    }

    let tokenString = req.query.token.toString();
    if(!/^[A-z0-9]{64}$/.test(tokenString))
    {
        return sendError(res, 'Token must be 64 characters of length and include only letters or numbers');
    }

    let moveString = req.query.move.toString();
    if(!/^1|2|3$/.test(moveString))
    {
        return sendError(res, 'Move value must be 1, 2 or 3');
    }

    return move(parseInt(idString), tokenString, parseInt(moveString) as 1 | 2 | 3)
        .then(result => res.send({result: 'Ok'}))
        .catch(error => sendError(res, error));
});

const checking = (games: Game[] = []) => {
    if (games.length) {
        changeRoundState(games.pop().id)
            .then(result => checking(games))
            .catch(error => console.log(error));
    }
    else {
        check()
            .then(games_ => checking(games_))
            .catch(error => console.log(error));
    }
}

checking();

app.listen(PORT);