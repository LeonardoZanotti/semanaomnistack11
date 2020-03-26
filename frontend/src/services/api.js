import axios from 'axios';      // importa axios que é pra fazer conexão http backend-frontend

const api = axios.create({          // função da framework axios
    baseURL: 'http://localhost:3333/',   // parte da URL que se repete em todos as rotas numa variável
});

export default api;     // exporta a api()