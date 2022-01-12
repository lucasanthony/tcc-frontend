import axios from 'axios'

const api = axios.create({
    baseURL: 'https://reportappcodex.herokuapp.com/',
    headers: {
        "Content-type": "application/json"
    }
});

export default api;