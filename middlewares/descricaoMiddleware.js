const validateDescription = (request, response, next) => {
  const { body } = request;
  const description = body.descricao;

  if (!description) {
    return response.status(400)
      .json({ message: 'O campo "descrição" é obrigatório' });
  }

  next();
};
module.exports = { validateDescription };