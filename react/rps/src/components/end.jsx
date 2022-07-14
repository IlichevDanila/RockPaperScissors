import React from 'react';
import styled from "styled-components";

const EndStyle = styled.div`
  text-align: center;
  
  & span {
    font-weight: 700;
  }
`;

const End = (props) => {

    let {status, id, token} = props;

    let pair = status.game.rounds[status.game.rounds.length - 1].pairs
        .find((pair) => pair.player1_move != 0 || pair.player2_move != 0);

    let winner_token = '';
    switch (pair.winner)
    {
        case 1:
            winner_token = pair.player1;
            break;
        case 2:
            winner_token = pair.player2;
            break;
        case 3:
            winner_token = pair.player1 + ', ' + pair.player2;
            break;
        case 0:
            winner_token = '-';
            break;
    }

    return (
        <EndStyle>
            игра завершена
            <br /><br />
            победитель: игрок с токеном <span>{winner_token}</span>
        </EndStyle>
    );
};

export default End;