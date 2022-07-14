import React from 'react';
import styled from "styled-components";

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

const Sign = (props) => {
    return <SignStyle>
        ID игры: <span>{props.id}</span>
        <Line />
        Токен: <span>{props.token}</span>
    </SignStyle>
}

export default Sign;