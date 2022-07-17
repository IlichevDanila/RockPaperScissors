import React from 'react';
import styled from "styled-components";
import {Game, PlayerToken, StatusType} from "../utils/types";
import Button from "./form/button";

const SignContainer = styled.div`
  display: grid;
  gap: 10px;
`;

const SignStyle = styled.div`
  border: 4px double white;
  padding: 4px 20px;
  background: #ddd;
  border-radius: 10px;
  text-align: center;
  
  & span {
    font-weight: 700;
  }
`;

const Line = styled.div`
  height: 2px;
  width: 80%;
  position: relative;
  left: 10%;
  background: #777;
  margin: 4px;
`;

const Sign = (props: {status: StatusType, id: Game['id'], token: PlayerToken}) => {

    const toMain = () => {
        window.open('/', '_self');
    }

    return (
        <SignContainer>
            <Button onClick={toMain}>На главную</Button>
            <SignStyle>
            ID игры: <span>{props.id}</span>
            <Line />
            Ник: <span>{props.token}</span>
        </SignStyle>
    </SignContainer>)
}

export default Sign;