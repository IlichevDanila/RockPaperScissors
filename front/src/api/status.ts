import Get from "./get";
import {Game, PlayerToken} from "../utils/types";

const Status = (id: Game['id'], token: PlayerToken) =>
    Get('status', {id: id, token: token});

export default Status;