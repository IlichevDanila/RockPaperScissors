import React from 'react';

const WaitingForStart = (props) => {
    let {status, id, token} = props;
    return (
        <div>
            ожидание игроков: {status.game.players.length} / {status.game.count}
        </div>
    );
};

export default WaitingForStart;