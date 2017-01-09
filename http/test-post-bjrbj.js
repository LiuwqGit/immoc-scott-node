var http = require('http');
var querystring = require('querystring');

var contentData = {

}

var postData = querystring.stringify(contentData);

var options = {
	hostname: '',
	port: 80,
	path: '/',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': postData.length
	}
};

var req = http.request(options, (res) => {

});