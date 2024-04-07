module.exports = {
  languageOptions: {
    globals: {
      process: true,
      // Adicione outras variáveis globais aqui, se necessário
    },
  },
  rules: {
    // Configurações de regras do estilo Google
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'linebreak-style': ['error', 'windows'],
    'new-cap': 0      
  },
};
  
//use command npm run lint -- --fix