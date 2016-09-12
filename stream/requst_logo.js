var http = require('http');
var fs = require('fs');

var request = require('request');

http
	.createServer(function(req, res) {
		//方法一：使用普通的读写文件
		// fs.readFile('../buffer/logo.png', function(err, data) {
		// 	if (err) {
		// 		res.end('file not exist!');
		// 	} else {
		// 		res.writeHeader(200, {'Context-Type': 'text/html'});
		// 		res.end(data);
		// 	}
		// });
		//方法二： 使用pipe
		// fs.createReadStream('../buffer/logo.png').pipe(res);
		// 方法三： 利用request模块，实现了边下载边pipe
		request('http://www.imooc.com/static/img/index/logo.png')
			.pipe(res);
	})
	.listen(8090);
	//要查看效果，在浏览器中输入：localhost:8090 
	//网页正文显示logo.png图片，那么就说明正常的。