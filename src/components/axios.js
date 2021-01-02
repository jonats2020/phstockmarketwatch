import axios from "axios";

const instance = axios.create({
    //baseURL: 'http://localhost:9000',
    baseURL: 'http://phisix-api.appspot.com'
});

export default instance;