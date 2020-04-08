const app = require ("express")();   
const bodyParser = require('body-parser');
const buscaResourceId = require('./rotas/cadastro/buscaResourceId');
const cadastrarProduto = require('./rotas/cadastro/cadastroProduto');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//iniciando servidor
app.listen(3000, () => {
console.log("API Rodando...");
});

//chamando as rotas
app.use("/api", buscaResourceId);
app.use("/api", cadastrarProduto);

