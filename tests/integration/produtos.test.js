const request = require('supertest');
const app = require('../../app.js'); // Supondo que seu arquivo principal do servidor seja `app.js` ou `app.ts`

describe('Testes para o Endpoint de Produtos', () => {
  it('Deve criar um novo produto', async () => {
    const novoProduto = {
      nome: 'Produto Teste',
      descricao: 'Descrição do produto teste',
      preco: 49.99
    };

    const response = await request(app)
      .post('/produtos')
      .send(novoProduto);

    expect(response.status).toBe(201); // Verifique se o status esperado é 201 para criação
    expect(response.body).toHaveProperty('id'); // Verifique se o corpo da resposta contém um ID
  });

  it('Deve retornar status 400 ao tentar criar produto com dados inválidos', async () => {
    const produtoInvalido = {
      nome: 'Produto Inválido'
      // Faltando campos obrigatórios ou com dados inválidos
    };

    const response = await request(app)
      .post('/produtos')
      .send(produtoInvalido);

    expect(response.status).toBe(400); // Verifique se o status esperado é 400 para dados inválidos
    // Adicione mais expectativas conforme necessário para verificar mensagens de erro ou outros detalhes
  });

  // Adicione mais testes conforme necessário para outros cenários do endpoint de produtos
});
