import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

api.interceptors.request.use((config) => {
  console.log(999, config);
  config.params = {
    ...config.params,
    appid: '96f3ef93bbb891eba1491c6c26f87d30',
    lang: 'pt',
    units: 'metric',
  };
  return config;
});

export default api;
