const express = require ('express');
const router = express.Router();
const DashboardExtrato = require ('../controllers/telaDashboardController');

router.get('/extraiExtrato', DashboardExtrato.extraiExtratoCloud);
router.get('/rateioProjeto', DashboardExtrato.calculoRateioPorProjeto);
router.get('/rateioDetalhado', DashboardExtrato.calculoRateioDetalhado);

module.exports = router;