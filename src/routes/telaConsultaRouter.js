const express = require ('express');
const router = express.Router();
const telaConsultaController = require ('../controllers/telaConsultaController');
const telaConsultaValidation = require('../util/telaConsultaValidation');

router.get('/:parametro/:valor',telaConsultaValidation.lista,telaConsultaController.lista);
router.get('/',telaConsultaController.listaTudo);

module.exports = router;