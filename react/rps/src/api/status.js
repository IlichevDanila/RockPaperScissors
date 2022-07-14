import Get from "./get";

const Status = (id, token) =>
    Get('status', {id: id, token: token});

export default Status;