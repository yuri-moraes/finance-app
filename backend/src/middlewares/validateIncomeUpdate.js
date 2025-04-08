const { body, param, validationResult } = require('express-validator');

const validateIncomeUpdate = [
  param('id').isInt({ gt: 0 }).withMessage('ID do ganho inválido.'),
  body('name').notEmpty().withMessage('Nome do ganho é obrigatório.'),
  body('value').isFloat({ gt: 0 }).withMessage('Valor do ganho deve ser um número positivo.'),
  body('date').isISO8601().withMessage('Data inválida. Utilize o formato ISO (YYYY-MM-DD).'),
  body('paymentType').isIn(['mensal', 'anual', 'variável']).withMessage('Tipo de pagamento deve ser "mensal", "anual" ou "variável".'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn('Validação de atualização de ganho falhou:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateIncomeUpdate;