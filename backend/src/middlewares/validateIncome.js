// backend/src/middlewares/validateIncome.js
const { body, validationResult } = require('express-validator');

const validateIncome = [
  body('name').notEmpty().withMessage('Nome do ganho é obrigatório.'),
  body('value').isFloat({ gt: 0 }).withMessage('Valor do ganho deve ser um número positivo.'),
  body('date').isISO8601().withMessage('Data inválida. Utilize o formato ISO (YYYY-MM-DD).'),
  body('paymentType').isIn(['mensal', 'anual', 'variável']).withMessage('Tipo de pagamento deve ser "mensal", "anual" ou "variável".'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateIncome;
