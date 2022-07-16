import React from 'react';
import Round_result from "./round_result";
import {Game, Player, StatusWaitingForRoundStart} from "../utils/types";

const WaitingForRoundStart = (props: {status: StatusWaitingForRoundStart, id: Game['id'], token: Player['token']}) => {

    let {status, id, token} = props;

    return (
        <div>
            <Round_result status={status} id={id} token={token} />
            <br /><br />
            следующий раунд через {status.game.time} секунд(ы)
        </div>
    );
};

export default WaitingForRoundStart;