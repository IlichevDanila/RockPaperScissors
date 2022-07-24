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
import {StatusType} from "../utils/types";
import {AxiosError} from "axios";
import StatusSubscribe from "../api/statusSubscribe";

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

    const localStorageString = localStorage.getItem('game' + id?.toString());
    const [nickname, token] = localStorageString ? localStorageString.split(':') : ['', ''];

    let [status, setStatus] = useState<StatusType>({state: 'loading'});

    const updateStatus = ():any => {
        StatusSubscribe(id, token)
            .then((resp) => {
                setStatus(resp.data as StatusType);
                updateStatus();
            })
            .catch((error: AxiosError) => {
                console.log(error);
                if (error.code == 'ECONNABORTED' || error.response?.status == 502) {
                    updateStatus();
                }
                //updateStatus();
            });
    }

    useEffect(() => {
        Status(id, token)
            .then((resp) => {
                setStatus(resp.data as StatusType);
                updateStatus();
            })
            .catch((error: AxiosError) => {
                console.log(error);
                //updateStatus();
            });
    }, []);

    let Interface = INTERFACES[status.state] ? INTERFACES[status.state] : INTERFACES['loading'];

    return (
        <Container>
            <Sign status={status} id={id} nickname={nickname} />
            {
                token
                    ? <Interface status={status} id={id} token={token}></Interface>
                    : <div>Вы не являетесь участником данной игры.</div>
            }
        </Container>
    )
};

export default Game;