import styled from "styled-components";
import {useState} from "react";
import CreateGame from "../api/create_game";
import Connect from "../api/connect";
import {Game} from "../utils/types";

const MainStyled = styled.div`
	display: grid;
	grid-gap: 20px;
	position: fixed;
	height: 100%;
	width: 100%;
	align-content: center;
`;

const SwitcherContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	justify-items: center;
	align-items: center;
	grid-gap: 20px;
	grid-auto-columns: 1fr auto 1fr;
	
	& span.left {
		justify-self: right;
	}

	& span.right {
		justify-self: left;
	}
`;

const InterfaceContainer = styled.div`	
	& > div {
		display: grid;
		justify-content: center;
		grid-gap: 12px;
	}
	
	& > div.hide {
		display: none;
	}
`;

const NicknameContainer = styled.div`
	display: grid;
	justify-content: center;
	
	& input {
		width: min-content;
	}
`;

const Switcher = styled.div`
	width: 30px;
	height: 12px;
	border: 2px solid black;
	border-radius: 12px;
	cursor: pointer;
	
	& div {
		width: 10px;
		height: 10px;
		background: black;
		border: 1px solid white;
		border-radius: 10px;
		position: relative;
		left: 0px;
		transition: left 0.2s;
	}
	
	&.right div {
		left: 18px;
	}
`;

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

const Input = styled.input`
	font-size: 20px;
	text-align: center;
	font-family: monospace;
	border: 2px dashed black;
	border-radius: 6px;
`;

function Main() {

	let [pos, setPos] = useState(0);
	let [count, setCount] = useState('');
	let [id, setId] = useState('');
	let [nickname, setNickname] = useState('');

	const switcher = () => {
		setPos(1 - pos);
	};

	const connect_ = (id: Game['id']) => {
		Connect(id, nickname)
			.then(resp => window.open('game?id=' + id + '&token=' + resp.data.token, '_self'))
			.catch(error => console.log(error));
	}

	const createGame = () => {
		if (/^[1-9]\d*$/.test(count)) {
			CreateGame(parseInt(count))
				.then(resp => {
					connect_(resp.data.id);
				})
				.catch(error => console.log(error));
		}
	}

	const connect = () => {
		if (/^\d+$/.test(id)) {
			connect_(id);
		}
	}

  return (
    <MainStyled>
		<NicknameContainer>
			<Input type="text" placeholder="Ник" onInput={
				(event: any) => {
					setNickname(event.target.value);
				}
			}/>
		</NicknameContainer>
    	<SwitcherContainer>
    		<span className={'left'}>Создать игру</span>
	    	<Switcher onClick={switcher} className={pos == 0 ? '' : 'right'}>
	    		<div></div>
	    	</Switcher>
	    	<span className={'right'}>Подключиться к игре</span>
    	</SwitcherContainer>
		<InterfaceContainer>
			<div className={pos == 0 ? 'active' : 'hide'}>
				<Input type="text" placeholder="Число игроков" onInput={
					(event: any) => {
						setCount(event.target.value);
					}
				}/>
				<Button onClick={createGame}>Создать</Button>
			</div>
			<div className={pos == 1 ? 'active' : 'hide'}>
				<Input type="text" placeholder="id игры" onInput={
					(event: any) => {
						setId(event.target.value);
					}
				}/>
				<Button onClick={connect}>Подключиться</Button>
			</div>
		</InterfaceContainer>
    </MainStyled>
  );
}

export default Main;