const app = require('./app.js');        // importa o app

app.listen(3333);  // o aplicativo vai ouvir a porta 3333, que pode ser acessada pelo navegador no link: 'localhost:3333'

// fazendo isso, como a gente start a aplicação por aqui, então o localhost vai funcionar e a app vai ficar on
// enquanto a parte de testes n starta aqui, daí a app n fica on no localhost