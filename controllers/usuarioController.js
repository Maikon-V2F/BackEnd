const usuarioService = require('../services/usuarioService');

const findAll = async (request, response) => {
  const produtos = await usuarioService.findAll();
  return response.status(200).json(produtos);
};

const save = async (request, response) => {
  const result = await usuarioService.save(request.body);
  return result ?
    response.status(200).json() :
    response.status(400).json({ '[ERROR/SERVER]': 'Falha ao salvar usuario' });
};

const update = async (request, response) => {
  const result = await usuarioService.update(request.body);
  return result ?
    response.status(200).json() :
    response.status(400).json({ '[ERROR/SERVER]': 'Falha ao atualizar usuario' });
};

const remove = async (request, response) => {
  const { id } = request.params;
  const result = await usuarioService.remove(id);
  return result ?
    response.status(200).json() :
    response.status(400).json({ '[ERROR/SERVER]': 'Falha ao remover usuario' });
};

const logout = async (request, response) => {
  const { id } = request.body;
  const result = await usuarioService.logout(id);
  return result ?
    response.status(200).json() :
    response.status(400).json({ '[ERROR/SERVER]': 'Falha ao deslogar usuario' });
};

module.exports = {
  findAll, save, remove, update, logout
};
