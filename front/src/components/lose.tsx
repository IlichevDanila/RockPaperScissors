import React from 'react';
import Round_result from "./round_result";
import {Game, Player, StatusLose} from "../utils/types";

const Lose = (props: {status: StatusLose, id: Game['id'], token: Player['token']}) => {
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