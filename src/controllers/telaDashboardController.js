//modulo para acessar o banco de dados
const connection = require('../config/connection-middleware');
//modulo para validar erro utilizando a API express-validator
const { validationResult } = require('express-validator');

//api que extrai tudo da tabela CLOUD_EXTRATO para gerar EXCEL
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

//rota que faz os calculos de rateio por projeto
exports.calculoRateioPorProjeto = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else {
        let valor_fatura = req.query.valor_fatura;
        let vencimento_fatura = req.query.vencimento_fatura;
        let data_inicio = req.query.data_inicio;
        let data_fim = req.query.data_fim;

        if(data_inicio === '' || data_fim === '') return res.json({"message":"Campos: DATA INICIO / DATA FIM são obrigatórios!"})

        const sqlQry = "SELECT GROUP_CONCAT(distinct(resource_name) SEPARATOR ' , ') as DESCRICAO, APROVADOR, PROJETO, CR, SUM(AMOUNT_USD) as CUSTO_SEM_RATEIO_USD,"
        + " (select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?)) as CUSTO_SEM_RATEIO_USD_TOTAL,"
        + " (select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'SIM' and date_ between (?) and (?)) * (SUM(AMOUNT_USD)/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))) as CUSTO_RATEIO,"
        + " SUM(AMOUNT_USD) + (select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'SIM' and date_ between (?) and (?)) * (SUM(AMOUNT_USD)/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))) as CUSTO_TOTAL_USD,"
        + " SUM(AMOUNT_USD)/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?)) as PORCENTAGEM,"
        + " (select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?)) as PORCENTAGEM_TOTAL,"
        + " (SUM(AMOUNT_USD)/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))) * ? as CUSTO_TOTAL_BRL,"
        + " ((select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))) * ? as CUSTO_TOTAL_BRL_TOTAL,"
        + " concat(?) AS VENCIMENTO_FATURA"
        + " FROM CLOUD_EXTRATO"
        + " where rateio = 'NAO' and date_ between (?) and (?) group by projeto,cr,APROVADOR;"
        
        req.connection.query(sqlQry,[data_inicio, data_fim,
            data_inicio, data_fim,data_inicio, data_fim,
            data_inicio, data_fim,data_inicio, data_fim,
            data_inicio, data_fim,
            data_inicio, data_fim,data_inicio, data_fim,
            data_inicio, data_fim,valor_fatura,
            data_inicio, data_fim,data_inicio, data_fim,valor_fatura,
            vencimento_fatura,
            data_inicio, data_fim],(err,rows) => {
                
            if (err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"});
            }else if(rows.length > 0){
                res.status(201)
                res.json(rows)
            }else{
                res.status(404)
                res.json({"message":"Não foi encontrado nenhum registro na tabela para efetuar o rateio!"})
            }
        })
    }
};

//rota que faz os calculos de rateio por resource_id detalhado
exports.calculoRateioDetalhado = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() })  
    }else {
        let valor_fatura = req.query.valor_fatura;
        let vencimento_fatura = req.query.vencimento_fatura;
        let data_inicio = req.query.data_inicio;
        let data_fim = req.query.data_fim;
        let projeto = req.query.projeto;

        if(data_inicio === '' || data_fim === '' || projeto === '') return res.json({"message":"Campos: DATA INICIO / DATA FIM / PROJETO são obrigatórios!"})

        const sqlQry = "SELECT distinct(resource_name) as DESCRICAO, RESOURCE_TYPE, FUNCAO, OWNER_, SUM(AMOUNT_USD) as CUSTO_SEM_RATEIO_USD,"
        + " (select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?) and PROJETO = ?) as CUSTO_SEM_RATEIO_USD_TOTAL_PROJETO,"
        + " (select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'SIM' and date_ between (?) and (?)) * (SUM(AMOUNT_USD)/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))) as CUSTO_RATEIO,"
        + " SUM(AMOUNT_USD) + (select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'SIM' and date_ between (?) and (?)) * (SUM(AMOUNT_USD)/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))) as CUSTO_TOTAL_USD,"
        + " SUM(AMOUNT_USD)/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?)) as PORCENTAGEM,"
        + " (select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?) and PROJETO = ?)/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?)) as PORCENTAGEM_TOTAL_PROJETO,"
        + " (SUM(AMOUNT_USD)/(select SUM(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))) * ? as CUSTO_TOTAL_BRL,"
        + " ((select sum(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?) and PROJETO = ?)/(select sum(AMOUNT_USD) FROM CLOUD_EXTRATO where rateio = 'NAO' and date_ between (?) and (?))) * ? as CUSTO_TOTAL_BRL_TOTAL_PROJETO"
        + " FROM CLOUD_EXTRATO where rateio = 'NAO' and PROJETO = ? and date_ between (?) and (?) group by resource_name,resource_type,funcao,owner_;";
        
        req.connection.query(sqlQry,[data_inicio, data_fim, projeto,
            data_inicio, data_fim, data_inicio, data_fim,
            data_inicio, data_fim, data_inicio, data_fim,
            data_inicio, data_fim,
            data_inicio, data_fim, projeto, data_inicio, data_fim,
            data_inicio, data_fim, valor_fatura,
            data_inicio, data_fim, projeto, data_inicio, data_fim, valor_fatura,
            projeto, data_inicio, data_fim],(err,rows) => {
                
            if (err){
                console.log(err);
                res.status(500);
                res.json({"message":"Internal Server Error"});
            }else if(rows.length > 0){
                res.status(201)
                res.json(rows)
            }else{
                res.status(404)
                res.json({"message":"Não foi encontrado nenhum registro na tabela para efetuar o rateio!"})
            }
        })
    }
};
