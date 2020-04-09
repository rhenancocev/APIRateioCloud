const express = require ('express');
const app = require ("express")();  
const router = express.Router();
const connection = require('../../banco_dados/conexaoBanco');

router.post('/cadastroProduto',(req,res)=>{
    const resource_id   = req.body.resource_id;
    const resource_type = req.body.resource_type;
    const resource_name = req.body.resource_name;
    const projeto       = req.body.projeto;
    const funcao        = req.body.funcao;
    const owner_        = req.body.owner_;
    const rateio        = req.body.rateio;

    const sqlQry = 'insert into cadastro_produto (resource_id,resource_type,resource_name,projeto,funcao,owner_,rateio) values (?,?,?,?,?,?,?);';

     connection.query(sqlQry,[resource_id,resource_type,resource_name,projeto,funcao,owner_,rateio], function(error, results, fields){
        if(error) {
          res.json(error);
          res.sendStatus(500)
          return
        }else
          res.json("Dados inseridos com sucesso!");
        console.log('executou!');
    });
});

module.exports = router;