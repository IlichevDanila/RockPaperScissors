import React, {useEffect, useState} from 'react';
import Status from "../api/status";
import Loading from "../components/loading";
import WaitingForStart from "../components/waiting_for_start";
import WaitingForMove from "../components/waiting_for_move";
import WaitingForRoundStart from "../components/waiting_for_round_start";
import Lose from "../components/lose";
import End from "../components/end";
import Sign from "../components/sign";
import styled from "styled-components";
import {GameWithoutRounds, Player, StatusType} from "../utils/types";

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  position: fixed;
  height: 100%;
  width: 100%;
  align-content: center;
  justify-content: center;
  justify-items: center;
`;

const INTERFACES:any = {
    'loading': Loading,
    'waiting_for_start': WaitingForStart,
    'waiting_for_move': WaitingForMove,
    'waiting_for_round_start': WaitingForRoundStart,
    'lose': Lose,
    'end': End
};

const Game = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id") as string;
    const token = queryParams.get("token") as string;

    let [status, setStatus] = useState<StatusType>({state: 'loading'});

    const updateStatus = () => {
        Status(id, token)
            .then((resp) => {
                setStatus(resp.data as StatusType);

                /*setStatus({
                    state: 'waiting_for_move',
                    game: {
                        id: '123',
                        count: 2,
                        players: [],
                        time: 45,
                        move: 1
                    }
                });*/
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => { updateStatus(); setInterval(updateStatus, 1000) }, []);

    let Interface = INTERFACES[status.state] ? INTERFACES[status.state] : INTERFACES['loading'];

    return (
        <Container>
            <Sign status={status} id={id} token={token} />
            <Interface status={status} id={id} token={token}></Interface>
        </Container>
    )
};

export default Game;