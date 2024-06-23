const request = require('supertest');
const app = require('../../app.js'); // Arquivo principal do seu servidor
const { isValidEmail, isValidDate } = require('../../utils/validation'); // Funções de validação específicas

describe('Validação de Campos', () => {
  it('Deve validar os campos corretamente', async () => {
    // Exemplo de dados para teste
    const dados = {
      nome: 'João',
      sobrenome: 'Silva',
      produto: 'Camiseta',
      descricao: 'Descrição do produto',
      email: 'joao@example.com',
      idade: 30,
      preco: 50.00,
      data: '2023-01-15', // Data válida entre 1 de Janeiro de 2000 até 20 de Junho de 2024
    };

    // Teste para validar tamanho dos campos nome, sobrenome, produto, descrição
    expect(dados.nome.length).toBeGreaterThanOrEqual(3);
    expect(dados.nome.length).toBeLessThanOrEqual(255);
    expect(dados.sobrenome.length).toBeGreaterThanOrEqual(3);
    expect(dados.sobrenome.length).toBeLessThanOrEqual(255);
    expect(dados.produto.length).toBeGreaterThanOrEqual(3);
    expect(dados.produto.length).toBeLessThanOrEqual(255);
    expect(dados.descricao.length).toBeGreaterThanOrEqual(3);
    expect(dados.descricao.length).toBeLessThanOrEqual(255);

    // Teste para validar email válido
    expect(isValidEmail(dados.email)).toBe(true);

    // Teste para validar idade positiva e menor que 120
    expect(dados.idade).toBeGreaterThan(0);
    expect(dados.idade).toBeLessThan(120);

    // Teste para validar preço positivo
    expect(dados.preco).toBeGreaterThan(0);

    // Teste para validar data como uma data válida entre 1 de Janeiro de 2000 até 20 de Junho de 2024
    expect(isValidDate(dados.data)).toBe(true);

    // Teste para verificar se a chamada para a endpoint /usuarios funciona
    const responseUsuarios = await request(app).get('/usuarios');
    expect(responseUsuarios.status).toBe(200);

    // Teste para verificar se a chamada para a endpoint /clientes possui token
    const responseClientes = await request(app)
      .get('/clientes')
      .set('Authorization', 'Bearer SEU_TOKEN_VALIDO_AQUI');
    expect(responseClientes.status).toBe(200);
  });
});
