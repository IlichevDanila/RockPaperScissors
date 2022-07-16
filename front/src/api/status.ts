import Get from "./get";
import {Game, Player} from "../utils/types";

const Status = (id: Game['id'], token: Player['token']) =>
    Get('status', {id: id, token: token});

export default Status;