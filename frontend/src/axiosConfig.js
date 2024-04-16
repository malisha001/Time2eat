const axios = require('axios');

axios.defaults.baseURL = 
 process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : '/';
