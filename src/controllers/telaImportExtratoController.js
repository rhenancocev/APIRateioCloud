//modulo para acessar o banco de dados
const connection = require('../config/connection-middleware');
//modulo para validar erro utilizando a API express-validator
const { validationResult } = require('express-validator');

//rota para deletar todos os dados da tabela CLOUD_EXTRATO para receber a informação atualizada sempre.
exports.deletaDadosTabela = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else{
        const sqlQry = 'delete from teste';
        req.connection.query(sqlQry, (err, result, rows)=>{
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
            
            req.connection.query(sqlQry,[produto.nome,produto.sobrenome,produto.idade], (err,result)=>{
                
                if(err){
                    try {
                        console.log(err)
                        return res.status(500).json(err)
                    } catch (error) {console.log(error)}
                     
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
        req.connection.query(sqlQry, (err, rows)=>{
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

exports.importCSV3 = (req,res) => {
    try {

        const produto = {}
        
        for(var i = 0; i < req.body.length; i++){

            produto.period                      = req.body[i].period;
            produto.account_period              = req.body[i].account_period;
            produto.resource_Id                 = req.body[i].resource_Id;
            produto.resource_name               = req.body[i].resource_name;
            produto.resource_tag                = req.body[i].resource_tag;
            produto.be                          = req.body[i].be;
            produto.billing_mode                = req.body[i].billing_mode;
            produto.fee_name                    = req.body[i].fee_name;
            produto.resource_type               = req.body[i].resource_type;
            produto.product                     = req.body[i].product;
            produto.product_specifications      = req.body[i].product_specifications;
            produto.region                      = req.body[i].region;
            produto.enterprise_project_id       = req.body[i].enterprise_project_id;
            produto.enterprise_project_name     = req.body[i].enterprise_project_name;
            produto.usage_type                  = req.body[i].usage_type;
            produto.usage_                      = req.body[i].usage_;
            produto.usage_type_in               = req.body[i].usage_type_in;
            produto.usage_unit                  = req.body[i].usage_unit;
            produto.official_total_amount_usd   = req.body[i].official_total_amount_usd;
            produto.discount_amount_usd         = req.body[i].discount_amount_usd;
            produto.tax_usd                     = req.body[i].tax_usd;
            produto.amount_usd                  = req.body[i].amount_usd;
            produto.transaction_time            = req.body[i].transaction_time;

            const sqlQry = 'insert into CLOUD_EXTRATO (period,account_period,resource_Id,resource_name,resource_tag,be,billing_mode,fee_name,resource_type,product,product_specifications,region,enterprise_project_id,enterprise_project_name,usage_type,usage_,usage_type_in,usage_unit,official_total_amount_usd,discount_amount_usd,tax_usd,amount_usd,transaction_time) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';

            req.connection.query(sqlQry,[produto.period,produto.account_period,produto.resource_Id,produto.resource_name,produto.resource_tag,produto.be,produto.billing_mode,produto.fee_name,produto.resource_type,produto.product,produto.product_specifications,produto.region,produto.enterprise_project_id,produto.enterprise_project_name,produto.usage_type,produto.usage_,produto.usage_type_in,produto.usage_unit,produto.official_total_amount_usd,produto.discount_amount_usd,produto.tax_usd,produto.amount_usd,produto.transaction_time], (err,result)=>{
                
                if(err){
                    try {
                        console.log(err)
                        return res.status(500).json(err)
                    } catch (error) {console.log(error)}
                     
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
//-------------------------------------------------//

exports.importCSV2 = (req,res) => {
    try {

        const produto = {}
        
        for(var i = 0; i < req.body.cliente.length; i++){

            produto.billing_cycle                       = req.body.cliente[i].billing_cycle;
            produto.date_                               = req.body.cliente[i].date_;
            produto.enterprise_project                  = req.body.cliente[i].enterprise_project;
            produto.enterprise_project_id               = req.body.cliente[i].enterprise_project_id;
            produto.account_name                        = req.body.cliente[i].account_name;
            produto.service_type_code                   = req.body.cliente[i].service_type_code;
            produto.service_type                        = req.body.cliente[i].service_type;
            produto.resource_type_code                  = req.body.cliente[i].resource_type_code;
            produto.resource_type                       = req.body.cliente[i].resource_type;
            produto.billing_mode                        = req.body.cliente[i].billing_mode;
            produto.bill_type                           = req.body.cliente[i].bill_type;
            produto.resource_id                         = req.body.cliente[i].resource_id;
            produto.resource_name                       = req.body.cliente[i].resource_name;
            produto.resource_tag                        = req.body.cliente[i].resource_tag;
            produto.resource_specifications             = req.body.cliente[i].resource_specifications;
            produto.parent_resource_id                  = req.body.cliente[i].parent_resource_id;
            produto.root_resource_id                    = req.body.cliente[i].root_resource_id;
            produto.region                              = req.body.cliente[i].region;
            produto.az                                  = req.body.cliente[i].az;
            produto.list_price_usd                      = req.body.cliente[i].list_price_usd;
            produto.discount_usd                        = req.body.cliente[i].discount_usd;
            produto.amount_usd                          = req.body.cliente[i].amount_usd;
            produto.cash_payment_usd                    = req.body.cliente[i].cash_payment_usd;
            produto.cash_coupon_used_usd                = req.body.cliente[i].cash_coupon_used_usd;
            produto.monthly_settlement_usd              = req.body.cliente[i].monthly_settlement_usd;
            produto.written_off_usd                     = req.body.cliente[i].written_off_usd;

            const sqlQry = "insert into CLOUD_EXTRATO (billing_cycle,date_,enterprise_project,enterprise_project_id,account_name,service_type_code,service_type,resource_type_code,resource_type,billing_mode,bill_type,resource_id,resource_name,resource_tag,resource_specifications,parent_resource_id,root_resource_id,region,az,list_price_usd,discount_usd,amount_usd,cash_payment_usd,cash_coupon_used_usd,monthly_settlement_usd,written_off_usd) values (?,STR_TO_DATE(?,'%M/%d/%Y'),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

            req.connection.query(sqlQry,
                [produto.billing_cycle,produto.date_,
            produto.enterprise_project,produto.enterprise_project_id,
            produto.account_name,produto.service_type_code,
            produto.service_type,produto.resource_type_code,
            produto.resource_type,produto.billing_mode,
            produto.bill_type,produto.resource_id,
            produto.resource_name,produto.resource_tag,
            produto.resource_specifications,produto.parent_resource_id,
            produto.root_resource_id,produto.region,
            produto.az,produto.list_price_usd,
            produto.discount_usd,produto.amount_usd,
            produto.cash_payment_usd,produto.cash_coupon_used_usd,
            produto.monthly_settlement_usd,produto.written_off_usd], 
            (err,result)=>{
                
                if(err){
                    try {
                        console.log(err)
                        return res.status(500).json(err)
                    } catch (error) {console.log(error)}
                     
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