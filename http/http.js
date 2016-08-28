var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(200, {'content-Type': 'text/plain'});
	res.write('what ? ');
	res.end('Hello, Node.js');

}).listen(2016);

console.log('你好!');
