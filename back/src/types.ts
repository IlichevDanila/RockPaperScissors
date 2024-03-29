import {END, LOSE, WAITING_FOR_MOVE, WAITING_FOR_ROUND_START, WAITING_FOR_START} from "./constants";

export interface Player {
    nickname: string;
}

export interface PlayerWithToken extends Player {
    token: string;
}

export interface Pair {
    player1: Player;
    player2: Player;
    player1_move: 0 | 1 | 2 | 3;
    player2_move: 0 | 1 | 2 | 3;
    winner: 0 | 1 | 2 | 3;
}

export interface PairFromDB extends Pair {
    position: 0 | 1;
    id: number;
    round_id: number;
    game_id: number;
}

export interface Round {
    pairs: Pair[];
    state: 1 | 2 | 3;
}

export interface RoundFromDB extends Round {
    id: number;
}

export interface Game {
    id: number;
    count: number;
    time: number;
}

export interface GameWithPlayers extends Game {
    players: Player[];
}

export interface GameWithRounds extends GameWithPlayers {
    rounds: Round[];
}

export interface GameWithMove extends GameWithPlayers {
    move?: 0 | 1 | 2 | 3;
}

export interface setWinnerData {
    game_id: number;
    round_id: number;
    pair_id: number;
    winner: 0 | 1 | 2 | 3
}




export interface StatusWaitingForStart {
    state: typeof WAITING_FOR_START;
    game: GameWithRounds;
}

export interface StatusWaitingForMove {
    state: typeof WAITING_FOR_MOVE;
    game: GameWithMove;
}

export interface StatusWaitingForRoundStart {
    state: typeof WAITING_FOR_ROUND_START;
    game: GameWithRounds;
}

export interface StatusLose {
    state: typeof LOSE;
    game: GameWithRounds;
}

export interface StatusEnd {
    state: typeof END;
    game: GameWithRounds;
}

export type StatusType =
    StatusWaitingForStart
    | StatusWaitingForMove
    | StatusWaitingForRoundStart
    | StatusLose
    | StatusEnd;