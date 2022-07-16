import React from 'react';
import Move from "../api/move";
import styled from "styled-components";
import {Game, Player, StatusWaitingForMove} from "../utils/types";

const Container = styled.div`
  text-align: center;
  
  & span {
    font-weight: 700;
  }
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
  
  &.rock > div.rock, &.paper > div.paper, &.scissors > div.scissors {
    background: black;
    color: white;
  }
`;

const MoveButton = styled.div`
  border: 2px solid black;
  background: white;
  padding: 2px 10px;
  border-radius: 4px;
  cursor: pointer;
  width: min-content;
  font-size: 32px;
`;

const WaitingForMove = (props: {status: StatusWaitingForMove, id: Game['id'], token: Player['token']}) => {
    let {status, id, token} = props;
    return (
        <Container>
            ожидание вашего хода:
            <MovesContainer className={MOVES[status.game.move]}>
                <MoveButton className={'rock'} onClick={() => Move(id, token, 1)}>К</MoveButton>
                <MoveButton className={'scissors'} onClick={() => Move(id, token, 2)}>Н</MoveButton>
                <MoveButton className={'paper'} onClick={() => Move(id, token, 3)}>Б</MoveButton>
            </MovesContainer>
            осталось секунд: <span>{status.game.time}</span>
        </Container>
    );
};

export default WaitingForMove;