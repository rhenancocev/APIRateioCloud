const express = require ('express');
const router = express.Router();
const telaImportExtratoController = require ('../controllers/telaImportExtratoController');

router.post('/', telaImportExtratoController.importCSV);
router.delete('/:data_inicio/:data_fim', telaImportExtratoController.deletaFiltro);
router.delete('/delete', telaImportExtratoController.deletaDadosTabela);
router.get('/consultaStage', telaImportExtratoController.consultarStage);
router.get('/consultaCadastroResourceId', telaImportExtratoController.consultaCadastroResourceId);
router.put('/mergeCadastro', telaImportExtratoController.mergeCadastro);

module.exports = router;