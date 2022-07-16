export interface Player {
    token: string;
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

export interface Game {
    id: string;
    count: number;
    players: Player[];
    rounds: Round[];
    time: number;
}

export interface GameWithoutRounds {
    id: string;
    count: number;
    players: Player[];
    time: number;
    move?: 0 | 1 | 2 | 3;
}