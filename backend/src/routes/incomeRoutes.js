const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const validateIncome = require('../middlewares/validateIncome');
const validateIncomeUpdate = require('../middlewares/validateIncomeUpdate');

router.post('/', validateIncome, incomeController.createIncome);

router.get('/', incomeController.getIncomes);

router.put('/:id', validateIncomeUpdate, incomeController.updateIncome);

router.delete('/:id', incomeController.deleteIncome);

module.exports = router;
