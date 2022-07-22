import mysql, {ResultSetHeader} from 'mysql2';
import {
    Game,
    GameWithPlayers,
    GameWithRounds, PairFromDB, PlayerWithToken,
    Round, RoundFromDB, setWinnerData,
    StatusType
} from "./types";
import * as crypto from "crypto";
import {
    getGameWithMove,
    getGameWithoutLastRound
} from "./functions";
import {DB, WinRules} from "./constants";

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: DB.user,
    database: "rsp",
    password: DB.password,
    namedPlaceholders: true
}).promise();

export const getLastRound = (game_id: number) => {
    return new Promise((resolve: (round: RoundFromDB) => void, reject: (error) => void) => {
        pool.query("SELECT * FROM round WHERE game_id = ? AND id = (SELECT MAX(id) FROM round WHERE game_id = ?)",
            [game_id, game_id])
            .then(result => {
                if (result[0][0]) {
                    return resolve(result[0][0]);
                }
                else {
                    return reject('Round do not exist');
                }
            })
            .catch(
                error => reject(error)
            );
    });
}

export const getGame = (game_id: number) => {
    return new Promise((resolve: (game: Game) => void, reject: (error) => void) => {
        pool.query("SELECT * FROM game WHERE id = ?", [game_id])
            .then(result => {
                if (result[0][0]) {
                    return resolve(result[0][0]);
                }
                else {
                    return reject('Game do not exist');
                }
            })
            .catch(
                error => reject(error)
            );
    });
}

export const getGameWithPlayers = (game_id: number) => {
    return new Promise((resolve: (game: GameWithPlayers) => void, reject: (error) => void) => {
        getGame(game_id).then(game => {
            let game_ = game as GameWithPlayers;
            pool.query("SELECT * FROM player WHERE game_id = ?", [game_id])
                .then((result:any) => {
                    game_.players = result[0].map(player => {
                        return {
                            nickname: player.nickname
                        }
                    });
                    return resolve(game_);
                })
                .catch(
                    error => reject(error)
                );
        }).catch(
            error => reject(error)
        );
    });
}

export const getGameWithRounds = (game_id: number) => {
    return new Promise((resolve: (game: GameWithRounds) => void, reject: (error) => void) => {
        getGameWithPlayers(game_id).then(game => {
            pool.query(`SELECT *, (select nickname from player where token = player1) as player1_nickname, (select nickname from player where token = player2) as player2_nickname FROM pair JOIN round, game WHERE pair.round_id = round.id AND pair.game_id = game.id AND round.game_id = game.id AND game.id = ? ORDER BY pair.round_id, pair.id;`,
                [game_id])
                .then((result: any) => {
                    let game_ = game as GameWithRounds;
                    game_.rounds = [];
                    if (result[0].length == 0) {
                        return resolve(game_);
                    }
                    let last_j = 0;
                    for (let i = 0; i <= result[0].at(-1).round_id; i++) {
                        let round = {pairs: [], state: 3} as Round;
                        for (let j = last_j; j < result[0].length; j++) {
                            if (result[0][j].round_id == i) {
                                round.pairs.push(
                                    {
                                        player1: {
                                            nickname: result[0][j].player1_nickname
                                        },
                                        player2: {
                                            nickname: result[0][j].player2_nickname
                                        },
                                        player1_move: result[0][j].player1_move,
                                        player2_move: result[0][j].player2_move,
                                        winner: result[0][j].winner
                                    }
                                );
                                round.state = result[0][j].state;
                            } else {
                                last_j = j;
                                break;
                            }
                        }
                        game_.rounds.push(round);
                    }
                    return resolve(game_);
                })
                .catch(
                    error => reject('Error during run function: getGameWithPlayers')
                )
        }).catch(
            error => reject(error)
        );;
    });
}

