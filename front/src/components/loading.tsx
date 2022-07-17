import React from 'react';
import {Game, PlayerToken, StatusLoading} from "../utils/types";

const Loading = (props: {status: StatusLoading, id: Game['id'], token: PlayerToken}) => {
    let {status, id, token} = props;
    return (
        <div>
            Загрузка...
        </div>
    );
};

export default Loading;