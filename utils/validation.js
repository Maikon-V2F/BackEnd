// utils/validation.js

function isValidEmail(email) {
    // Implemente sua lógica de validação de e-mail aqui
    return /\S+@\S+\.\S+/.test(email);
}

function isValidDate(date) {
    // Implemente sua lógica de validação de data aqui
    return !isNaN(Date.parse(date));
}

module.exports = {
    isValidEmail,
    isValidDate
};