export const getPairByPlayer = (game_id: number, token: string) => {
    return new Promise((resolve: (pair: PairFromDB) => void, reject: (error) => void) => {
        pool.query(`SELECT *, IF(player1 = ?, 0, 1) as position FROM pair WHERE game_id = ? 
AND round_id = (SELECT max(id) FROM round WHERE game_id = ?) 
AND (player1 = ? OR player2 = ?)`,
            [token, game_id, game_id, token, token])
            .then((result:any) => {
                if (result[0].length == 0) {
                    return reject('Pair do not exist');
                }
                return resolve(result[0][0]);
            })
            .catch(
                error => reject(error)
            );
    });
}

export const setMove = (move, game_id, round_id, pair_id, position) =>
    pool.query(`UPDATE pair SET player` + (position ? "2" : "1") + `_move = ? WHERE game_id = ? AND round_id = ? AND id = ?`,
        [move, game_id, round_id, pair_id]);

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
                pool.query("INSERT INTO player(game_id, nickname, token) VALUES (?, ?, ?)",
                    [game_id, nickname, token])
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

export const status = (game_id: number, token: string) => {
    return new Promise((resolve: (status: StatusType) => void, reject: (error) => void) => {
        getGameWithRounds(game_id)
            .then(game => {
                if (game.count > game.players.length || game.rounds.length == 0) {
                    return resolve({state: 'waiting_for_start', game: game});
                }

                let lastRound = game.rounds.at(-1);

                switch(lastRound.state) {
                    case 1:
                        return getPairByPlayer(game_id, token)
                            .then(
                                pair => {
                                    return resolve({state: 'waiting_for_move', game: getGameWithMove(game, pair)});
                                }
                            )
                            .catch(
                                error => {
                                    return resolve({state: 'lose', game: getGameWithoutLastRound(game)});
                                }
                            );
                        break;
                    case 2:
                        return resolve({state: 'waiting_for_round_start', game: game});
                        break;
                    default:
                        return resolve({state: 'end', game: game});
                        break;
                }
            })
            .catch(error => reject(error));
    });
}

export const move = (game_id: number, token: string, move: 1 | 2 | 3) =>
    new Promise((resolve: (result) => void, reject: (error) => void) => {
        getPairByPlayer(game_id, token)
            .then(pair => setMove(move, game_id, pair.round_id, pair.id, pair.position)
                    .then(result => resolve(result))
                    .catch(error => reject(error)))
            .catch(error => reject('Player has lost'));
    });

export const check = () => {
    return new Promise((resolve: (result: Game[]) => void, reject: (error) => void) => {
        pool.query("SELECT * FROM game WHERE time <= UNIX_TIMESTAMP(NOW())")
            .then((result: any) => resolve(result[0]))
            .catch(error => reject(error));
    });
}

export const setWinners = (data: setWinnerData[]) => {
    return new Promise((resolve: (result: Game[]) => void, reject: (error) => void) => {
        setWinner(data, resolve);
    });
}

export const setWinner = (data: setWinnerData[], resolve: (result) => void) => {
    let data_ = data.pop();
    pool.query(`UPDATE pair SET winner = ? WHERE 
game_id = ? 
AND round_id = ?
AND id = ?`,
        [data_.game_id, data_.round_id, data_.pair_id, data_.winner])
        .then(result => {
            if (data.length) {
                setWinner(data, resolve);
            }
            else {
                return resolve(result);
            }
        })
}

export const setTimer = (game_id: number, offset: number) => {
    return new Promise((resolve: (result: Game[]) => void, reject: (error) => void) => {
        pool.query("UPDATE game SET time = UNIX_TIMESTAMP(NOW()) + ? WHERE id = ?",
            [offset, game_id])
            .then((result: any) => resolve(result))
            .catch(error => reject(error));
    });
}

