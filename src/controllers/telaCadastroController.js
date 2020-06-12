//modulo para acessar o banco de dados
const connection = require('../config/connection-middleware');
//modulo para validar erro utilizando a API express-validator
const { validationResult } = require('express-validator');

//contrução das rotas

//rota para verificar se existe o resource_ID digitado na base antes de cadastrar
exports.listarPorId = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    } else{
        let parametro = req.params.resource_id;
        const sqlQry = 'SELECT * FROM CADASTRO_PRODUTO WHERE resource_id = ?';

        req.connection.query(sqlQry,[parametro],(err,rows)=>{
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
        const produto = {}
        produto.resource_id   = req.body.resource_id;
        produto.resource_type = req.body.resource_type;
        produto.resource_name = req.body.resource_name || null;
        produto.projeto       = req.body.projeto || null;
        produto.funcao        = req.body.funcao || null;
        produto.owner_        = req.body.owner_ || null;
        produto.rateio        = req.body.rateio;
        produto.cloud         = req.body.cloud;

        const sqlQry = 'insert into CADASTRO_PRODUTO (resource_id,resource_type,resource_name,projeto,funcao,owner_,rateio,cloud) values (?,?,?,?,?,?,?,?);';

        req.connection.query(sqlQry,[produto.resource_id,produto.resource_type,produto.resource_name,produto.projeto,produto.funcao,produto.owner_,produto.rateio,produto.cloud], (err, result)=>{
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

//rota para deletar um registro a partir de um resource_id
exports.deletarProduto = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else {
        let parametro = req.params.resource_id;
        const sqlQry = 'delete from CADASTRO_PRODUTO where resource_id = ?'

        req.connection.query(sqlQry,[parametro],(err,result) => {
            if (err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"});
            }else if(result.affectedRows > 0){
                res.status(200)
                res.json({"message":"Produto Deletado com Sucesso!"})
            }else{
                res.status(404)
                res.json({"message":"Produto não encontrado"})
            }
        })
    }
}

//rota para fazer um update de um determinado resource_id
exports.alterarProduto = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })
    }else {
        const produto = {}
        produto.resource_id   = req.params.resource_id;
        produto.resource_type = req.body.resource_type;
        produto.resource_name = req.body.resource_name || null;
        produto.projeto       = req.body.projeto || null;
        produto.funcao        = req.body.funcao || null;
        produto.owner_        = req.body.owner_ || null;
        produto.rateio        = req.body.rateio;
        produto.cloud         = req.body.cloud;

        const sqlQry = 'update CADASTRO_PRODUTO set resource_type = ?, resource_name = ?, projeto = ?, funcao = ?, owner_ = ?, rateio = ?, cloud = ? where resource_id = ?'

        req.connection.query(sqlQry, [produto.resource_type, produto.resource_name, produto.projeto, produto.funcao, produto.owner_, produto.rateio, produto.cloud, produto.resource_id], (err,result) =>{
            if(err){
                console.log(err);
                res.status(500)
                res.json({"message":"Internal Server Error"})
            }else if(result.affectedRows > 0){
                res.status(202);
                res.json({"message":"Dados alterados com sucesso!"})
            }else{
                res.status(404)
                res.json({"message":"Nenhuma linha foi alterada"})
            }
        })
    }
}