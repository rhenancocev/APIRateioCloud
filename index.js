const app = require ("express")();   
const bodyParser = require('body-parser');
const portaServidorNode = require ('../APIRateioCloud/.env')

const telaCadastroRouter = require('./src/routes/telaCadastroRouter');
const telaConsultaRouter = require('./src/routes/telaConsultaRouter')

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//iniciando servidor
app.listen(portaServidorNode.PORTA_SERVIDOR_NODE, () => {
console.log("API Rodando...");
});

//chamando as rotas
app.use('/api/cadastro',telaCadastroRouter);
app.use('/api/consulta', telaConsultaRouter)

