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