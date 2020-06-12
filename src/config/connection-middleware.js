const pooll = require('./pool-factory')
// o módulo depenende de um pool de conexões
module.exports = pool => (req, res, next) => {

    pooll.getConnection((err, connection) => {
        if(err) return next(err);
        console.log('pool => obteve conexão');
        // adicionou a conexão na requisição
        req.connection = connection;
        // passa a requisição o próximo middleware
        next();
        // devolve a conexão para o pool no final da resposta
        res.on('finish', () => req.connection.release());
    });
};