import Get from "./get";
import {Game, PlayerToken} from "../utils/types";

const StatusSubscribe = (id: Game['id'], token: PlayerToken) =>
    Get('statusSubscribe', {id: id, token: token});

export default StatusSubscribe;