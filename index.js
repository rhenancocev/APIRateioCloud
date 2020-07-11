const app = require ("express")();   
const bodyParser = require('body-parser');
const connectionMiddleware = require ('./src/config/connection-middleware');

//telas
const telaCadastroRouter        = require('./src/routes/telaCadastroRouter');
const telaConsultaRouter        = require('./src/routes/telaConsultaRouter');
const telaImportExtratoRouter   = require('./src/routes/telaImportExtratoRouter');
const telaDashboardRouter       = require ('./src/routes/telaDashboardRouter');
const telaReplicaDadosHistRouter = require('./src/routes/telaReplicaDadosHistRouter');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ limit: '100mb',extended: true }));
app.use(bodyParser.json({limit: '100mb', extended: true}));

// ativando nosso middleware
app.use(connectionMiddleware());

// middleware de tratamento de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
	res.status(500).json({ error: err.toString() });
});


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
app.use('/api/dashboard', telaDashboardRouter);
app.use('/api/replica', telaReplicaDadosHistRouter)

module.exports = app;