const { body, param, validationResult } = require('express-validator');

const validateExpenseUpdate = [
  param('id').isInt({ gt: 0 }).withMessage('ID da despesa inválido.'),
  body('name').notEmpty().withMessage('Nome da despesa é obrigatório.'),
  body('value').isFloat({ gt: 0 }).withMessage('Valor da despesa deve ser um número positivo.'),
  body('date').isISO8601().withMessage('Data inválida. Utilize o formato ISO (YYYY-MM-DD).'),
  body('paymentType').isIn(['crédito', 'débito']).withMessage('Tipo de pagamento deve ser "crédito" ou "débito".'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn('Validação de atualização de despesa falhou:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateExpenseUpdate;
