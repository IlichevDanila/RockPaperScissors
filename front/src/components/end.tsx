import React from 'react';
import styled from "styled-components";
import {Game, Pair, PlayerToken, StatusEnd} from "../utils/types";

const EndStyle = styled.div`
  text-align: center;
  
  & span {
    font-weight: 700;
  }
`;

const End = (props: {status: StatusEnd, id: Game['id'], token: PlayerToken}) => {

    let {status, id, token} = props;

    let pair = status.game.rounds[status.game.rounds.length - 1].pairs
        .find((pair) => pair.player1_move != 0 || pair.player2_move != 0);

    let winner_nickname = '';

    if (pair) {
        switch (pair.winner) {
            case 1:
                winner_nickname = pair.player1.nickname;
                break;
            case 2:
                winner_nickname = pair.player2.nickname;
                break;
            case 3:
                winner_nickname = pair.player1.nickname + ', ' + pair.player2.nickname;
                break;
            case 0:
                winner_nickname = '-';
                break;
        }
    }
    else {
        winner_nickname = '-';
    }

    return (
        <EndStyle>
            игра завершена
            <br /><br />
            победитель: игрок с ником <span>{winner_nickname}</span>
        </EndStyle>
    );
};

export default End;