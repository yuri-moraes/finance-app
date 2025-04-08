// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Totals from '../components/Totals';
import IncomeForm from '../components/IncomeForm';
import ExpenseForm from '../components/ExpenseForm';
import { fetchIncomes, fetchExpenses, createIncome, createExpense } from '../api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartPie } from 'react-icons/fa'; // Ícone de relatórios
import '../App.css';

const Home = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [incomesData, expensesData] = await Promise.all([
        fetchIncomes(),
        fetchExpenses()
      ]);
      setIncomes(incomesData);
      setExpenses(expensesData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const totalIncome = incomes.reduce((acc, inc) => acc + inc.value, 0);
  const totalExpense = expenses.reduce((acc, exp) => acc + exp.value, 0);
  const leftover = totalIncome - totalExpense;

  // Handlers para criar ganhos/despesas
  const handleAddIncome = async (formData) => {
    try {
      await createIncome({ ...formData, value: parseFloat(formData.value) });
      fetchData();
    } catch (error) {
      console.error('Erro ao adicionar ganho:', error);
    }
  };

  const handleAddExpense = async (formData) => {
    try {
      await createExpense({ ...formData, value: parseFloat(formData.value) });
      fetchData();
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
    }
  };

  return (
    <div className="app-container">
      <Header />

      {/* Cartão/link de Relatórios animado */}
      <motion.div
        className="reports-link-card"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/reports" className="reports-link">
          <FaChartPie className="reports-icon" />
          <span>Ver Relatórios Financeiros</span>
        </Link>
      </motion.div>

      {/* Seção para Totals e Leftover lado a lado */}
      <section className="totals-section">
        <Totals totalIncome={totalIncome} totalExpense={totalExpense} leftover={leftover} />
      </section>

      <section className="forms-section">
        <IncomeForm onSubmit={handleAddIncome} />
        <ExpenseForm onSubmit={handleAddExpense} />
      </section>
    </div>
  );
};

export default Home;
