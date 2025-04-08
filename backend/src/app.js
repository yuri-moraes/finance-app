const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: [
    "https://finance-app-mu-azure.vercel.app",
    "http://localhost:3000"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middlewares para tratar JSON e registrar logs das requisições
app.use(bodyParser.json());
app.use(morgan('dev'));

// Rotas
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);

// Rota de exemplo para testar a API
app.get('/api/', (req, res) => {
  res.json({ message: 'API Finance App funcionando!' });
});

// Middleware global de erro
app.use(errorHandler);

module.exports = app;
