var  http = require('http');

var  url = '127.0.0.1';

var port = 1338;

http.createServer((req, res) => {
	res.writeHead(200, {'content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(port, hostname, () => {
	console.log('Server running at http://$(hostname}: ${port} /');
});