export const endRound = (game_id: number) => {
    return new Promise((resolve: (result) => void, reject: (error) => void) => {
        pool.query(`SELECT * FROM pair WHERE game_id = ? 
AND round_id = (SELECT max(id) FROM round WHERE game_id = ?)`,
            [game_id, game_id])
            .then((result: any) => {
                let update_data = [];
                result[0].map(pair => {
                    update_data.push({
                        game_id: game_id,
                        round_id: pair.round_id,
                        pair_id: pair.id,
                        winner: WinRules[pair.player1_move][pair.player2_move] as 0 | 1 | 2 | 3
                    });
                });
                setWinners(update_data)
                    .then(
                        result => setTimer(game_id, 5).then(result => resolve(result))
                    )
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    });
}

export const setRoundState = (state: Round['state'], game_id: number, round_id: number) => {
    return new Promise((resolve: (result) => void, reject: (error) => void) => {
        pool.query("UPDATE round SET state = ? WHERE game_id = ? AND id = ?",
            [state, game_id, round_id])
            .then((result: any) => resolve(result))
            .catch(error => reject(error));
    });
}

export const changeRoundState = (game_id: number) => {
    return new Promise((resolve: (result) => void, reject: (error) => void) => {
        getLastRound(game_id)
            .then(round => {
                switch(round.state) {
                    case 1:
                        setRoundState(2, game_id, round.id)
                            .then(result =>
                                endRound(game_id)
                                    .then(result => resolve(result))
                                    .catch(error => reject(error)))
                            .catch(error => reject(error))
                        break
                    case 2:
                        setRoundState(3, game_id, round.id)
                            .then(result =>
                                startRound(game_id)
                                    .then(result => resolve(result))
                                    .catch(error => reject(error)))
                            .catch(error => reject(error))
                        break
                }
            })
            .catch(error => reject(error))
    });
}

export const getPlayers = (game_id: number) => {
    return new Promise((resolve: (result: {players: PlayerWithToken[], round?: RoundFromDB}) => void, reject: (error) => void) => {
        getLastRound(game_id)
            .then(round => {
                pool.execute(`SELECT * FROM player WHERE game_id = :game_id AND (
token IN (SELECT player1 FROM pair WHERE (winner = 1 OR winner = 3) AND game_id = :game_id AND round_id = :round_id)
OR 
token IN (SELECT player2 FROM pair WHERE (winner = 2 OR winner = 3) AND game_id = :game_id AND round_id = :round_id))`,
                    {game_id: game_id, round_id: round.id})
                    .then((result: any) => resolve({players: result[0], round: round}))
                    .catch(error => reject(error));
            })
            .catch(error => {
                pool.query("SELECT * FROM player WHERE game_id = :game_id",
                    {game_id: game_id})
                    .then((result: any) => resolve({players: result[0]}))
                    .catch(error => reject(error));
            })
    })
}

export const createRound = (game_id: number, round_id: number) => {
    return new Promise((resolve: (result) => void, reject: (error) => void) => {
        pool.execute(`INSERT INTO round(id, game_id) VALUES(:round_id, :game_id)`,
                    {game_id: game_id, round_id: round_id})
            .then((result: any) => resolve(result))
            .catch(error => reject(error));
    })
}

export const startRound = (game_id: number) => {
    return new Promise((resolve: (result) => void, reject: (error) => void) => {
        getPlayers(game_id).then(
            result => {
                let players = result.players;

                if (players.length <= 1) {
                    return resolve(result.players.length);
                }

                let round_id = result.round ? result.round.id + 1 : 0;
                createRound(game_id, round_id)
                    .then(result => {
                        let offset = Math.floor(Math.random() * players.length);

                        let pairs = [];
                        for (let i = 0; i < players.length - 1; i += 2) {
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

                        pool.query(`INSERT INTO pair(id, round_id, game_id, player1, player2)
VALUES (?)`, pairs)
                            .then((result: any) =>
                                setTimer(game_id, 30)
                                    .then(result => resolve(result))
                                    .catch(error => reject(error)))
                            .catch(error => reject(error));
                    })
                    .catch(error => reject(error));
            }
        ).catch(
            error => reject(error)
        )
    });
}