const express = require ('express');
const router = express.Router();
const telaImportExtratoController = require ('../controllers/telaImportExtratoController')

router.post('/', telaImportExtratoController.importCSV);

module.exports = router;