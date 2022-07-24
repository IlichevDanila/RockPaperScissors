import axios from "axios";
import Constants from "../utils/constants";

const configDefault = {
    headers: {
        Accept: 'application/json',
    },
    timeout: 65000
}

const Get = (url: string, data: any) =>
    axios.get(Constants.api_host + '/' + url + (data ? '?' + Object.keys(data).map(key => key + '=' + data[key]).join('&') : ''), configDefault);

export default Get;