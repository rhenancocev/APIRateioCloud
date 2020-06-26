const express = require ('express');
const router = express.Router();
const DashboardExtrato = require ('../controllers/telaDashboardController');

router.get('/extraiExtrato', DashboardExtrato.extraiExtratoCloud);

module.exports = router;