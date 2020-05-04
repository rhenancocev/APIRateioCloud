const app = require ("express")();   
const bodyParser = require('body-parser');
//const portaServidorNode = require ('../APIRateioCloud/.env')

const telaCadastroRouter = require('./src/routes/telaCadastroRouter');
const telaConsultaRouter = require('./src/routes/telaConsultaRouter');
const telaImportExtratoRouter = require('./src/routes/telaImportExtratoRouter');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//iniciando servidor
app.listen(3009, () => {
console.log("API Rodando...");
});

//habilita o CORS
app.use(function (req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, X-acess-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//chamando as rotas
app.use('/api/cadastro',telaCadastroRouter);
app.use('/api/consulta', telaConsultaRouter);
app.use('/api/importcsv', telaImportExtratoRouter);