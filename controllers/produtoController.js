const produtoService = require('../services/produtoService');

const findAll = async (request, response) => {
  const produtos = await produtoService.findAll();
  return response.status(200).json(produtos);
};

const save = async (request, response) => {
  const result = await produtoService.save(request.body);
  return result ?
    response.status(200).json() :
    response.status(400).json({ '[ERROR/SERVER]': 'Falha ao salvar produto' });
};

const update = async (request, response) => {
  const result = await produtoService.update(request.body);
  return result ?
    response.status(200).json() :
    response.status(400).json({ '[ERROR/SERVER]': 'Falha ao atualizar produto' });
};

const remove = async (request, response) => {
  const { id } = request.params;
  const result = await produtoService.remove(id);
  return result ?
    response.status(200).json() :
    response.status(400).json({ '[ERROR/SERVER]': 'Falha ao remover produto' });
};

module.exports = {
  findAll, save, remove, update
};
   