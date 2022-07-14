import axios from "axios";
import Constants from "../utils/constants";

const configDefault = {
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
    }
}

const Get = (url, data) =>
    axios.get(Constants.api_host + '/' + url + (data ? '?' + Object.keys(data).map(key => key + '=' + data[key]).join('&') : ''), configDefault);


export default Get;