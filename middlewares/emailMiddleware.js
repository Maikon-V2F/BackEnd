const validateEmail = (request, response, next) => {
  const { body } = request;
  const email = body.email;

  if (!email) {
    return response.status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  // Expressão regular para validar o formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return response.status(400)
      .json({ message: 'Por favor, insira um endereço de email válido' });
  }

  next();
};
module.exports = { validateEmail };