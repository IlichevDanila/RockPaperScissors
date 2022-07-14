import Get from "./get";

const CreateGame = (count) => {
    return Get('create_game', {count: count});
}

export default CreateGame;