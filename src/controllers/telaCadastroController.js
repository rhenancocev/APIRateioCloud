//modulo para acessar o banco de dados
const connection = require('../config/conexaoBanco');
//modulo para validar erro utilizando a API express-validator
const { validationResult } = require('express-validator');

//contrução das rotas

//rota para verificar se existe o resource_ID digitado na base antes de cadastrar
exports.listarPorId = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    } else{
        let parametro = '';
        parametro = req.params.resource_id;
        const sqlQry = 'SELECT * FROM cadastro_produto WHERE resource_id = ?';

        connection.query(sqlQry,[parametro],(err,rows)=>{
            if(err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"});
            }else if(rows.length > 0){
                res.status(200)
                res.json(rows[0])
            }else{
                res.status(404);
                res.json({"message": "Nenhum produto encontrado com o resource_id informado!"})
            }
        })
    }
}

//rota para inserir os dados que vem da tela de cadastro no banco de dados
exports.cadastroProduto = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else{
        const resource_id   = req.body.resource_id;
        const resource_type = req.body.resource_type;
        const resource_name = req.body.resource_name;
        const projeto       = req.body.projeto;
        const funcao        = req.body.funcao;
        const owner_        = req.body.owner_;
        const rateio        = req.body.rateio;
        const sqlQry = 'insert into cadastro_produto (resource_id,resource_type,resource_name,projeto,funcao,owner_,rateio) values (?,?,?,?,?,?,?);';

        connection.query(sqlQry,[resource_id,resource_type,resource_name,projeto,funcao,owner_,rateio], (err, result)=>{
            if(err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"})
            }else{
                res.status(201)
                res.json({"message": result.insertId + " - Dados inseridos com sucesso!"})
            }
        })
    }
}



