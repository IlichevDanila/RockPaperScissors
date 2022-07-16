import Get from "./get";
import {Game} from "../utils/types";

const CreateGame = (count: Game['count']) => {
    return Get('create_game', {count: count});
}

export default CreateGame;