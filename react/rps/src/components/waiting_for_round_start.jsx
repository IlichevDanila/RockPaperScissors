import React from 'react';
import Round_result from "./round_result";

const WaitingForRoundStart = (props) => {

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