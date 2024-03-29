import styled from "styled-components";
import {useState} from "react";
import CreateGame from "../api/create_game";
import Connect from "../api/connect";
import {Game} from "../utils/types";
import Input from "../components/form/input";
import Button from "../components/form/button";

const MainStyled = styled.div`
	display: grid;
	grid-gap: 20px;
	position: fixed;
	height: 100%;
	width: calc(100% - 20px);
	align-content: center;
	margin: 0 10px;
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

const ErrorContainer = styled.div`
	color: red;
	text-align: center;
`;

function Main() {

	let [pos, setPos] = useState(0);
	let [count, setCount] = useState('');
	let [id, setId] = useState('');
	let [nickname, setNickname] = useState('');
	let [error, setError] = useState<string | null>(null);

	const switcher = () => {
		setPos(1 - pos);
	};

	const connect_ = (id: Game['id']) => {
		setError(null);
		Connect(id, nickname)
			.then(resp => {
				localStorage.setItem('game' + id.toString(), resp.data.nickname + ':' + resp.data.token);
				window.open('game?id=' + id.toString(), '_self')
			})
			.catch(error => {
				if (error.response && error.response.data) {
					let errorText = error.response.data.error;
					if (errorText) {
						switch (errorText) {
							case 'Max players count':
								setError('Достигнуто максимальное количество игроков')
								break;
							case 'Nickname is already used':
								setError('Никнейм занят')
								break;
							case 'Game do not exist':
								setError('Игры с таким id не существует')
								break;
							default:
								break;
						}
					}
				}
				console.log(error)
			});
	}

	const createGame = () => {
		if (/^\d+$/.test(count) && parseInt(count)) {
			CreateGame(parseInt(count))
				.then(resp => connect_(resp.data.id))
				.catch(error => console.log(error));
		}
	}

	const connect = () => {
		if (/^\d+$/.test(id)) {
			connect_(id);
		}
	}

	const errorCount = () => {
		return !((/^[1-9]\d*$/.test(count) && parseInt(count) >= 2) || count == '');
	}

	const errorNickname = () => {
		return !(/^[0-9A-zА-яЁё]*$/.test(nickname));
	}

  return (
    <MainStyled>
		{error ?
			<ErrorContainer>{error}</ErrorContainer>
			: null
		}
		<NicknameContainer>
			<Input type="text" placeholder="Ник"
				   className={errorNickname() ? 'error' : ''}
				   onInput={
					   (event: any) => {
						   setNickname(event.target.value);
					   }
				   }
			/>
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
				<Input type="text" placeholder="Число игроков"
					   className={errorCount() ? 'error' : ''}
					   onInput={
						   (event: any) => {
							   setCount(event.target.value);
						   }
					   }
				/>
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