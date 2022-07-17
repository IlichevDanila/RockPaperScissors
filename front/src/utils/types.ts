
export type PlayerToken = string;

export interface Player {
    //token: string;
    nickname: string;
}

export interface Pair {
    player1: Player;
    player2: Player;
    player1_move: 0 | 1 | 2 | 3;
    player2_move: 0 | 1 | 2 | 3;
    winner: 0 | 1 | 2 | 3;
}

export interface Round {
    pairs: Pair[];
    state: 1 | 2 | 3;
}

interface _Game {
    id: string;
    count: number;
    players: Player[];
    time: number;
}

export interface GameWithRounds extends _Game {
    rounds: Round[];
}

export interface GameWithoutRounds extends _Game {
    move: 0 | 1 | 2 | 3;
}

export type Game = GameWithRounds | GameWithoutRounds;



export interface StatusLoading {
    state: 'loading';
}

export interface StatusWaitingForStart {
    state: 'waiting_for_start';
    game: GameWithRounds;
}

export interface StatusWaitingForMove {
    state: 'waiting_for_move';
    game: GameWithoutRounds;
}

export interface StatusWaitingForRoundStart {
    state: 'waiting_for_round_start';
    game: GameWithRounds;
}

export interface StatusLose {
    state: 'lose';
    game: GameWithRounds;
}

export interface StatusEnd {
    state: 'end';
    game: GameWithRounds;
}

export type StatusType = StatusLoading
    | StatusWaitingForStart
    | StatusWaitingForMove
    | StatusWaitingForRoundStart
    | StatusLose
    | StatusEnd;