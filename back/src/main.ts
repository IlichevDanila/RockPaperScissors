import {ResultSetHeader} from 'mysql2';
import {
    Game,
    StatusType
} from "./types";
import * as crypto from "crypto";
import {
    getGameWithMove,
    getGameWithoutLastRound,
    getGameWithRounds, getPairByPlayer,
    sendError, setMove,
    setStatusSeen, setStatusUpdate,
    startRound
} from "./function";
import {
    END,
    LOSE,
    STATUS_NUMBER,
    WAITING_FOR_MOVE,
    WAITING_FOR_ROUND_START,
    WAITING_FOR_START
} from "./constants";
import {Response} from "express";
import {pool} from "./db_connect";

export const createGame = (count: number) => {
    return new Promise((resolve: (id: number) => void, reject: (error) => void) => {
        pool.query("INSERT INTO game(count) VALUES (?)", [count])
            .then(
                result => resolve((result[0] as ResultSetHeader).insertId)
            ).catch(
                error => reject(error)
            );
    });
}

export const connectToGame = (game_id: number, nickname: string) => {
    return new Promise((resolve: (token: string) => void, reject: (error) => void) => {
        getGameWithRounds(game_id).then(
            game => {
                if (game.count <= game.players.length) {
                    return reject('Max players count');
                }
                if (game.players.find(player => player.nickname == nickname)) {
                    return reject('Nickname is already used');
                }

                let token = crypto.createHash('sha256').update(crypto.randomUUID()).digest('hex');
                pool.query("INSERT INTO player(game_id, nickname, token, status_update) VALUES (?, ?, ?, ?)",
                    [game_id, nickname, token, STATUS_NUMBER[WAITING_FOR_START]])
                    .then(result => {
                        if (game.count - 1 == game.players.length) {
                            startRound(game.id);
                        }
                        return resolve(token)
                    })
                    .catch(error => reject(error));
            }
        ).catch(error => reject(error));
    });
}

export const checkForUpdates = (game_id: number, token: string, res:Response, count = 0) => {
    if (count >= 60) {
        res.status(502);
        return res.send({error: 'Timeout'});
    }
    status(game_id, token, 1)
        .then(status => res.send(status))
        .catch(error => {
            if (error.updates === 0) {
                return setTimeout(() => checkForUpdates(game_id, token, res, count + 1), 1000);
            }
            sendError(res, error)
        });
}

export const status = (game_id: number, token: string, onlyUnseen: 0 | 1 = 0) => {
    return new Promise((resolve: (status: StatusType) => void, reject: (error) => void) => {
        getGameWithRounds(game_id)
            .then(game => {
                pool.query("SELECT * FROM player WHERE game_id = ? AND token = ?",
                    [game_id, token])
                    .then((result: any) => {
                        if (result[0][0].seen == 0 || !onlyUnseen) {
                            switch (result[0][0].status_update) {
                                case 1:
                                    return setStatusSeen(game_id, token)
                                        .then(result => resolve({state: WAITING_FOR_START, game: game}))
                                        .catch(error => reject(error))
                                    break;
                                case 2:
                                    return setStatusSeen(game_id, token)
                                        .then(result =>
                                            getGameWithMove(game, token)
                                                .then(game => resolve({state: WAITING_FOR_MOVE, game: game}))
                                                .catch(error => reject(error)))
                                        .catch(error => reject(error))
                                    break;
                                case 3:
                                    return setStatusSeen(game_id, token)
                                        .then(result => resolve({state: LOSE, game: getGameWithoutLastRound(game)}))
                                        .catch(error => reject(error))
                                    break;
                                case 4:
                                    return setStatusSeen(game_id, token)
                                        .then(result => resolve({state: WAITING_FOR_ROUND_START, game: game}))
                                        .catch(error => reject(error))
                                    break;
                                case 5:
                                    return setStatusSeen(game_id, token)
                                        .then(result => resolve({state: END, game: game}))
                                        .catch(error => reject(error))
                                    break;
                            }
                        }
                        return reject({updates: 0});
                    })
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    });
}

export const move = (game_id: number, token: string, move: 1 | 2 | 3) =>
    new Promise((resolve: (result) => void, reject: (error) => void) => {
        getPairByPlayer(game_id, token)
            .then(pair =>
                setStatusUpdate(game_id, STATUS_NUMBER[WAITING_FOR_MOVE], token)
                    .then(result =>
                        setMove(move, game_id, pair.round_id, pair.id, pair.position)
                            .then(result => resolve(result))
                            .catch(error => reject(error)))
                    .catch(error => reject(error)))
            .catch(error => reject('Player has lost'));
    });

export const check = () => {
    return new Promise((resolve: (result: Game[]) => void, reject: (error) => void) => {
        pool.query(`SELECT * FROM game WHERE ended = 0 AND 
(game.time <= UNIX_TIMESTAMP(NOW()) OR EveryHasMoved(game.id) = 1)`)
            .then((result: any) => resolve(result[0]))
            .catch(error => reject(error));
    });
}