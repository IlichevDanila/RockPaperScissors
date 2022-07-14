import Get from "./get";

const Move = (id, token, move) => {
    return Get('move', {id: id, token: token, move: move});
}

export default Move;