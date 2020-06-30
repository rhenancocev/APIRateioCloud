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
        const sqlQry = 'delete from CLOUD_EXTRATO';
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

//api para verificar se tem registros na tabela de extrato
exports.consultarStage = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else{
        const sqlQry = "SELECT count(1) as 'Registros encontrados ' , DATE_FORMAT(min(date_), '%d/%m/%Y') as 'Data minima ', DATE_FORMAT(max(date_), '%d/%m/%Y') as 'Data maxima ' from CLOUD_EXTRATO;";
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


//rota para inserir os dados que vem da tela do import CSV
exports.importCSV = (req,res) => {
    try {

        const produto = {}
        
        for(var i = 0; i < req.body.length; i++){

            produto.billing_cycle                       = req.body[i].billing_cycle;
            produto.date_                               = req.body[i].date_;
            produto.enterprise_project                  = req.body[i].enterprise_project;
            produto.enterprise_project_id               = req.body[i].enterprise_project_id;
            produto.account_name                        = req.body[i].account_name;
            produto.service_type_code                   = req.body[i].service_type_code;
            produto.service_type                        = req.body[i].service_type;
            produto.resource_type_code                  = req.body[i].resource_type_code;
            produto.resource_type                       = req.body[i].resource_type;
            produto.product_id                          = req.body[i].product_id;
            produto.billing_mode                        = req.body[i].billing_mode;
            produto.bill_type                           = req.body[i].bill_type;
            produto.resource_id                         = req.body[i].resource_id;
            produto.resource_name                       = req.body[i].resource_name;
            produto.resource_tag                        = req.body[i].resource_tag;
            produto.sku_code                            = req.body[i].sku_code;
            produto.resource_specifications             = req.body[i].resource_specifications;
            produto.parent_resource_id                  = req.body[i].parent_resource_id;
            produto.root_resource_id                    = req.body[i].root_resource_id;
            produto.region_code                         = req.body[i].region_code;
            produto.region                              = req.body[i].region;
            produto.az                                  = req.body[i].az;
            produto.list_price_usd                      = req.body[i].list_price_usd;
            produto.discount_usd                        = req.body[i].discount_usd;
            produto.amount_usd                          = req.body[i].amount_usd;
            produto.cash_payment_usd                    = req.body[i].cash_payment_usd;
            produto.cash_coupon_used_usd                = req.body[i].cash_coupon_used_usd;
            produto.monthly_settlement_usd              = req.body[i].monthly_settlement_usd;
            produto.written_off_usd                     = req.body[i].written_off_usd;

            const sqlQry = "insert into CLOUD_EXTRATO (billing_cycle,date_,enterprise_project,enterprise_project_id,account_name,service_type_code,service_type,resource_type_code,resource_type,product_id,billing_mode,bill_type,resource_id,resource_name,resource_tag,sku_code,resource_specifications,parent_resource_id,root_resource_id,region_code,region,az,list_price_usd,discount_usd,amount_usd,cash_payment_usd,cash_coupon_used_usd,monthly_settlement_usd,written_off_usd) values (?,STR_TO_DATE(?,'%M/%d/%Y'),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

            req.connection.query(sqlQry,
                [produto.billing_cycle,produto.date_,
            produto.enterprise_project,produto.enterprise_project_id,
            produto.account_name,produto.service_type_code,
            produto.service_type,produto.resource_type_code,
            produto.resource_type,produto.product_id,produto.billing_mode,
            produto.bill_type,produto.resource_id,
            produto.resource_name,produto.resource_tag,produto.sku_code,
            produto.resource_specifications,produto.parent_resource_id,
            produto.root_resource_id,produto.region_code,produto.region,
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

//rota que faz a limpeza do arquivo após importação
exports.deletaFiltro = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else {
        let dataIni = req.params.data_inicio;
        let dataFim = req.params.data_fim;
        const sqlQry = 'delete from CLOUD_EXTRATO where amount_usd = 0.00000000 or date_ not between (?) and (?);';

        req.connection.query(sqlQry,[dataIni, dataFim],(err,result) => {
            if (err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"});
            }else if(result.affectedRows > 0){
                res.status(200)
                res.json({"message": result.affectedRows + " linhas deletadas com sucesso!"})
            }else{
                res.status(404)
                res.json({"message":"Produto não encontrado"})
            }
        })
    }
};

//api para verificar se tem algum resource_id que foi importado na tabela de extrato que não está na tabela de cadastro;
exports.consultaCadastroResourceId = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else{
        const sqlQry = 'SELECT distinct(RESOURCE_ID), RESOURCE_TYPE, RESOURCE_NAME FROM CLOUD_EXTRATO EXTRATO WHERE EXTRATO.RESOURCE_ID NOT IN (SELECT CAD.RESOURCE_ID FROM CADASTRO_PRODUTO CAD) group by RESOURCE_ID,RESOURCE_TYPE,RESOURCE_NAME;';
        req.connection.query(sqlQry, (err, rows)=>{
            if(err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"})
            }else if(rows.length > 0){
                res.status(201)
                res.json(rows)
            }else{
                res.status(200);
                res.json({"message": "Todos os resource_id estão cadastrados na tabela de cadastro!"})
            }
        })
    }
};

//api para fazer o MERGE entre a tabela de cadastro e a tabela de extrato
exports.mergeCadastro = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })
    }else {

        const sqlQry = 'UPDATE CLOUD_EXTRATO EXTRATO SET EXTRATO.RESOURCE_NAME 	= (SELECT CAD.RESOURCE_NAME FROM CADASTRO_PRODUTO CAD WHERE CAD.RESOURCE_ID = EXTRATO.RESOURCE_ID),EXTRATO.PROJETO = (SELECT CAD.PROJETO FROM CADASTRO_PRODUTO CAD WHERE CAD.RESOURCE_ID = EXTRATO.RESOURCE_ID), EXTRATO.FUNCAO = (SELECT CAD.FUNCAO FROM CADASTRO_PRODUTO CAD WHERE CAD.RESOURCE_ID = EXTRATO.RESOURCE_ID), EXTRATO.OWNER_ = (SELECT CAD.OWNER_ FROM CADASTRO_PRODUTO CAD WHERE CAD.RESOURCE_ID = EXTRATO.RESOURCE_ID), EXTRATO.RATEIO = (SELECT CAD.RATEIO FROM CADASTRO_PRODUTO CAD WHERE CAD.RESOURCE_ID = EXTRATO.RESOURCE_ID), EXTRATO.CLOUD = (SELECT CAD.CLOUD FROM CADASTRO_PRODUTO CAD WHERE CAD.RESOURCE_ID = EXTRATO.RESOURCE_ID), EXTRATO.APROVADOR = (SELECT CAD.APROVADOR FROM CADASTRO_PRODUTO CAD WHERE CAD.RESOURCE_ID = EXTRATO.RESOURCE_ID), EXTRATO.CR = (SELECT CAD.CR FROM CADASTRO_PRODUTO CAD WHERE CAD.RESOURCE_ID = EXTRATO.RESOURCE_ID) WHERE EXTRATO.RESOURCE_ID IN (SELECT CAD.RESOURCE_ID FROM CADASTRO_PRODUTO CAD);';

        req.connection.query(sqlQry, (err,result) =>{
            if(err){
                console.log(err);
                res.status(500)
                res.json({"message":"Internal Server Error"})
            }else if(result.affectedRows > 0){
                res.status(202);
                res.json({"message": result.affectedRows + " linhas alteradas com sucesso!"})
            }else{
                res.status(404)
                res.json({"message":"Nenhuma linha foi alterada"})
            }
        })
    }
}