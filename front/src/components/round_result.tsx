import React from 'react';
import styled from "styled-components";
import {Game, PlayerToken, StatusLose, StatusWaitingForRoundStart} from "../utils/types";

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

const PlayerNickname = styled.span`
  background: #ddd;
  padding: 0px 10px;
  margin: 10px;
  border-radius: 5px;
`;

const PlayerNicknameWinner = styled(PlayerNickname)`
  background: #f3ff67;
`;

const RoundResult = (props: {status: StatusWaitingForRoundStart | StatusLose, id: Game['id'], token: PlayerToken}) => {
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
                        <PlayerNickname>{pair.player1.nickname}</PlayerNickname>
                        -
                        <PlayerNickname>{pair.player2.nickname}</PlayerNickname>
                        :
                        <PlayerNicknameWinner>{winner_nickname}</PlayerNicknameWinner></div>
                })}
            </ResultTable>
        </RoundResultStyle>
    );
};

export default RoundResult;