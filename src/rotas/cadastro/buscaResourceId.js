const express = require ('express');
const router = express.Router();
const connection = require('../../config/conexaoBanco');


router.get('/buscaResourceId/:resource_id', (req, res) =>{
    let parametro = '';
    parametro = req.params.resource_id;
    const sqlQry = 'SELECT * FROM cadastro_produto WHERE resource_id = ?';
    connection.query(sqlQry,[parametro], (error, results, fields) => {
        if(error) {
            res.json(error);
            res.sendStatus(500)
            return
        }
        else
          res.json(results);
        console.log('executou!');
    });
});

module.exports = router;