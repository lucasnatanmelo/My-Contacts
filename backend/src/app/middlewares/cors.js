module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // 1
  response.setHeader('Access-Control-Allow-Methods', '*'); // 2
  response.setHeader('Access-Control-Allow-Headers', '*'); // 3
  response.setHeader('Access-Control-Max-Age', '10'); // 4
  next();
};

// * libera todos os outros métodos que não são os métodos simples
// ou seja, os métodos preflights

// Aula Simple vs Preflighted requests

// 1 - Libera a origem para quem irá receber os dados
// 2 - Libera todos os métodos que não são simples - Preflighted requests
// 3 - Libera todos os métodos do cabeçalho
// 4 - Determina o limite do cache dos headers em segundos (-1 desabilita)
