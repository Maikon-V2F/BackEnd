const validatePrice = (request, response, next) => {
  const { body } = request;
  const price = body.preco;

  if (price === undefined || price === '') {
    return response.status(400)
      .json({ message: 'O campo "preço" é obrigatório' });
  }

  // Verifica se o preço é um número válido
  if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
    return response.status(400)
      .json({ message: 'O campo "preço" deve ser um número positivo' });
  }

  // Você pode adicionar outras validações específicas para o preço, se necessário

  next();
};
module.exports = { validatePrice };