import React from 'react';
import {Game, PlayerToken, StatusWaitingForStart} from "../utils/types";

const WaitingForStart = (props: {status: StatusWaitingForStart, id: Game['id'], token: PlayerToken}) => {
    let {status, id, token} = props;
    return (
        <div>
            ожидание игроков: {status.game.players.length} / {status.game.count}
        </div>
    );
};

export default WaitingForStart;