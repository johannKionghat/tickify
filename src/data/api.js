import axios from 'axios';

// Exemple de stockage du token
const token = 'fffae13bffd858e71041c65bdf304be023b6bb2e';
localStorage.setItem('token', token);

const API_BASE_URL = 'https://greenvelvet.alwaysdata.net/pfc';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export default api;