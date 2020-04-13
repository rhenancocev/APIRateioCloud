const {check} = require('express-validator');

exports.listarPorId = [
    check('resource_id')
    .exists().withMessage('O resource_id não pode estar em branco')
]