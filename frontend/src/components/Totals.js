import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Totals.css';
import { FaBalanceScale } from 'react-icons/fa';
import { FaWallet, FaShoppingCart, FaMousePointer } from 'react-icons/fa';

const Totals = ({ totalIncome, totalExpense, leftover }) => {
  const navigate = useNavigate();

  const handleIncomeClick = () => {
    navigate('/incomes');
  };

  const handleExpenseClick = () => {
    navigate('/expenses');
  };

  const isNegative = leftover < 0;
  const leftoverClass = isNegative ? 'negative-leftover' : 'positive-leftover';

  return (
    <section className="totals-section">
      {/* Ganho Total */}
      <motion.div
        className="total-card income-total clickable"
        onClick={handleIncomeClick}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="totals-card-header">
          <FaWallet className="card-icon" />
          <h2>Ganho Total</h2>
        </div>
        <p>R$ {totalIncome.toFixed(2)}</p>

        <motion.span
          className="clickable-label"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <FaMousePointer style={{ marginRight: '6px' }} />
        </motion.span>
      </motion.div>

      {/* Despesa Total */}
      <motion.div
        className="total-card expense-total clickable"
        onClick={handleExpenseClick}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="totals-card-header">
          <FaShoppingCart className="card-icon" />
          <h2>Despesa Total</h2>
        </div>
        <p>R$ {totalExpense.toFixed(2)}</p>

        <motion.span
          className="clickable-label"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <FaMousePointer style={{ marginRight: '6px' }} />
        </motion.span>
      </motion.div>

      {/* Sobra */}
      <motion.div
        className={`total-card expense-total ${leftoverClass}`}
        initial={{ x: 0, opacity: 0 }}
        animate={{
          opacity: 1,
          x: isNegative ? [0, -5, 5, -5, 5, 0] : 0
        }}
        transition={{
          duration: isNegative ? 0.6 : 0.5,
          delay: 0.2
        }}
      >
        <div className="totals-card-header">
          <FaBalanceScale className="leftover-icon" />
          <h2>Sobra</h2>
        </div>
        <p>R$ {leftover.toFixed(2)}</p>
      </motion.div>
    </section>
  );
};

export default Totals;
