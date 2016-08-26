var http = require("http");


http.createServer(function function_name(req, res) {
	res.writeHead(200, {'content-Type': 'text/plain'});
	res.end('Hello Nodejs\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');