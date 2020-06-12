//modulo para acessar o banco de dados
const connection = require('../config/connection-middleware');
//modulo para validar erro utilizando a API express-validator
const { validationResult } = require('express-validator');

//contrução das rotas

//rota para buscar um determinado campo com um determinado parametro
exports.lista = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    } else{
        let parametro = req.params.parametro;
        let valor = req.params.valor;

        const sqlQry = 'SELECT * FROM CADASTRO_PRODUTO WHERE ' + parametro + ' = ' + "'" + valor + "'";
        req.connection.query(sqlQry,(err,rows)=>{
            if(err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"});
            }else if(rows.length > 0){
                res.status(200)
                res.json(rows)
            }else{
                res.status(404);
                res.json({"message": "Nenhum produto encontrado com o parametro informado!"})
            }
        })
    }
}

//rota para consultar tudo que tem no banco de dados
exports.listaTudo = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    } else{
        const sqlQry = 'select * from CADASTRO_PRODUTO';
        req.connection.query(sqlQry,(err,rows)=>{
            if(err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"});
            }else if(rows.length > 0){
                res.status(200)
                res.json(rows)
            }else{
                res.status(404);
                res.json({"message": "Nenhum produto encontrado na base de dados!"})
            }
        })
    }
}