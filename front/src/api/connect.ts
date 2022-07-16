import Get from "./get";
import {Game, Player} from "../utils/types";

const Connect = (id: Game['id'], nickname: Player['nickname']) =>
    Get('connect', {id: id, nickname: nickname});

export default Connect;