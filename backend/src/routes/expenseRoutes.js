const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const validateExpense = require('../middlewares/validateExpense');
const validateExpenseUpdate = require('../middlewares/validateExpenseUpdate');

router.post('/', validateExpense, expenseController.createExpense);

router.get('/', expenseController.getExpenses);

router.put('/:id', validateExpenseUpdate, expenseController.updateExpense);

router.delete('/:id', expenseController.deleteExpense);

module.exports = router;