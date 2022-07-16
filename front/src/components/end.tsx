import React from 'react';
import styled from "styled-components";
import {Game, Pair, Player, StatusEnd} from "../utils/types";

const EndStyle = styled.div`
  text-align: center;
  
  & span {
    font-weight: 700;
  }
`;

const End = (props: {status: StatusEnd, id: Game['id'], token: Player['token']}) => {

    let {status, id, token} = props;

    let pair = status.game.rounds[status.game.rounds.length - 1].pairs
        .find((pair) => pair.player1_move != 0 || pair.player2_move != 0) as Pair;

    let winner_nickname = '';
    switch (pair.winner)
    {
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

    return (
        <EndStyle>
            игра завершена
            <br /><br />
            победитель: игрок с ником <span>{winner_nickname}</span>
        </EndStyle>
    );
};

export default End;