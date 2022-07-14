import React from 'react';
import styled from "styled-components";

const RoundResultStyle = styled.div`
  text-align: center;
`;

const ResultTable = styled.div`
  border: 3px #ddd dashed;
  border-radius: 10px;
  display: grid;
  grid-gap: 4px;
  padding: 4px 0;
`;

const PlayerToken = styled.span`
  background: #ddd;
  padding: 0px 10px;
  margin: 10px;
  border-radius: 5px;
`;

const PlayerTokenWinner = styled(PlayerToken)`
  background: #f3ff67;
`;

const RoundResult = (props) => {
    let {status, id, token} = props;

    return (
        <RoundResultStyle>
            результаты раунда:
            <br /><br/>
            <ResultTable>
                {status.game.rounds[status.game.rounds.length - 1].pairs.map((pair, i) => {
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
                    return <div key={i}>
                        <PlayerToken>{pair.player1}</PlayerToken>
                        -
                        <PlayerToken>{pair.player2}</PlayerToken>
                        :
                        <PlayerTokenWinner>{winner_token}</PlayerTokenWinner></div>
                })}
            </ResultTable>
        </RoundResultStyle>
    );
};

export default RoundResult;