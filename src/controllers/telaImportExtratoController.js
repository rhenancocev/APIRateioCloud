//modulo para acessar o banco de dados
const connection = require('../config/conexaoBanco');
//modulo para validar erro utilizando a API express-validator
const { validationResult } = require('express-validator');

//rota para deletar todos os dados da tabela CLOUD_EXTRATO para receber a informação atualizada sempre.
exports.deletaDadosTabela = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else{
        const sqlQry = 'delete from teste';
        connection.query(sqlQry, (err, result, rows)=>{
            if(err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"})
            }else{
                res.status(201)
                res.json({"message": result.insertId + " - Dados deletados com sucesso!"})
            }
        })
    }

}

//rota para inserir os dados que vem da tela do import CSV
exports.importCSV2 = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else{
        const produto = {}
        produto.period                      = req.body.period;
        produto.account_period              = req.body.account_period;
        produto.resource_Id                 = req.body.resource_Id;
        produto.resource_name               = req.body.resource_name;
        produto.resource_tag                = req.body.resource_tag;
        produto.be                          = req.body.be;
        produto.billing_mode                = req.body.billing_mode;
        produto.fee_name                    = req.body.fee_name;
        produto.resource_type               = req.body.resource_type;
        produto.product                     = req.body.product;
        produto.product_specifications      = req.body.product_specifications;
        produto.region                      = req.body.region;
        produto.enterprise_project_id       = req.body.enterprise_project_id;
        produto.enterprise_project_name     = req.body.enterprise_project_name;
        produto.usage_type                  = req.body.usage_type;
        produto.usage_                      = req.body.usage_;
        produto.usage_type_in               = req.body.usage_type_in;
        produto.usage_unit                  = req.body.usage_unit;
        produto.official_total_amount_usd   = req.body.official_total_amount_usd;
        produto.discount_amount_usd         = req.body.discount_amount_usd;
        produto.tax_usd                     = req.body.tax_usd;
        produto.amount_usd                  = req.body.amount_usd;
        produto.transaction_time            = req.body.transaction_time;

        const sqlQry = 'insert into CLOUD_EXTRATO (period,account_period,resource_Id,resource_name,resource_tag,be,billing_mode,fee_name,resource_type,product,product_specifications,region,enterprise_project_id,enterprise_project_name,usage_type,usage_,usage_type_in,usage_unit,official_total_amount_usd,discount_amount_usd,tax_usd,amount_usd,transaction_time) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';

        connection.query(sqlQry,[produto.period,produto.account_period,produto.resource_Id,produto.resource_name,produto.resource_tag,produto.be,produto.billing_mode,produto.fee_name,produto.resource_type,produto.product,produto.product_specifications,produto.region,produto.enterprise_project_id,produto.enterprise_project_name,produto.usage_type,produto.usage_,produto.usage_type_in,produto.usage_unit,produto.official_total_amount_usd,produto.discount_amount_usd,produto.tax_usd,produto.amount_usd,produto.transaction_time], (err, result)=>{
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

//-------------------------------------------------------------------------------------//

//rota para inserir os dados que vem da tela do import CSV
exports.importCSV = (req,res) => {
    try {

        const produto = {}
        
        for(var i = 0; i < req.body.CSVProduto.length; i++){

            produto.nome                   = req.body.CSVProduto[i].nome;
            produto.sobrenome              = req.body.CSVProduto[i].sobrenome;
            produto.idade                  = req.body.CSVProduto[i].idade;

            const sqlQry = 'insert into teste (nome,sobrenome,idade) values (?,?,?)'
            
            connection.query(sqlQry,[produto.nome,produto.sobrenome,produto.idade], (err,result)=>{
                
                if(err){
                    try {
                        return res.status(500).json({"message":"Internal Server Error" + err})
                    } catch (error) {}
                     
                }else{
                    try {
                        return res.status(201).json({"message": result.insertId + " - Dados inseridos com sucesso!"})
                    } catch (error){}
                }
            })
        }
    } catch (error) {
        return res.status(500).json({"message":"Internal Server Error"})
    }
}

//api para verificar se tem registros na tabela de extrato
exports.consultarStage = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else{
        const sqlQry = 'select count(1) as "Registros encontrados " from teste';
        connection.query(sqlQry, (err, rows)=>{
            if(err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"})
            }else if(rows.length > 0){
                res.status(201)
                res.json(rows)
            }else{
                res.status(404);
                res.json({"message": "Nenhum registro encontrado!"})
            }
        })
    }

}