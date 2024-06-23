const jwt = require('jsonwebtoken');

const chaveSecreta = 'mousepad';

const gerarToken = (dados) => {
  return jwt.sign(dados, chaveSecreta);
};

const verificarToken = (token) => {
  try {
    return jwt.verify(token, chaveSecreta);
  } catch (err) {
    return null; // Retornar null se a verificação falhar
  }
};

module.exports = { gerarToken, verificarToken };
