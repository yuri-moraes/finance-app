import React, { useEffect, useState } from 'react';
import { fetchExpenses, deleteExpense, updateExpense } from '../api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ListPage.css';
import { getExpenseIcon } from '../utils/getPaymentIcon';
import formatDate from '../utils/formatDate';

const ExpensesListPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingExpense, setEditingExpense] = useState({
    name: '',
    value: '',
    date: '',
    paymentType: '',
  });

  // Carrega as despesas da API
  const loadExpenses = async () => {
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Erro ao carregar despesas:', error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Exclui uma despesa específica
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
      try {
        await deleteExpense(id);
        loadExpenses();
      } catch (error) {
        console.error('Erro ao excluir despesa:', error);
      }
    }
  };

  // Ativa o modo de edição para um item
  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditingExpense({
      name: expense.name,
      value: expense.value,
      date: expense.date,
      paymentType: expense.paymentType,
    });
  };

  // Atualiza os valores do formulário de edição local
  const handleEditChange = (e) => {
    setEditingExpense({ ...editingExpense, [e.target.name]: e.target.value });
  };

  // Confirma a edição e atualiza a despesa
  const handleEditSubmit = async (id) => {
    try {
      await updateExpense(id, {
        name: editingExpense.name,
        value: parseFloat(editingExpense.value),
        date: editingExpense.date,
        paymentType: editingExpense.paymentType,
      });
      setEditingId(null);
      loadExpenses();
    } catch (error) {
      console.error(`Erro ao atualizar despesa (ID: ${id}):`, error);
    }
  };

  // Cancela o modo de edição
  const cancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="list-page-container">
      <h2>Lista de Despesas</h2>
      <motion.ul
        className="list-page"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {expenses.map((expense, index) => (
          <motion.li
            key={expense.id}
            className="list-item"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {editingId === expense.id ? (
              // Modo de edição
              <div className="item-details">
                <input
                  type="text"
                  name="name"
                  value={editingExpense.name}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="value"
                  step="0.01"
                  value={editingExpense.value}
                  onChange={handleEditChange}
                />
                <input
                  type="date"
                  name="date"
                  value={editingExpense.date}
                  onChange={handleEditChange}
                />
                <select
                  name="paymentType"
                  value={editingExpense.paymentType}
                  onChange={handleEditChange}
                >
                  <option value="crédito">Crédito</option>
                  <option value="débito">Débito</option>
                </select>
              </div>
            ) : (
              // Modo de visualização
              <div className="item-details">
                <span className="item-name">{expense.name}</span>
                <span className="item-value">R$ {parseFloat(expense.value).toFixed(2)}</span>
                <span className="item-date">{formatDate(expense.date)}</span>
                <span className="item-payment">
                  {getExpenseIcon(expense.paymentType)}
                  {expense.paymentType}
                </span>
              </div>
            )}
            <div className="item-actions">
              {editingId === expense.id ? (
                <>
                  <button
                    onClick={() => handleEditSubmit(expense.id)}
                    className="edit-button"
                  >
                    Salvar
                  </button>
                  <button onClick={cancelEditing} className="delete-button">
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(expense)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="delete-button"
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
      <Link to="/" className="back-link">Voltar para Home</Link>
    </div>
  );
};

export default ExpensesListPage;
