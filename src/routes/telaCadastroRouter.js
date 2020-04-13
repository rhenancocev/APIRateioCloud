const express = require ('express');
const router = express.Router();
const telaCadastroController = require ('../controllers/telaCadastroController')
const telaCadastroValidation = require('../util/telaCadastroValidation');

router.get('/:resource_id', telaCadastroValidation.listarPorId ,telaCadastroController.listarPorId);
router.post('/', telaCadastroController.cadastroProduto);

module.exports = router;