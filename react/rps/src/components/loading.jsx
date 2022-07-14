import React from 'react';

const Loading = (props) => {
    let {status, id, token} = props;
    return (
        <div>
            Загрузка...
        </div>
    );
};

export default Loading;