// src/components/IncomeForm.js
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaWallet } from 'react-icons/fa';

const IncomeForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(); // limpa o formulário após envio
  };

  const today = new Date().toISOString().split('T')[0];
  const minDate = '1920-01-01';

  return (
    <motion.div
      className="form-card income-card"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3>
        <FaWallet style={{ marginRight: '8px' }} />
        Adicionar Ganho
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label>
          Nome:
          <input
            type="text"
            placeholder="Ex.: Salário da Empresa"
            {...register('name', {
              required: 'Nome do ganho é obrigatório',
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
            placeholder="Ex.: 2500.00"
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
            min={minDate}
            max={today}
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
              required: 'Selecione um tipo de pagamento'
            })}
          >
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
            <option value="variável">Variável</option>
          </select>
          {errors.paymentType && (
            <p className="error-message">{errors.paymentType.message}</p>
          )}
        </label>

        <button type="submit">Adicionar Ganho</button>
      </form>
    </motion.div>
  );
};

export default IncomeForm;
