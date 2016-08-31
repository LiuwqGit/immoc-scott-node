var http = require('http');

//可以将对象序列化
var querystring = require('querystring');

// 
// 把评论内容，单独作为一个对象传入
// 
// 
var contentData = {
	'content': '我要中文contentData,感谢支持!',
	'cid': 348
};

var postData = querystring.stringify(contentData);

var options = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip,deflate',
		'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Content-Length': postData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'imooc_uuid=37d538ae-9160-4e8c-84d9-a0e2548f1ce8; imooc_isnew_ct=1471278694; loginstate=1; apsid=U4ZGJmZmNjZmQ4NjBkNTMyMTljMzEwYWIyZGI2MTgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzc2NTIwMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMzMzMTA4ODU2MgAAAAAAAAAAAAAAAAAAAAAAAAAAADBhYzVjMTM3YjYzNTU2MDdhMTlkMTJmMjAyNDM3MDAzBu%2BxVwbvsVc%3DND; last_login_username=13331088562; bdshare_firstime=1471359304007; PHPSESSID=4r5n6u9nq93m5bgjv72mm2ded6; imooc_isnew=2; cvde=57c591f6cb554-55; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1472396706,1472478309,1472489036,1472565746; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1472570825; IMCDNS=0',
		'DNT': '1',
		'Host': 'www.imooc.com',
		'Origin': 'http://www.imooc.com',
		'Pragma': 'no-cache',
		'Referer': 'http://www.imooc.com/comment/348',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 SE 2.X MetaSr 1.0',
		'X-Requested-With': 'XMLHttpRequest',
	}
};

var req = http.request(options, function(res) {
	console.log('Status：' + res.statusCode);
	console.log('headers：' + JSON.stringify(res.headers));


	res.on('data', function(chunk) {
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});

	res.on('end', function() {
		console.log('请求结束,评论完毕!');
	});

});


req.on('error', function(err) {
	console.log('Error' + err.message);
});


req.write(postData);

req.end();