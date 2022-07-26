import React from 'react';
import Round_result from "./round_result";
import {Game, PlayerToken, StatusWaitingForRoundStart} from "../utils/types";
import Timer from "./timer";

const WaitingForRoundStart = (props: {status: StatusWaitingForRoundStart, id: Game['id'], token: PlayerToken}) => {

    let {status, id, token} = props;

    return (
        <div>
            <Round_result status={status} id={id} token={token} />
            <br /><br />
            следующий раунд через <Timer timestamp={status.game.time} /> секунд(ы)
        </div>
    );
};

export default WaitingForRoundStart;