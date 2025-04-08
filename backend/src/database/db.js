const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../../database/finance.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados: ', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Criação da tabela para despesas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value REAL NOT NULL,
    date TEXT NOT NULL,
    paymentType TEXT NOT NULL CHECK(paymentType IN ('crédito','débito'))
  )`);

  // Criação da tabela para ganhos
  db.run(`CREATE TABLE IF NOT EXISTS incomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value REAL NOT NULL,
    date TEXT NOT NULL,
    paymentType TEXT NOT NULL CHECK(paymentType IN ('mensal', 'anual', 'variável'))
  )`);
});

module.exports = db;
