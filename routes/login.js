const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../configs/dbConfiguration');

const SECRET_KEY = 'mousepad'; // Mantenha sua chave secreta segura

router.post('/', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const connection = await db.getConnection();

    // Consulta para encontrar o usuário na tabela usuarios
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    connection.release(); // Liberar conexão de volta para o pool

    if (rows.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    const user = rows[0];

    // Comparação direta da senha fornecida com a senha armazenada
    if (senha !== user.senha) {
      return res.status(401).send('Senha inválida');
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 }); // Token válido por 24 horas

    // Atualizar token no banco de dados (opcional, dependendo da sua implementação)
    const updateResult = await db.execute('UPDATE usuarios SET token = ? WHERE id = ?', [token, user.id]);

    res.status(200).send({ auth: true, token });
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).send('Erro interno no servidor.');
  }
});

module.exports = router;
