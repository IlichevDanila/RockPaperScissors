import React from 'react';
import styled from "styled-components";

const Button = styled.div`
	padding: 4px 20px;
	background: white;
	border: 2px solid black;
	border-radius: 20px;
	cursor: pointer;
	text-align: center;
	transition: all 0.2s;
	user-select: none;
	
	&:hover {
		background: black;
		color: white;
		font-weight: 700;
	}
`;

export default Button;