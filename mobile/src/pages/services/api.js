import axios from 'axios';      // importa o axios pra poder ligar backend com mobile

const api = axios.create({  // variável api vai ser a função de criar a conexão lá com o localhost (que é a mesma coisa que o meu ip) com a porta ali
    baseURL: 'http://192.168.0.2:3333/'  // url base que se repete em todas as rotas
});

export default api;     // exportar a api pra fazer a boa