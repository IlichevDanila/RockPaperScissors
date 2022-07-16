import React from 'react';
import styled from "styled-components";
import {Game, Player, StatusLose, StatusWaitingForRoundStart} from "../utils/types";

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

const RoundResult = (props: {status: StatusWaitingForRoundStart | StatusLose, id: Game['id'], token: Player['token']}) => {
    let {status, id, token} = props;

    return (
        <RoundResultStyle>
            результаты раунда:
            <br /><br/>
            <ResultTable>
                {status.game.rounds[status.game.rounds.length - 1].pairs.map((pair, i) => {
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
                    return <div key={i}>
                        <PlayerToken>{pair.player1.nickname}</PlayerToken>
                        -
                        <PlayerToken>{pair.player2.nickname}</PlayerToken>
                        :
                        <PlayerTokenWinner>{winner_nickname}</PlayerTokenWinner></div>
                })}
            </ResultTable>
        </RoundResultStyle>
    );
};

export default RoundResult;