const db = require('../database/db');

exports.createIncome = (req, res) => {
  const { name, value, date, paymentType } = req.body;
  const query = `INSERT INTO incomes (name, value, date, paymentType) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, value, date, paymentType], function(err) {
    if (err) {
      console.error('Erro ao inserir ganho:', err);
      return res.status(500).json({ error: 'Erro ao inserir ganho.' });
    }
    res.status(201).json({ id: this.lastID, message: 'Ganho adicionado com sucesso.' });
  });
};

exports.getIncomes = (req, res) => {
  const query = `SELECT * FROM incomes`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao obter ganhos:', err);
      return res.status(500).json({ error: 'Erro ao obter ganhos.' });
    }
    res.json(rows);
  });
};

exports.updateIncome = (req, res) => {
  const incomeId = req.params.id;
  const { name, value, date, paymentType } = req.body;
  const query = `UPDATE incomes SET name = ?, value = ?, date = ?, paymentType = ? WHERE id = ?`;
  db.run(query, [name, value, date, paymentType, incomeId], function(err) {
    if (err) {
      console.error(`Erro ao atualizar ganho (ID: ${incomeId}):`, err);
      return res.status(500).json({ error: 'Erro ao atualizar ganho.' });
    }
    if (this.changes === 0) {
      console.warn(`Ganho não encontrado para atualização (ID: ${incomeId}).`);
      return res.status(404).json({ error: 'Ganho não encontrado.' });
    }
    console.log(`Ganho atualizado (ID: ${incomeId}).`);
    res.json({ message: 'Ganho atualizado com sucesso.' });
  });
};

exports.deleteIncome = (req, res) => {
  const incomeId = req.params.id;
  const query = `DELETE FROM incomes WHERE id = ?`;
  db.run(query, [incomeId], function(err) {
    if (err) {
      console.error(`Erro ao remover ganho (ID: ${incomeId}):`, err);
      return res.status(500).json({ error: 'Erro ao remover ganho.' });
    }
    if (this.changes === 0) {
      console.warn(`Ganho não encontrado para remoção (ID: ${incomeId}).`);
      return res.status(404).json({ error: 'Ganho não encontrado.' });
    }
    console.log(`Ganho removido (ID: ${incomeId}).`);
    res.json({ message: 'Ganho removido com sucesso.' });
  });
};