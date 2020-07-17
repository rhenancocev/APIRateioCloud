//modulo para acessar o banco de dados
const connection = require('../config/connection-middleware');
//modulo para validar erro utilizando a API express-validator
const { validationResult } = require('express-validator');

//rota para replica de dados da tabela hist
exports.ReplicaDados = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else {
        let vencimento_fatura = req.body.vencimento_fatura;
        let valor_fatura = req.body.valor_fatura;
        let data_inicio = req.body.data_inicio;
        let data_fim = req.body.data_fim;

        const retornoDelete = new Promise((resolve, reject)=>{
            
                if(data_inicio === '' || data_fim === '' || valor_fatura === '' || vencimento_fatura === '') return res.json({"message":"Todos os campos são obrigatórios!"})
    
                const sqlQryD = 'delete from CLOUD_EXTRATO_HIST where date_ between (?) and (?);';
                    
            req.connection.query(sqlQryD,[data_inicio,data_fim],(err,result) => {
                
                if (err){
                    console.log(err);
                    res.status(500);
                    res.json({"message":"Internal Server Error"});
                }else {
                    return resolve(result.affectedRows);
                    
                }
            })
            })
        if(await retornoDelete >= 0){
            const sqlQry = 'insert into CLOUD_EXTRATO_HIST (vencimento_fatura,valor_fatura,billing_cycle,date_,enterprise_project,enterprise_project_id,account_name,service_type_code,service_type,resource_type_code,resource_type,product_id,billing_mode,bill_type,resource_id,resource_name,resource_tag,sku_code,parent_resource_id,root_resource_id,region_code,region,az,list_price_usd,discount_usd,amount_usd,cash_payment_usd,cash_coupon_used_usd,monthly_settlement_usd,written_off_usd,projeto,funcao,owner_,rateio,cloud,aprovador,cr) select ?,?,billing_cycle,date_,enterprise_project,account_name,service_type_code,service_type,resource_type_code,resource_type,product_id,billing_mode,bill_type,resource_id,resource_name,resource_tag,sku_code,resource_specifications,parent_resource_id,root_resource_id,region_code,region,az,list_price_usd,discount_usd,amount_usd,cash_payment_usd,cash_coupon_used_usd,monthly_settlement_usd,written_off_usd,projeto,funcao,owner_,rateio,cloud,aprovador,cr from CLOUD_EXTRATO where date_ between (?) and (?);';
                
            req.connection.query(sqlQry,[vencimento_fatura,valor_fatura,data_inicio,data_fim],(err,result) => {
                
                if (err){
                    res.status(500);
                    res.json({"message":"Internal Server Error"});
                }else {
                    res.status(200)
                    return res.json({"message": result.affectedRows + " Registros replicadas com sucesso!"})
                }
            })
        }
    }
    };

    //------------------------------------------------------------------------------------//
    exports.consultaReplicaDados = async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() })  
        }else {
      
            let data_inicio = req.query.data_inicio;
            let data_fim = req.query.data_fim;
    
            const select = "select count(1) as Qt_registro, DATE_FORMAT(min(date_), '%Y-%m-%d') as Data_min, DATE_FORMAT(max(date_), '%Y-%m-%d') as Data_max from CLOUD_EXTRATO_HIST where date_ between (?) and (?);";
            if(data_inicio === '' || data_fim === '') return res.json({"message":"Todos os campos são obrigatórios!"})

            req.connection.query(select,[data_inicio,data_fim],(err,rows) => {
                if (err){
                    console.log(err);
                    res.status(500);
                    res.json({"message":"Internal Server Error"});
                }else if(rows.length > 0){
                    console.log(rows[0].Qt_registro)
                    if(rows[0].Qt_registro === 0){
                        const Qt_registro = rows[0].Qt_registro
                        res.status(201)
                        res.json({"message:":"Não foi encontrado nenhum registro no banco de dados!", Qt_registro})
                    }else{
                    res.status(201)
                    res.json({"message:":"Dados existentes no histórico para o período informado", rows})
                    }
                }else{
                    res.status(404);
                    res.json({"message": "Nenhum registro encontrado!"})
                }
                
             })  
        }
        };

//---------------------------------------------------------------------------------------------

exports.extrairHistorico = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else{
        const sqlQry = "SELECT vencimento_fatura,valor_fatura,billing_cycle,DATE_FORMAT(date_, '%Y-%m-%d') as date_,enterprise_project,enterprise_project_id,account_name,service_type_code,service_type,resource_type_code,resource_type,product_id,billing_mode,bill_type,resource_id,resource_name,resource_tag,sku_code,resource_specifications,parent_resource_id,root_resource_id,region_code,region,az,list_price_usd,discount_usd,amount_usd,cash_payment_usd,cash_coupon_used_usd,monthly_settlement_usd,written_off_usd,projeto,funcao,owner_,rateio,cloud,aprovador,cr FROM CLOUD_EXTRATO_HIST EXTRATO;";
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