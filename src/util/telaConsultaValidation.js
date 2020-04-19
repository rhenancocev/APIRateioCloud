const {check} = require('express-validator');

exports.lista = [
    check('parametro').exists().withMessage('O parametro não pode estar em branco'),
    check('valor').exists().withMessage('O valor não pode estar em branco')
]