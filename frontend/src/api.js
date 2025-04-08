// src/api.js

import axios from 'axios';

// Define a URL base para as requisições
const API_BASE_URL = 'https://finance-app-py76.onrender.com/api';

/* FUNÇÕES PARA GANHOS (incomes) */

/**
 * Busca todos os ganhos.
 * @returns {Promise<Array>} Array com os ganhos.
 */
export const fetchIncomes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incomes`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar ganhos:', error);
    throw error;
  }
};

/**
 * Cria um novo ganho.
 * @param {Object} income - Objeto do ganho.
 * @returns {Promise<Object>} Retorna os dados do ganho criado.
 */
export const createIncome = async (income) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/incomes`, income);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar ganho:', error);
    throw error;
  }
};

/**
 * Atualiza um ganho existente.
 * @param {number|string} id - ID do ganho a ser atualizado.
 * @param {Object} income - Objeto com os dados atualizados do ganho.
 * @returns {Promise<Object>} Retorna a resposta da atualização.
 */
export const updateIncome = async (id, income) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/incomes/${id}`, income);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar ganho (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * Remove um ganho.
 * @param {number|string} id - ID do ganho a ser removido.
 * @returns {Promise<Object>} Retorna a resposta da remoção.
 */
export const deleteIncome = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/incomes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao remover ganho (ID: ${id}):`, error);
    throw error;
  }
};

/* FUNÇÕES PARA DESPESAS (expenses) */

/**
 * Busca todas as despesas.
 * @returns {Promise<Array>} Array com as despesas.
 */
export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar despesas:', error);
    throw error;
  }
};

/**
 * Cria uma nova despesa.
 * @param {Object} expense - Objeto da despesa.
 * @returns {Promise<Object>} Retorna os dados da despesa criada.
 */
export const createExpense = async (expense) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar despesa:', error);
    throw error;
  }
};

/**
 * Atualiza uma despesa existente.
 * @param {number|string} id - ID da despesa a ser atualizada.
 * @param {Object} expense - Objeto com os dados atualizados da despesa.
 * @returns {Promise<Object>} Retorna a resposta da atualização.
 */
export const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/expenses/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar despesa (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * Remove uma despesa.
 * @param {number|string} id - ID da despesa a ser removida.
 * @returns {Promise<Object>} Retorna a resposta da remoção.
 */
export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao remover despesa (ID: ${id}):`, error);
    throw error;
  }
};
