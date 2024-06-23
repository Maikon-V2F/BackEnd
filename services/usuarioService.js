const connection = require('../configs/dbConfiguration');

const findAll = async () => {
  const usuarios = await (await connection).execute('SELECT * FROM usuarios');
  return usuarios[0];
}

const update = async (usuario) => {
  const query = 'UPDATE usuarios SET usuario = ?, senha = ?, WHERE id = ?';
  const isOk = await (await connection).execute(query, [usuario.usuario, usuario.senha, usuario.id]);
  return isOk[0].affectedRows === 1;
}

const save = async (usuario) => {
  const query = 'INSERT INTO usuarios(usuario, senha) VALUES(?, ?)';
  const isOk = await (await connection).execute(query, [usuario.usuario, usuario.senha]);
  return isOk[0].affectedRows === 1;
}

const remove = async (id) => {
  const query = 'DELETE FROM usuarios WHERE id = ?';
  const isOk = await (await connection).execute(query, [id]);
  return isOk[0].affectedRows === 1;
}

module.exports = {
  findAll, save, remove, update
};