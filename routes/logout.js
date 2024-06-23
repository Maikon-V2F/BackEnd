const express = require('express');
const router = express.Router();
const db = require('../configs/dbConfiguration');

router.post('/', async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ success: false, message: 'Usuário e senha são necessários.' });
  }

  try {
    const connection = await db.getConnection();

    // Verifica se o usuário e a senha correspondem a um usuário no banco de dados
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE usuario = ? AND senha = ?', [usuario, senha]);

    if (rows.length === 0) {
      // Se nenhum usuário foi encontrado com essas credenciais
      connection.release();
      return res.status(400).json({ success: false, message: 'Credenciais inválidas.' });
    }

    // Atualiza o token para NULL na tabela usuarios onde o usuario e senha são correspondentes
    const [result] = await connection.execute('UPDATE usuarios SET token = NULL WHERE usuario = ? AND senha = ?', [usuario, senha]);

    connection.release();

    if (result.affectedRows === 0) {
      // Se nenhuma linha foi afetada, algo deu errado
      return res.status(400).json({ success: false, message: 'Erro ao deslogar. Tente novamente.' });
    }

    res.status(200).json({ success: true, message: 'Logout realizado com sucesso.' });
  } catch (err) {
    console.error('Erro no logout:', err);
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
});

module.exports = router;
