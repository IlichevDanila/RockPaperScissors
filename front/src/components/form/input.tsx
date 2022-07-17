import React from 'react';
import styled from "styled-components";

const Input = styled.input`
  font-size: 20px;
  text-align: center;
  font-family: monospace;
  border: 2px dashed black;
  border-radius: 6px;
  
  &.error {
    border-color: red;
  }
`;

export default Input;