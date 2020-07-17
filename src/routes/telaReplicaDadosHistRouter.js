const express = require ('express');
const router = express.Router();
const telaReplicaDadosHistController = require ('../controllers/telaReplicaDadosHistController');

router.get('/consultaReplicaDados', telaReplicaDadosHistController.consultaReplicaDados);
router.post('/replicaDados', telaReplicaDadosHistController.ReplicaDados);
router.get('/extraiDadosHistoricos', telaReplicaDadosHistController.extrairHistorico);
module.exports = router;