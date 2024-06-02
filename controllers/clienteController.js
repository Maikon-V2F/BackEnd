const clienteService = require('../services/clienteService');
const cache = require('../cache');
const logger = require('../logger');

const findAll = async (request, response) => {
  const cacheKey = 'clientes';
  const cachedClientes = cache.get(cacheKey);

  if (cachedClientes) {
    logger.info('Requisição atendida pelo cache');
    return response.status(200).json(cachedClientes);
  } else {
    logger.info('Requisição atendida pelo banco de dados');
    const clientes = await clienteService.findAll();
    cache.set(cacheKey, clientes);
    return response.status(200).json(clientes);
  }
};

const save = async (request, response) => {
  const result = await clienteService.save(request.body);
  if (result) {
    clearClientesCache();
    return response.status(200).json();
  } else {
    return response.status(400).json({ '[ERROR/SERVER]': 'Falha ao salvar cliente' });
  }
};

const update = async (request, response) => {
  const result = await clienteService.update(request.body);
  if (result) {
    clearClientesCache();
    return response.status(200).json();
  } else {
    return response.status(400).json({ '[ERROR/SERVER]': 'Falha ao atualizar cliente' });
  }
};

const remove = async (request, response) => {
  const { id } = request.params;
  const result = await clienteService.remove(id);
  if (result) {
    clearClientesCache();
    return response.status(200).json();
  } else {
    return response.status(400).json({ '[ERROR/SERVER]': 'Falha ao remover cliente' });
  }
};

// Função para limpar o cache quando houver alteração na tabela de clientes
const clearClientesCache = () => {
  cache.del('clientes');
  logger.info('Cache de clientes limpo devido a alteração na tabela de clientes');
};

module.exports = {
  findAll, save, remove, update
};
