// src/pages/IncomesListPage.js
import React, { useEffect, useState } from 'react';
import { fetchIncomes, deleteIncome, updateIncome } from '../api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ListPage.css';
import getPaymentIcon from "../utils/getPaymentIcon";
import formatDate from "../utils/formatDate";

const IncomesListPage = () => {
  const [incomes, setIncomes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingIncome, setEditingIncome] = useState({
    name: '',
    value: '',
    date: '',
    paymentType: '',
  });

  const loadIncomes = async () => {
    try {
      const data = await fetchIncomes();
      setIncomes(data);
    } catch (error) {
      console.error('Erro ao carregar ganhos:', error);
    }
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este ganho?')) {
      try {
        await deleteIncome(id);
        loadIncomes();
      } catch (error) {
        console.error('Erro ao excluir ganho:', error);
      }
    }
  };

  // Ativa o modo de edição para um item
  const startEditing = (income) => {
    setEditingId(income.id);
    setEditingIncome({
      name: income.name,
      value: income.value,
      date: income.date,
      paymentType: income.paymentType,
    });
  };

  // Atualiza os valores do formulário de edição
  const handleEditChange = (e) => {
    setEditingIncome({ ...editingIncome, [e.target.name]: e.target.value });
  };

  // Confirma a atualização do item editado
  const handleEditSubmit = async (id) => {
    try {
      await updateIncome(id, {
        name: editingIncome.name,
        value: parseFloat(editingIncome.value),
        date: editingIncome.date,
        paymentType: editingIncome.paymentType,
      });
      setEditingId(null);
      loadIncomes();
    } catch (error) {
      console.error(`Erro ao atualizar ganho (ID: ${id}):`, error);
    }
  };

  // Cancela o modo de edição
  const cancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="list-page-container">
      <h2>Lista de Ganhos</h2>
      {/* Aplica animação de fade-in no UL */}
      <motion.ul
        className="list-page"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {incomes.map((income, index) => (
          <motion.li
            key={income.id}
            className="list-item"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }} /* animação incremental */
          >
            {editingId === income.id ? (
              // Modo de edição
              <div className="item-details">
                <input
                  type="text"
                  name="name"
                  value={editingIncome.name}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="value"
                  step="0.01"
                  value={editingIncome.value}
                  onChange={handleEditChange}
                />
                <input
                  type="date"
                  name="date"
                  value={editingIncome.date}
                  onChange={handleEditChange}
                />
                <select
                  name="paymentType"
                  value={editingIncome.paymentType}
                  onChange={handleEditChange}
                >
                  <option value="mensal">Mensal</option>
                  <option value="anual">Anual</option>
                  <option value="variável">Variável</option>
                </select>
              </div>
            ) : (
              // Modo de visualização
              <div className="item-details">
                <span className="item-name">{income.name}</span>
                <span className="item-value">R$ {parseFloat(income.value).toFixed(2)}</span>
                <span className="item-date">{formatDate(income.date)}</span>
                {/* Ícone indicando o tipo de pagamento */}
                <span className="item-payment">
                  {getPaymentIcon(income.paymentType)}
                  {income.paymentType}
                </span>
              </div>
            )}
            <div className="item-actions">
              {editingId === income.id ? (
                <>
                  <button
                    onClick={() => handleEditSubmit(income.id)}
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
                    onClick={() => startEditing(income)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(income.id)}
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

export default IncomesListPage;
