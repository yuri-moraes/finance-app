import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import IncomesListPage from './pages/IncomesListPage';
import ExpensesListPage from './pages/ExpensesListPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incomes" element={<IncomesListPage />} />
        <Route path="/expenses" element={<ExpensesListPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
