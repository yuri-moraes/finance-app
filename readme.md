# Gerenciador Financeiro

Este projeto consiste em um sistema de **Gerenciamento de Finanças Pessoais**, que inclui:

- **Frontend** em React, exibindo ganhos, despesas, gráficos (relatórios) e um painel de controle para editar registros.  
- **Backend** em Node.js/Express, que disponibiliza as rotas de API para criar, editar e remover ganhos e despesas.  
- **Testes E2E** com Cypress, para garantir o funcionamento do fluxo completo.  
- **Testes Unitários/Integração** com Jest e React Testing Library (opcional).

## Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Instalação e Execução](#instalação-e-execução)
5. [Rotas do Backend](#rotas-do-backend)
6. [Testes](#testes)
7. [Mock do Backend](#mock-do-backend)
8. [Contribuindo](#contribuindo)
9. [Licença](#licença)

---

## Visão Geral

O **Gerenciador Financeiro** permite que o usuário:

- Cadastre seus **ganhos** (valor, data, tipo de pagamento)  
- Cadastre suas **despesas** (valor, data, tipo de pagamento)  
- Visualize **totais** mensais de ganhos e despesas, bem como a **sobra** (diferença)  
- Edite ou exclua **ganhos e despesas** existentes  
- Veja **relatórios** em formato de gráfico (Pizza e Rosquinha) para facilitar análise de gastos e receitas  

É ideal para quem precisa de um **painel simples** e **intuitivo** para controlar as finanças, com layout minimalista mas funcional, e testes que garantem a qualidade do produto.

---

## Tecnologias Utilizadas

- **Frontend**
  - [React](https://reactjs.org/)
  - [React Router DOM](https://reactrouter.com/) (para navegação entre páginas, caso necessário)
  - [React Icons](https://react-icons.github.io/react-icons/) (ícones)
  - [framer-motion](https://www.framer.com/motion/) (animações leves)
  - [axios](https://axios-http.com/) (requisições HTTP)
  - [chart.js](https://www.chartjs.org/) e [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2) (gráficos)
- **Backend**
  - [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
  - [SQLite](https://www.sqlite.org/index.html) (ou outro BD) para armazenamento de dados
  - [cors](https://www.npmjs.com/package/cors) (para permitir acesso do frontend)
- **Testes**
  - [Cypress](https://www.cypress.io/) (E2E)
  - [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (tests unitários/integrados no front)
- **Ferramentas de Build**
  - [Create React App](https://create-react-app.dev/) (no frontend)
  - [npm Scripts] (para start, build etc.)

---

## Estrutura de Pastas

```
finance-app/
├── backend/
│   ├── src/
│   │   ├── app.js           # Configuração do Express, rotas etc.
│   │   ├── database/
│   │   │   └── db.js        # Conexão com o banco (SQLite)
│   │   ├── controllers/
│   │   │   ├── expenseController.js
│   │   │   └── incomeController.js
│   │   ├── middlewares/
│   │   │   ├── validateExpense.js
│   │   │   └── validateIncome.js
│   │   ├── routes/
│   │   │   ├── expenseRoutes.js
│   │   │   └── incomeRoutes.js
│   │   └── server.js        # Inicia o servidor
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Totals.js
│   │   │   ├── IncomeForm.js
│   │   │   └── ExpenseForm.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   └── ReportsPage.js
│   │   ├── api.js           # Funções para requisições (fetchExpenses, etc.)
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
├── cypress/
│   ├── e2e/
│   │   └── app.cy.js        # Testes E2E
│   ├── fixtures/
│   │   ├── incomes.json
│   │   └── expenses.json
│   └── ...
├── .gitignore
├── README.md
└── ...
```

---

## Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/usuario/finance-app.git
cd finance-app
```

### 2. Configurar o Backend

```bash
cd backend
npm install
```

- Ajustar `.env` se necessário (porta, DB_PATH etc.)
- Iniciar:
  ```bash
  npm start
  ```
  O servidor Express deve rodar em `http://localhost:3001` (ou outra porta definida).

### 3. Configurar o Frontend

Em outro terminal:

```bash
cd frontend
npm install
```

- Ajustar a porta ou proxy no `package.json` se quiser redirecionar para `http://localhost:3001`
- Iniciar:
  ```bash
  npm start
  ```
  Abra `http://localhost:3000` no navegador.

---

## Rotas do Backend

- **POST /api/incomes**  
  Cria um novo ganho. Campos: `{ name, value, date, paymentType }`
- **GET /api/incomes**  
  Lista todos os ganhos.
- **PUT /api/incomes/:id**  
  Edita um ganho existente.
- **DELETE /api/incomes/:id**  
  Remove um ganho.

- **POST /api/expenses**  
  Cria uma nova despesa. Campos: `{ name, value, date, paymentType }`
- **GET /api/expenses**  
  Lista todas as despesas.
- **PUT /api/expenses/:id**  
  Edita uma despesa existente.
- **DELETE /api/expenses/:id**  
  Remove uma despesa.

Você pode ajustar conforme sua implementação exata.

---

## Testes

### Testes End-to-End (Cypress)

Na raiz do projeto (ou no `frontend`, dependendo de onde você instalou o Cypress):

```bash
npm run cypress
```
ou
```bash
npx cypress open
```
Abre a interface do Cypress; selecione o teste `app.cy.js`.  
Ele simula o fluxo principal da aplicação (carrega a Home, adiciona ganhos e despesas, navega para Relatórios etc.).

### Testes Unitários / Integração (Front-end)

Use o comando:

```bash
npm test
```
(ou `npm run test`) dentro de `frontend/`, que executa Jest + React Testing Library nos componentes.

### Testes do Backend

Se tiver testes no backend, execute:

```bash
cd backend
npm test
```

---

## Mock do Backend

Para rodar testes E2E sem depender do servidor real, utilizamos **`cy.intercept()`** no Cypress e **fixtures** em `cypress/fixtures`. Exemplo:

```js
cy.intercept('GET', '**/api/incomes', { fixture: 'incomes.json' });
cy.intercept('POST', '**/api/incomes', {
  statusCode: 201,
  body: { id: 99, name: 'Salário Teste', value: 2500, date: '2025-05-10', paymentType: 'mensal' }
});
```

Assim, podemos simular dados falsos para cada requisição e garantir maior controle sobre os testes.

---

## Contribuindo

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Commit e push suas alterações (`git commit -m 'Adiciona nova feature'` e `git push origin feature/nova-funcionalidade`).
4. Abra um Pull Request explicando o que foi feito.

---

## Licença

[MIT License](LICENSE) – Sinta-se livre para usar e modificar. Veja o arquivo LICENSE para mais detalhes.