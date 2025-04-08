// src/utils/getPaymentIcon.js
import { FaCreditCard, FaMoneyBillWave, FaCalendarAlt, FaCalendarCheck, FaInfinity } from 'react-icons/fa';

export default function getPaymentIcon(paymentType) {
  // Mapeamento para Incomes (ganhos)
  switch (paymentType) {
    case 'crédito': return <FaCreditCard className="payment-icon" />;
    case 'débito':  return <FaMoneyBillWave className="payment-icon" />;
    case 'anual':   return <FaCalendarAlt className="payment-icon" />;
    case 'mensal':  return <FaCalendarCheck className="payment-icon" />;
    case 'variável':return <FaInfinity className="payment-icon" />;
    default:        return null;
  }
}

export function getExpenseIcon(paymentType) {
  // Mapeamento para Expenses (despesas)
  switch (paymentType) {
    case 'crédito': return <FaCreditCard className="payment-icon" />;
    case 'débito':  return <FaMoneyBillWave className="payment-icon" />;
    default:        return null;
  }
}
