import {
    GameWithMove,
    GameWithPlayers,
    GameWithRounds,
    PairFromDB,
} from "./types";
import {Response} from "express";

export function sendError(res: Response, error: string) {
    res.status(400);
    res.send({error: error});
}

export function getGameWithMove(game:GameWithPlayers, pair:PairFromDB):GameWithMove
{
    let game_ = {
        id: game.id,
        count: game.count,
        time: game.time,
        players: game.players
    };

    if (pair) {
        if (pair.position == 0) {
            return {...game_, move: pair.player1_move};
        }
        else {
            return {...game_, move: pair.player2_move};
        }
    }
    else {
        return {...game_};
    }
}

export function getGameWithoutLastRound(game:GameWithRounds):GameWithRounds
{
    let game_ = {
        id: game.id,
        count: game.count,
        time: game.time,
        players: game.players
    };

    return {...game_, rounds: game.rounds.slice(0, -1)};
}