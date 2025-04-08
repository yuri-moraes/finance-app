// src/components/ExpenseForm.js
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaShoppingCart } from 'react-icons/fa';

const ExpenseForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(); // limpa o formulário
  };

  const today = new Date().toISOString().split('T')[0];
  const minDate = '1920-01-01';

  return (
    <motion.div
      className="form-card expense-card"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>
        <FaShoppingCart style={{ marginRight: '8px' }} />
        Adicionar Despesa
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label>
          Nome:
          <input
            type="text"
            placeholder="Ex.: Supermercado"
            {...register('name', {
              required: 'Nome da despesa é obrigatório',
              maxLength: {
                value: 50,
                message: 'Máximo de 50 caracteres'
              },
              pattern: {
                value: /^[^<>]*$/,
                message: 'Caracteres especiais < e > não são permitidos'
              }
            })}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </label>

        <label>
          Valor:
          <input
            type="number"
            step="0.01"
            placeholder="Ex.: 120.50"
            {...register('value', {
              required: 'Valor é obrigatório',
              min: {
                value: 0.01,
                message: 'Valor deve ser maior que zero'
              }
            })}
          />
          {errors.value && <p className="error-message">{errors.value.message}</p>}
        </label>

        <label>
          Data:
          <input
            type="date"
            max={today}
            min={minDate}
            placeholder="Selecione a data"
            {...register('date', {
              required: 'Data é obrigatória'
            })}
          />
          {errors.date && <p className="error-message">{errors.date.message}</p>}
        </label>

        <label>
          Pagamento:
          <select
            {...register('paymentType', {
              required: 'Selecione o tipo de pagamento'
            })}
          >
            <option value="crédito">Crédito</option>
            <option value="débito">Débito</option>
          </select>
          {errors.paymentType && (
            <p className="error-message">{errors.paymentType.message}</p>
          )}
        </label>

        <button type="submit">Adicionar Despesa</button>
      </form>
    </motion.div>
  );
};

export default ExpenseForm;
