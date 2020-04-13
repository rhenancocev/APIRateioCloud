const express = require ('express');
const router = express.Router();
const telaCadastroController = require ('../controllers/telaCadastroController')
const telaCadastroValidation = require('../util/telaCadastroValidation');

router.get('/:resource_id', telaCadastroValidation.listarPorId, telaCadastroController.listarPorId);
router.post('/', telaCadastroValidation.cadastroProduto, telaCadastroController.cadastroProduto);
router.delete('/:resource_id', telaCadastroValidation.deletarProduto, telaCadastroController.deletarProduto);
router.put('/:resource_id', telaCadastroValidation.alterarProduto, telaCadastroController.alterarProduto)

module.exports = router;