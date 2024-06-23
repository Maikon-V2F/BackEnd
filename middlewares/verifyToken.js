const jwt = require('jsonwebtoken');
const db = require('../configs/dbConfiguration');

const SECRET_KEY = 'mousepad'; // Chave secreta usada para assinar o token JWT

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ auth: false, message: 'Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY); // Remove 'Bearer ' do token
    const userId = decoded.id;

    // Verifica se o token está associado a um usuário válido no banco de dados
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE id = ? AND token = ?', [userId, token.split(' ')[1]]);
    connection.release();

    if (rows.length === 0) {
      return res.status(401).json({ auth: false, message: 'Usuário não autorizado ou token inválido.' });
    }

    // Adiciona o objeto do usuário decodificado ao objeto de solicitação (opcional)
    req.user = decoded;

    next();
  } catch (err) {
    console.error('Erro na verificação do token:', err);
    return res.status(401).json({ auth: false, message: 'Token inválido.' });
  }
};

module.exports = verifyToken;
