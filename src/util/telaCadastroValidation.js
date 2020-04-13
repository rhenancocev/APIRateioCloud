const {check} = require('express-validator');

exports.listarPorId = [
    check('resource_id').exists().withMessage('O resource_id não pode estar em branco')
]

exports.cadastroProduto = [
    check('resource_id').exists().trim().withMessage('O resource_id não pode estar em branco'),
    check('resource_type').exists().trim().withMessage('O resource_type não pode estar em branco')
]

exports.deletarProduto = [
    check('resource_id').exists().withMessage('O resource_id não pode estar em branco')
]

exports.alterarProduto = [
    check('resource_id').exists().withMessage('O resource_id não pode estar em branco'),
    check('resource_type').exists().trim().withMessage('O resource_type não pode estar em branco'),
    check('rateio')
    .exists().withMessage('O rateio não pode estar em branco')
    .isInt().withMessage('O rateio deve ser numerico (0 ou 1)')
]