const db = require('../database/db');

exports.createExpense = (req, res) => {
  const { name, value, date, paymentType } = req.body;
  const query = `INSERT INTO expenses (name, value, date, paymentType) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, value, date, paymentType], function(err) {
    if (err) {
      console.error('Erro ao inserir despesa:', err);
      return res.status(500).json({ error: 'Erro ao inserir despesa.' });
    }
    res.status(201).json({ id: this.lastID, message: 'Despesa adicionada com sucesso.' });
  });
};

exports.getExpenses = (req, res) => {
  const query = `SELECT * FROM expenses`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao obter despesas:', err);
      return res.status(500).json({ error: 'Erro ao obter despesas.' });
    }
    res.json(rows);
  });
};

exports.updateExpense = (req, res) => {
  const expenseId = req.params.id;
  const { name, value, date, paymentType } = req.body;
  const query = `UPDATE expenses SET name = ?, value = ?, date = ?, paymentType = ? WHERE id = ?`;
  db.run(query, [name, value, date, paymentType, expenseId], function(err) {
    if (err) {
      console.error(`Erro ao atualizar despesa (ID: ${expenseId}):`, err);
      return res.status(500).json({ error: 'Erro ao atualizar despesa.' });
    }
    if (this.changes === 0) {
      console.warn(`Despesa não encontrada para atualização (ID: ${expenseId}).`);
      return res.status(404).json({ error: 'Despesa não encontrada.' });
    }
    console.log(`Despesa atualizada (ID: ${expenseId}).`);
    res.json({ message: 'Despesa atualizada com sucesso.' });
  });
};

exports.deleteExpense = (req, res) => {
  const expenseId = req.params.id;
  const query = `DELETE FROM expenses WHERE id = ?`;
  db.run(query, [expenseId], function(err) {
    if (err) {
      console.error(`Erro ao remover despesa (ID: ${expenseId}):`, err);
      return res.status(500).json({ error: 'Erro ao remover despesa.' });
    }
    if (this.changes === 0) {
      console.warn(`Despesa não encontrada para remoção (ID: ${expenseId}).`);
      return res.status(404).json({ error: 'Despesa não encontrada.' });
    }
    console.log(`Despesa removida (ID: ${expenseId}).`);
    res.json({ message: 'Despesa removida com sucesso.' });
  });
};