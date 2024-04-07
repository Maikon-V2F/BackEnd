//Chame o módulo HTTP
var http = require("http");
//Crie um servidor HTTP para ouvir as requisições na porta 8000
http.createServer(function (req, resp) {
 // Configure o resposta HTTP header com o HTTP status e Content type
 resp.writeHead(200, {'Content-Type': 'text/plain'});
 // Envie a resposta do body "Ola Mundo!"
 resp.end('Ola Mundo!\n');
}).listen(8000);
// Imprima URL para acessar o servidor
console.log('Server running at http://localhost:8000/')