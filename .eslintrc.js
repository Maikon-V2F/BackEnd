module.exports = {
  languageOptions: {
    globals: {
      process: true,
    },
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'linebreak-style': ['error', 'windows'],
    'new-cap': 0      
  },
};
  
//use command npm run lint -- --fix