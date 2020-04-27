//modulo para acessar o banco de dados
const connection = require('../config/conexaoBanco');
//modulo para validar erro utilizando a API express-validator
const { validationResult } = require('express-validator');

//rota para inserir os dados que vem da tela do import CSV
exports.importCSV = (req,res) => {
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

        const sqlQry = 'insert into cloud_extrato (period,account_period,resource_Id,resource_name,resource_tag,be,billing_mode,fee_name,resource_type,product,product_specifications,region,enterprise_project_id,enterprise_project_name,usage_type,usage_,usage_type_in,usage_unit,official_total_amount_usd,discount_amount_usd,tax_usd,amount_usd,transaction_time) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';

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