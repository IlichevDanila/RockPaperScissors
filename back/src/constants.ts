
export const WinRules = {
    0: {0: 0, 1: 2, 2: 2, 3: 2},
    1: {0: 1, 1: 3, 2: 1, 3: 2},
    2: {0: 1, 1: 2, 2: 3, 3: 1},
    3: {0: 1, 1: 1, 2: 2, 3: 3}
};

export const PORT = 3000;
export const DB = {
    user: 'root',
    password: 'spitintoeternity1572080'
}

export const WAITING_FOR_START = 'waiting_for_start';
export const WAITING_FOR_MOVE = 'waiting_for_move';
export const LOSE = 'lose';
export const WAITING_FOR_ROUND_START = 'waiting_for_round_start';
export const END = 'end';

export const STATUS_NUMBER = {
    waiting_for_start: 1,
    waiting_for_move: 2,
    lose: 3,
    waiting_for_round_start: 4,
    end: 5
}