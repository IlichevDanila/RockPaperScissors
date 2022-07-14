const express = require('express');
const app = express();

/*
app.get('/', (req, res) => {
    res.send({ message: 'Hello WWW!' });
});

create_game(count) => id
connect_user(id) => token
current_status(id, token) => 
	{status: 'waiting_for_start', game: number} // игра не началась
	{status: 'waiting_for_move', game: number} // ожидается ваш ход
	{status: 'lose', game: game}
	{status: 'waiting_for_round_start', game: game} // ожидается начало следующего раунда
	{status: 'end', game: game}
move(id, token, move: R|P|S) => {result: ok} | {result: error, desc: 'time ended'}


interface Pair {
	player1: string;
	player2: string;
	player1_move: 0 | 1 | 2 | 3;
	player2_move: 0 | 1 | 2 | 3;
	winner: 0 | 1 | 2;
}

interface Round {
	pairs: Pair[];
	state: 1 | 2 | 3;
}

interface Game {
	id: number;
	count: number;
	players: string[];
	rounds: Round[];
	time: number;
}
*/

var games = [];

function get_pair_by_player(round, player)
{
	return round.pairs.find((el) => (el.player1 == player || el.player2 == player));
}

function get_game_by_id(id)
{
	return games.find((el) => el.id == id);
}

function get_count_to_start(game)
{
	return game.count - game.players.length;
}

function get_last_round(game)
{
	return game.rounds[game.rounds.length - 1];
}

function get_pair_state(pair)
{
	if(player1_move != 0 && player2_move != 0)
	{
		return 3;	
	}
	if(player1_move == 0 && player2_move != 0)
	{
		return 2;
	}
	else if(player1_move != 0 && player2_move == 0)
	{
		return 1;
	}

	return 0;
}

const win_rules = {
	0: {0: 0, 1: 2, 2: 2, 3: 2},
	1: {0: 1, 1: 3, 2: 1, 3: 2},
	2: {0: 1, 1: 2, 2: 3, 3: 1},
	3: {0: 1, 1: 1, 2: 2, 3: 3}
};

function end_round(game, round) {
	round.pairs.map(pair => {
		pair.winner = win_rules[pair.player1_move][pair.player2_move];
	});
	game.time = 5;
}

function set_round_state_by_time(game)
{
	if(game.time <= 0)
	{
		let round = get_last_round(game);

		if(round.state == 1)
		{
			round.state = 2;
			end_round(game, round);
			return;
		}
		if(round.state == 2)
		{
			round.state = 3;
			start_round(game);
			return;
		}
	}
}

function start_round(game) {
	let players = [];
	if (game.rounds.length > 0) {
		get_last_round(game).pairs.map(pair => {
			switch(pair.winner) {
				case 1:
					players.push(pair.player1);
					break;
				case 2:
					players.push(pair.player2);
					break;
				case 3:
					players.push(pair.player1);
					players.push(pair.player2);
					break;
			}
		});
	}
	else {
		players = game.players;
	}

	if (players.length <= 1) {
		return;
	}

	let pairs = [];
	for (let i = 0; i < players.length - 1; i += 2) {
		pairs.push({
			player1: players[i],
			player2: players[i + 1],
			player1_move: 0,
			player2_move: 0,
			winner: 0
		});
	}
	if (players.length % 2 == 1) {
		pairs.push({
			player1: players[players.length - 1],
			player2: undefined,
			player1_move: 0,
			player2_move: 0,
			winner: 0
		});
	}
	
	game.time = 30;
	game.rounds.push({pairs: pairs, state: 1});
}

function game_without_rounds(game, token, pair) {

	let game_ = {
		id: game.id,
		count: game.count,
		time: game.time,
		players: game.players
	};

	if (pair) {
		if (pair.player1 == token) {
			return {...game_, move: pair.player1_move};
		}
		else {
			return {...game_, move: pair.player2_move};
		}
	}
	else {
		return game_;
	}
}

app.get('/create_game', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	if(!/^[1-9]\d*$/.test(req.query.count) || parseInt(req.query.count) < 2)
	{
		res.send({error: 'Count must be integer not less than 2'});
		return;
	}
	let id = games.length;
	games.push({id: id, count: req.query.count, players: [], rounds: [], time: 0});

	res.send({id: id});
});

app.get('/connect', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let game = get_game_by_id(req.query.id);

	if(!game)
	{
		res.send({error: 'Id must be not negative integer'});
		return;
	}

	if(game.players.length >= game.count)
	{
		res.send({error: 'Max players count'});
		return;
	}

	let token = game.players.length;
	game.players.push(token);

	if (get_count_to_start(game) == 0) {
		start_round(game);
	}

	res.send({token: token});
});

app.get('/status', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let game = get_game_by_id(req.query.id);

	if(!game)
	{
		res.send({error: 'Id must be not negative integer'});
		return;
	}
	if(!/^\d+$/.test(req.query.token) || req.query.token >= game.count)
	{
		res.send({error: 'token must be integer less than players count'});
		return;
	}


	let count_to_start = get_count_to_start(game);
	if(count_to_start > 0)
	{
		res.send({state: "waiting_for_start", game: game});
		return;
	}

	let round = get_last_round(game);
	if(round.state == 1)
	{
		let pair = get_pair_by_player(round, req.query.token);
		if(pair)
		{
			res.send({state: 'waiting_for_move', game: game_without_rounds(game, req.query.token, pair)});
			return;
		}
		else {
			res.send({state: 'lose', game: game_without_rounds(game, req.query.token, pair)});
			return;
		}
	}
	else if(round.state == 2)
	{
		res.send({state: 'waiting_for_round_start', game: game});
		return;
	}
	else
	{
		res.send({state: 'end', game: game});
		return;	
	}
});

app.get('/move', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let game = get_game_by_id(req.query.id);

	if(!game)
	{
		res.send({error: 'Id must be not negative integer'});
		return;
	}
	if(!/^\d+$/.test(req.query.token) || req.query.token >= game.count)
	{
		res.send({error: 'token must be integer less than players count'});
		return;
	}

	let round = get_last_round(game);
	let pair = get_pair_by_player(round, req.query.token);
	if(!pair)
	{
		res.send({result: 'error', desc: 'lose'});
	}

	if(pair.player1 == req.query.token)
	{
		pair.player1_move = req.query.move;
	}
	else
	{
		pair.player2_move = req.query.move;	
	}

	res.send({result: 'Ok'});
});

setInterval(() => {
	games.map((game) => {
		if (game.rounds.length > 0) {
			game.time -= 1;

			set_round_state_by_time(game);
		}
	});
}, 1000);

app.listen(80);