var http = require('http');

console.log("请输入请求的url地址：");
 // 500 0
 // 600 0
 // 700    6、8、44、53、48、143、0
 // 800  115
 // 1000  316 
 // 2000  327
 for ( i = 0 ; i< 600 ; i++ ) {
 	(
	 	function (i) {
			http.get("http://10.10.17.21:8080/messagecontent/api/message/test", (res) => {
				const statusCode = res.statusCode;
				const contentType = res.headers['content-type'];
				console.log("reqest: ' " + statusCode	);
				res.setEncoding('utf8');
				var resultdata = '';
					res.on('data', function(chunk) {
						resultdata += chunk;
						console.log(resultdata);
					});

					res.on('end', function () {
						// console.log(i);
						console.log('return ' + resultdata.length);
					});				

					res.on('error', function(err) {
						console.log('problem with request: ' + err.message);
					});
			});		 
		}
	)(i)
}