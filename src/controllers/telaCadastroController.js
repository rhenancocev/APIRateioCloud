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
        const produto = {}
        produto.resource_id   = req.body.resource_id;
        produto.resource_type = req.body.resource_type;
        produto.resource_name = req.body.resource_name;
        produto.projeto       = req.body.projeto;
        produto.funcao        = req.body.funcao;
        produto.owner_        = req.body.owner_;
        produto.rateio        = req.body.rateio;

        const sqlQry = 'insert into cadastro_produto (resource_id,resource_type,resource_name,projeto,funcao,owner_,rateio) values (?,?,?,?,?,?,?);';

        connection.query(sqlQry,[produto.resource_id,produto.resource_type,produto.resource_name,produto.projeto,produto.funcao,produto.owner_,produto.rateio], (err, result)=>{
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
        const sqlQry = 'delete from cadastro_produto where resource_id = ?'

        connection.query(sqlQry,[parametro],(err,result) => {
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
        produto.resource_id     = req.params.resource_id;
        produto.resource_type   = req.body.resource_type;
        produto.resource_name   = req.body.resource_name;
        produto.projeto         = req.body.projeto;
        produto.funcao          = req.body.funcao;
        produto.owner_          = req.body.owner_;
        produto.rateio          = req.body.rateio;

        const sqlQry = 'update cadastro_produto set resource_type = ?, resource_name = ?, projeto = ?, funcao = ?, owner_ = ?, rateio = ? where resource_id = ?'

        connection.query(sqlQry, [produto.resource_type,produto.resource_name,produto.projeto,produto.funcao,produto.owner_,produto.rateio,produto.resource_id], (err,result) =>{
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