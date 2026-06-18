const axios = require('axios');
const API = axios.create({ baseURL: 'https://test.com' });
console.log("defaults.baseURL:", API.defaults.baseURL);
