var http = require('http');
var querystring = require('querystring');

var contentData = {
	sno: 0,
	spage: 0,
	epage: 5,
	leibie: '',
	suoshu: '',
	sword: ''
}

var postData = querystring.stringify(contentData);

var options = {
	hostname: 'www.bjrbj.gov.cn',
	port: 80,
	path: '/LDJAPP/search/ddyy/ddyy_01_outline_new.jsp',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(postData)
	}
};

var req = http.request(options, (res) => {
	console.log('Status: ' + res.statusCode);
	console.log('This is http POST');

	var resData = '';
	res.on('data', (chunk) => {
		resData += chunk;
		console.log(typeof chunk);
		console.log(Buffer.isBuffer(chunk));
		console.log(resData);
		console.log(querystring.stringify(resData));
	})

	res.on('end', () => {
		console.log('POST 结束！');
	})

});

req.on('error', (err) => {
	console.log("Error: " + err.message);
})

req.write(postData);

req.end();