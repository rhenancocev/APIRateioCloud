const express = require ('express');
const app = require ("express")();  
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../../banco_dados/conexaoBanco');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post('/cadastroProduto',(req,res)=>{
    const resource_id = req.body.resource_id
    const resource_type = req.body.resource_type
    const resource_name = req.body.resource_name
    const projeto = req.body.projeto
    const funcao = req.body.funcao
    const owner_ = req.body.owner_

    const sqlQry = `insert into cadastro_produto (resource_id,resource_type,resource_name,projeto,funcao,owner_) values ('${resource_id}', '${resource_type}', '${resource_name}', '${projeto}', '${funcao}', '${owner_}');`;

     connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        console.log('executou!');
    });
});

module.exports = router;