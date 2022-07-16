import Get from "./get";
import {Game, Player} from "../utils/types";

const Move = (id: Game['id'], token: Player['token'], move: 1 | 2 | 3) => {
    return Get('move', {id: id, token: token, move: move});
}

export default Move;