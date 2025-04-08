import React from 'react';
import { motion } from 'framer-motion';

const Header = () => (
  <motion.header
    className="app-header"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1>Gerenciador Financeiro</h1>
  </motion.header>
);

export default Header;
