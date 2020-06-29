//modulo para acessar o banco de dados
const connection = require('../config/connection-middleware');
//modulo para validar erro utilizando a API express-validator
const { validationResult } = require('express-validator');

exports.extraiExtratoCloud = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else{
        const sqlQry = "SELECT billing_cycle,DATE_FORMAT(date_, '%Y-%m-%d') as date_,enterprise_project,enterprise_project_id,account_name,service_type_code,service_type,resource_type_code,resource_type,product_id,billing_mode,bill_type,resource_id,resource_name,resource_tag,sku_code,resource_specifications,parent_resource_id,root_resource_id,region_code,region,az,list_price_usd,discount_usd,amount_usd,cash_payment_usd,cash_coupon_used_usd,monthly_settlement_usd,written_off_usd,projeto,funcao,owner_,rateio,cloud,aprovador,cr FROM CLOUD_EXTRATO EXTRATO;";
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
                res.json({"message": "Não existe dados para serem exportados!"})
            }
        })
    }
};