import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://diet-app-c8504-default-rtdb.firebaseio.com/'
});

export default instance;