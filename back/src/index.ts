import express from 'express';
import {
    games,
    GetCountToStart,
    GetGameById,
    GetGameWithoutRounds,
    GetLastRound,
    GetPairByPlayer, SetRoundState,
    StartRound
} from "./functions";
import {PORT} from "./constants";
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/create_game', (req, res) => {
    let countString = req.query.count.toString();
    if(!/^[1-9]\d*$/.test(countString) || parseInt(countString) < 2)
    {
        res.send({error: 'Count must be integer not less than 2'});
        return;
    }

    let id = games.length.toString();
    games.push({id: id, count: parseInt(countString), players: [], rounds: [], time: 0});

    res.send({id: id});
});

app.get('/connect', (req, res) => {
    let idString = req.query.id.toString();
    if(!/^[A-z0-9]+$/.test(idString))
    {
        res.send({error: 'Count must be integer not less than 2'});
        return;
    }

    let nickname = req.query.nickname.toString();
    if(!/^[A-z0-9А-яЁё]+$/.test(nickname))
    {
        res.send({error: 'Nickname must include only letters or numbers'});
        return;
    }

    let game = GetGameById(idString);

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
    game.players.push({nickname: nickname, token: token.toString()});

    if (GetCountToStart(game) == 0) {
        StartRound(game);
    }

    res.send({token: token});
});

app.get('/status', (req, res) => {
    let game = GetGameById(req.query.id.toString());

    if(!game)
    {
        res.send({error: 'Id must be not negative integer'});
        return;
    }

    let tokenString = req.query.token.toString();
    if(!/^\d+$/.test(tokenString) || parseInt(tokenString) >= game.count)
    {
        res.send({error: 'token must be integer less than players count'});
        return;
    }

    let count_to_start = GetCountToStart(game);
    if(count_to_start > 0)
    {
        res.send({state: "waiting_for_start", game: game});
        return;
    }

    let round = GetLastRound(game);
    if(round.state == 1)
    {
        let pair = GetPairByPlayer(round, tokenString);
        if(pair)
        {
            res.send({state: 'waiting_for_move', game: GetGameWithoutRounds(game, tokenString, pair)});
            return;
        }
        else {
            res.send({state: 'lose', game: GetGameWithoutRounds(game, tokenString, pair)});
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

    let game = GetGameById(req.query.id.toString());
    if(!game)
    {
        res.send({error: 'Id must be not negative integer'});
        return;
    }

    let tokenString = req.query.token.toString();
    if(!/^\d+$/.test(tokenString) || parseInt(tokenString) >= game.count)
    {
        res.send({error: 'token must be integer less than players count'});
        return;
    }

    let round = GetLastRound(game);
    let pair = GetPairByPlayer(round, tokenString);
    if(!pair)
    {
        res.send({result: 'error', desc: 'lose'});
    }

    let move = parseInt(req.query.move.toString()) as 1 | 2 | 3;
    if(pair.player1.token == tokenString)
    {
        pair.player1_move = move;
    }
    else
    {
        pair.player2_move = move;
    }

    res.send({result: 'Ok'});
});

setInterval(() => {
    games.map((game) => {
        if (game.rounds.length > 0) {
            game.time -= 1;

            SetRoundState(game);
        }
    });
}, 1000);

app.listen(PORT);