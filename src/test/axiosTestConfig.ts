import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5173', // Replace with your server URL
});

export default instance;
