/// <reference types="cypress" />

describe('Fluxo principal da aplicação', () => {

    const HOME_URL = 'http://localhost:3000';
  
    beforeEach(() => {
      // Se necessário, limpe o banco ou configure mocks. Caso não tenha esse passo, ignore.
      // ex: cy.request('POST', 'http://localhost:3001/tests/reset');
    });
  
    it('Deve carregar a Home e exibir Totals', () => {
      cy.visit(HOME_URL);
  
      // Verifica se o cabeçalho existe
      cy.contains('Gerenciador Financeiro').should('be.visible');
  
      // Verifica se exibe Ganho Total, Despesa Total, etc.
      cy.contains('Ganho Total').should('be.visible');
      cy.contains('Despesa Total').should('be.visible');
    });
  
    it('Deve adicionar um novo ganho e verificar a soma', () => {
      cy.visit(HOME_URL);
  
      // Preencher o formulário de ganho
      cy.get('input[name="name"]').first().clear().type('Salário Teste');
      cy.get('input[name="value"]').first().clear().type('2500');
      cy.get('input[name="date"]').first().type('2025-05-10');
      cy.get('select[name="paymentType"]').first().select('mensal');
      cy.get('button[type="submit"]').contains('Adicionar Ganho').click();
  
      // Verificar se o Ganho Total atualizou
      cy.contains('R$ 2500.00').should('exist');
    });
  
    it('Deve adicionar uma nova despesa e verificar a soma', () => {
      cy.visit(HOME_URL);
  
      // Preencher o formulário de despesa
      // (assumindo que a despesa form seja o "segundo" do forms-section, ajuste se diferente)
      cy.get('input[name="name"]').eq(1).clear().type('Conta de Luz');
      cy.get('input[name="value"]').eq(1).clear().type('300');
      cy.get('input[name="date"]').eq(1).type('2025-05-15');
      cy.get('select[name="paymentType"]').eq(1).select('crédito');
      cy.get('button[type="submit"]').contains('Adicionar Despesa').click();
  
      // Verificar se a despesa total atualizou
      cy.contains('R$ 300.00').should('exist');
    });
  
    it('Deve editar um ganho existente', () => {
      cy.visit(HOME_URL);
  
      // Supondo que exista uma lista de ganhos
      // Acesse a lista de ganhos. Ajuste se for outra rota ou se a edição for inline na Home
      cy.contains('Ver Relatórios Financeiros').should('exist'); // ver se link existe
  
      // Se a edição é inline, precisamos de um seletor para o item e o botão de editar
      // Exemplo: "Editar" ganho chamado "Salário Teste"
      // (Ajuste para a rota e a forma real de edição que você tem)
      cy.contains('Salário Teste')
        .parent()       // item container
        .find('button') // acha o botão "Editar"
        .contains('Editar')
        .click();
  
      // Editar valor e salvar
      cy.get('input[type="number"]').clear().type('2800');
      cy.get('button').contains('Salvar').click();
  
      // Verifica se atualizou para 2800 no total
      cy.contains('R$ 2800.00').should('exist');
    });
  
    it('Deve editar uma despesa existente', () => {
      cy.visit(HOME_URL);
  
      // Supondo que exista "Conta de Luz"
      cy.contains('Conta de Luz')
        .parent()
        .find('button')
        .contains('Editar')
        .click();
  
      // Editar valor e salvar
      cy.get('input[type="number"]').clear().type('350');
      cy.get('button').contains('Salvar').click();
  
      // Verifica se aparece R$ 350.00
      cy.contains('R$ 350.00').should('exist');
    });
  
    it('Deve navegar para a página de Relatórios e exibir gráficos', () => {
      cy.visit(HOME_URL);
  
      // Clica no link de relatórios
      cy.contains('Ver Relatórios Financeiros').click();
  
      // Verifica se mudou para a rota /reports
      cy.url().should('include', '/reports');
  
      // Verifica se aparece o texto "Relatórios" e algum gráfico
      cy.contains('Relatórios').should('be.visible');
      cy.contains('Despesas por Nome').should('be.visible');
      cy.contains('Ganhos por Nome').should('be.visible');
      cy.contains('Resumo Financeiro').should('be.visible');
      cy.contains('Pagamentos (Crédito x Débito)').should('be.visible');
    });
  });
  