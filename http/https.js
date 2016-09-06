var https = require('https');
var fs = require('fs');

// 本地需要有这两个证书文件，才能启用https服务
var options = {
	key: fs.readFileSync('ssh_key.pem'),
	cert: fs.readFileSync('ssh_cert.pem')
};

https
	.createServer(options, function(req, res) {
		res.writeHead(200);
		res.end('Hello Imooc');
	})
	.Listen(8090);
