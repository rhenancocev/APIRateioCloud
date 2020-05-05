const express = require ('express');
const router = express.Router();
const telaImportExtratoController = require ('../controllers/telaImportExtratoController');

router.post('/', telaImportExtratoController.importCSV);
router.delete('/delete', telaImportExtratoController.deletaDadosTabela);

module.exports = router;