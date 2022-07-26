import React, {useEffect, useState} from 'react';
import Move from "../api/move";
import styled, {keyframes} from "styled-components";
import {Game, PlayerToken, StatusWaitingForMove} from "../utils/types";
import {Paper, Rock, Scissors} from "../utils/icons";
import Timer from "./timer";

const Container = styled.div`
  text-align: center;
`;

const MOVES = {
    0: 'nothing',
    1: 'rock',
    2: 'scissors',
    3: 'paper'
};

const MovesContainer = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-auto-flow: column;
  padding: 20px 10px;
  justify-content: space-around;
  fill: black;
  
  &.rock > div.rock, &.paper > div.paper, &.scissors > div.scissors {
    background: black;
    fill: white;
    border-color: white;
  }
`;

const MoveButtonHoverAnimation = keyframes`
  0% {
    top: 0px;
    left: 0px;
  }
  20% {
    top: -2px;
    left: 0px;
  }
  40% {
    top: 0px;
    left: -2px;
  }
  60% {
    top: -2px;
    left: 2px;
  }
  80% {
    top: 2px;
    left: -2px;
  }
  100% {
    top: 0px;
    left: 0px;
  }
`

const MoveButton = styled.div`
  //border: 3px dashed black;
  background: white;
  padding: 2px 10px;
  border-radius: 8px;
  cursor: pointer;
  width: min-content;
  
  & svg {
    width: 60px;
    height: 60px;
    transform: rotate(-90deg);
    position: relative;
  }
  
  &.sent svg {
    animation: 0.2s ${MoveButtonHoverAnimation} ease-out infinite;
  }
`;

const WaitingForMove = (props: {status: StatusWaitingForMove, id: Game['id'], token: PlayerToken}) => {

    let {status, id, token} = props;
    const [sentMove, setSentMove] = useState(0);
    const move_ = (move: 1 | 2 | 3) => {
        setSentMove(move);
        Move(id, token, move)
            .then(result => {
                setSentMove(0)
            })
            .catch(error => {
                setSentMove(0)
        })
    }

    return (
        <Container>
            ожидание вашего хода:
            <MovesContainer className={MOVES[status.game.move]}>
                <MoveButton className={'rock' + (sentMove == 1 ? ' sent' : '')} onClick={() => move_(1)}>
                    <Rock />
                </MoveButton>
                <MoveButton className={'scissors' + (sentMove == 2 ? ' sent' : '')} onClick={() => move_(2)}>
                    <Scissors />
                </MoveButton>
                <MoveButton className={'paper' + (sentMove == 3 ? ' sent' : '')} onClick={() => move_(3)}>
                    <Paper />
                </MoveButton>
            </MovesContainer>
            осталось секунд: <Timer timestamp={status.game.time}></Timer>
        </Container>
    );
};

export default WaitingForMove;