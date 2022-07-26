import {Player} from "./types";

const emptyPlayer = {
    nickname: '[пусто]'
}

export const getPlayer = (player: Player | undefined):Player => {
    return player?.nickname ? player : emptyPlayer;
}