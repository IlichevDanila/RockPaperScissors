import Get from "./get";
import {Game, PlayerToken} from "../utils/types";

const Move = (id: Game['id'], token: PlayerToken, move: 1 | 2 | 3) => {
    return Get('move', {id: id, token: token, move: move});
}

export default Move;