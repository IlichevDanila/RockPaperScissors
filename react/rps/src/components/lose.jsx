import React from 'react';
import Round_result from "./round_result";

const Lose = (props) => {
    let {status, id, token} = props;
    return (
        <div>
            вы выбыли из игры
            <br/><br/>
            <Round_result status={status} id={id} token={token} />
        </div>
    );
};

export default Lose;