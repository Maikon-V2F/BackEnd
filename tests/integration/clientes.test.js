const request = require('supertest');
const app = require('../../app.js'); // Supondo que seu arquivo principal do servidor seja `app.js` ou `app.ts`
const jwt = require('jsonwebtoken');

describe('Testes para o Endpoint de Clientes', () => {
  let token; // Variável para armazenar o token JWT válido

  beforeAll(() => {
    // Simula a autenticação e obtém um token JWT válido para os testes
    token = jwt.sign({ id: 'usuario_id' }, 'chave_secreta', { expiresIn: '1h' });
  });

  it('Deve criar um novo cliente', async () => {
    const novoCliente = {
      nome: 'Fulano',
      sobrenome: 'Silva',
      email: 'fulano@teste.com',
      idade: 30
    };

    const response = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);

    expect(response.status).toBe(201); // Verifique se o status esperado é 201 para criação
    expect(response.body).toHaveProperty('id'); // Verifique se o corpo da resposta contém um ID
  });

  it('Deve retornar status 400 ao tentar criar cliente com dados inválidos', async () => {
    const clienteInvalido = {
      nome: 'Beltrano'
      // Faltando campos obrigatórios ou com dados inválidos
    };

    const response = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(clienteInvalido);

    expect(response.status).toBe(400); // Verifique se o status esperado é 400 para dados inválidos
    // Adicione mais expectativas conforme necessário para verificar mensagens de erro ou outros detalhes
  });

  // Adicione mais testes conforme necessário para outros cenários do endpoint de clientes
});
