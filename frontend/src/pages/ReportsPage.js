// src/pages/ReportsPage.js
import React, { useEffect, useState } from 'react';
import { fetchExpenses, fetchIncomes } from '../api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import './ReportsPage.css';

// Registra componentes do chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Função para agrupar valores por nome
function groupByName(items) {
  const group = {};
  items.forEach((item) => {
    if (!group[item.name]) {
      group[item.name] = 0;
    }
    group[item.name] += item.value;
  });
  return group;
}

const ReportsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [expensesData, incomesData] = await Promise.all([
        fetchExpenses(),
        fetchIncomes()
      ]);
      setExpenses(expensesData);
      setIncomes(incomesData);
    } catch (error) {
      console.error('Erro ao carregar dados para relatórios:', error);
    }
  };

  // 1. Gráfico em pizza de despesas (por "name")
  const groupedExpenses = groupByName(expenses);
  const expenseLabels = Object.keys(groupedExpenses);
  const expenseValues = Object.values(groupedExpenses);

  // 2. Gráfico em pizza de ganhos (por "name")
  const groupedIncomes = groupByName(incomes);
  const incomeLabels = Object.keys(groupedIncomes);
  const incomeValues = Object.values(groupedIncomes);

  // 3. Rosquinha comparando total de ganhos, despesas e sobra
  const totalExpense = expenseValues.reduce((a, b) => a + b, 0);
  const totalIncome = incomeValues.reduce((a, b) => a + b, 0);
  const leftover = totalIncome - totalExpense;

  // Dados para o Doughnut: [ganhos, despesas, sobra]
  const donutData = {
    labels: ['Ganhos', 'Despesas', 'Sobra'],
    datasets: [
      {
        label: 'Resumo Financeiro',
        data: [totalIncome, totalExpense, leftover],
        backgroundColor: ['#4caf50', '#f44336', '#FFC107'],
        borderColor: ['#4caf50', '#f44336', '#FFC107'],
        borderWidth: 1,
      },
    ],
  };

  // 4. Gráfico de Comparativo Crédito x Débito (somente despesas)
  const creditSum = expenses
    .filter((exp) => exp.paymentType === 'crédito')
    .reduce((acc, exp) => acc + exp.value, 0);

  const debitSum = expenses
    .filter((exp) => exp.paymentType === 'débito')
    .reduce((acc, exp) => acc + exp.value, 0);

  const paymentTypeData = {
    labels: ['Crédito', 'Débito'],
    datasets: [
      {
        label: 'Forma de Pagamento (Despesas)',
        data: [creditSum, debitSum],
        backgroundColor: ['#9C27B0', '#03A9F4'],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="reports-container">
      <h2>Relatórios</h2>

      <div className="charts-section">
        {/* Gráfico de Pizza - Despesas */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Despesas por Nome</h3>
          {expenseLabels.length === 0 ? (
            <p>Nenhuma despesa cadastrada.</p>
          ) : (
            <Pie
              data={{
                labels: expenseLabels,
                datasets: [
                  {
                    label: 'Despesas',
                    data: expenseValues,
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#9C27B0',
                      '#03A9F4',
                      '#8BC34A',
                      '#FF9800',
                    ],
                    hoverOffset: 10,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          )}
        </motion.div>

        {/* Gráfico de Pizza - Ganhos */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Ganhos por Nome</h3>
          {incomeLabels.length === 0 ? (
            <p>Nenhum ganho cadastrado.</p>
          ) : (
            <Pie
              data={{
                labels: incomeLabels,
                datasets: [
                  {
                    label: 'Ganhos',
                    data: incomeValues,
                    backgroundColor: [
                      '#4caf50',
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#9C27B0',
                      '#03A9F4',
                      '#8BC34A',
                    ],
                    hoverOffset: 10,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          )}
        </motion.div>

        {/* Gráfico de Rosquinha - Ganhos x Despesas x Sobra */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Resumo Financeiro</h3>
          <Doughnut
            data={donutData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
              },
            }}
          />
        </motion.div>

        {/* Novo Gráfico - Comparativo Despesas no Crédito x Débito */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3>
            <FaMoneyCheckAlt style={{ marginRight: '6px' }} />
            Pagamentos (Crédito x Débito)
          </h3>
          {creditSum === 0 && debitSum === 0 ? (
            <p>Nenhuma despesa para exibir o comparativo.</p>
          ) : (
            <Pie
              data={paymentTypeData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          )}
        </motion.div>
      </div>

      <Link to="/" className="back-link">Voltar para Home</Link>
    </div>
  );
};

export default ReportsPage;
