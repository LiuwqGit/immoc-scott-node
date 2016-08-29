var http = require('http');
var url = 'http://study.163.com/find.htm#/courselist?ct=400000000031644';

http.get(url, function(res) {
	var html = '';
	res.on('data', function(data) {
		html += data;
	});
	res.on('end', function() {
		console.log(html);
	});
}).on('error', function() {
	console.log('抓取网站失败!');
});