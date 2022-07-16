import React from 'react';
import {Game, Player, StatusLoading} from "../utils/types";

const Loading = (props: {status: StatusLoading, id: Game['id'], token: Player['token']}) => {
    let {status, id, token} = props;
    return (
        <div>
            Загрузка...
        </div>
    );
};

export default Loading;