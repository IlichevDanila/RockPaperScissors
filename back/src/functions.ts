import {Game, GameWithoutRounds, Pair, Player, Round} from "./types";
import {WinRules} from "./constants";

export let games:Game[] = [];

export function GetPairByPlayer(round: Round, player_token: Player['token']):Pair|undefined
{
    return round.pairs.find((el) => (el.player1.token == player_token || el.player2.token == player_token));
}

export function GetGameById(key: Game['id']):Game|undefined
{
    return games.find((el) => el.id == key);
}

export function GetCountToStart(game: Game):number
{
    return game.count - game.players.length;
}

export function GetLastRound(game: Game):Round
{
    return game.rounds[game.rounds.length - 1];
}

export function EndRound(game: Game, round: Round):void
{
    round.pairs.map(pair => {
        pair.winner = WinRules[pair.player1_move][pair.player2_move] as 0 | 1 | 2 | 3;
    });
    game.time = 5;
}

export function SetRoundState(game: Game):void
{
    if(game.time <= 0)
    {
        let round = GetLastRound(game);

        if(round.state == 1)
        {
            round.state = 2;
            EndRound(game, round);
            return;
        }
        if(round.state == 2)
        {
            round.state = 3;
            StartRound(game);
            return;
        }
    }
}

export function StartRound(game: Game):void
{
    let players = [];
    if (game.rounds.length > 0) {
        GetLastRound(game).pairs.map(pair => {
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

export function GetGameWithoutRounds(game:Game, player_token:Player['token'], pair:Pair):GameWithoutRounds
{
    let game_ = {
        id: game.id,
        count: game.count,
        time: game.time,
        players: game.players
    };

    if (pair) {
        if (pair.player1.token == player_token) {
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