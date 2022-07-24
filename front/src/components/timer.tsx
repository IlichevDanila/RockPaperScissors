import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const TimerStyle = styled.span`
  font-weight: 700;
`;

const Timer = (props: {timestamp: number}) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        setInterval(() => {
            let now = (new Date()).getTime() / 1000;
            setTime(Math.floor(props.timestamp - now));
        }, 1000);
    }, []);

    return (
        <TimerStyle>{time > 0 ? time : 'ожидание'}</TimerStyle>
    );
};

export default Timer;