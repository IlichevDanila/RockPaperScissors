import React, {useEffect, useState} from 'react';
import Status from "../api/status";
import Loading from "../components/loading";
import WaitingForStart from "../components/waiting_for_start";
import WaitingForMove from "../components/waiting_for_move";
import WaitingForRoundStart from "../components/waiting_for_round_start";
import Lose from "../components/lose";
import End from "../components/end";
import styled from "styled-components";
import Sign from "../components/sign";

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

const INTERFACES = {
    'loading': Loading,
    'waiting_for_start': WaitingForStart,
    'waiting_for_move': WaitingForMove,
    'waiting_for_round_start': WaitingForRoundStart,
    'lose': Lose,
    'end': End
};

const Game = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const token = queryParams.get("token");

    let [status, setStatus] = useState({state: 'loading'});

    const updateStatus = () => {
        Status(id, token)
            .then((resp) => {
                setStatus(resp.data)
                /*setStatus({state: 'lose', game: {move: 0, time: 19, rounds:
                            [{state: 3, pairs: [
                                {player1: 0, player2: 1, player1_move: 1, player2_move: 2, winner: 1},
                                    {player1: 0, player2: 1, player1_move: 2, player2_move: 1, winner: 2}
                                ]},
                    {state: 2, pairs: [
                        {player1: 0, player2: 1, player1_move: 1, player2_move: 2, winner: 1},
                        {player1: 0, player2: 1, player1_move: 2, player2_move: 1, winner: 2}
                    ]}]}})*/
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => { updateStatus(); setInterval(updateStatus, 1000) }, []);

    let Interface = INTERFACES[status.state] ? INTERFACES[status.state] : INTERFACES['loading'];

    return (
        <Container>
            <Sign id={id} token={token} />
            <Interface status={status} id={id} token={token}></Interface>
        </Container>
    )
};

export default Game;