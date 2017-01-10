var http = require('http'); 
var querystring = require('querystring');

 
let contentData = {
  meetingId: 'string1',//会议ID
  msgContent: 'string1',//消息内容
  msgType: 1,//int 消息类型 1内容，2图片，3许愿，4图文直播， 5语音
  senderId: 'string1',//消息发送人id（mongo自动生成的id）
  senderImage: 'string1',//消息发送人头像
  senderName: 'string1'//消息发送人昵称
}

var postData = JSON.stringify(contentData);

var options = {
	hostname: '10.10.17.21',
	port: 8080,
	path: '/messagecontent/api/message/send',
	method: 'POST',
	headers: {
    'Content-Type':'application/json;charset=UTF-8'
	}
};

var req = http.request(options, (res) => {
	console.log('Status: ' + res.statusCode);
	console.log('This is http POST');

var strurl = JSON.stringify(options.headers);
//区分 JSON.stringify(str)   querystring.stringify(str)
console.log(querystring.stringify(options));
console.log(strurl + "-url");

	var resData = '';
	 var chunks = [];
	res.on('data', (chunk) => {
		 chunks.push(chunk);
    console.log('chunks: ' + chunks);
		resData += chunk;
		console.log(typeof chunk);
		console.log(Buffer.isBuffer(chunk));
		console.log("resData " + resData);
		console.log("query: " + querystring.stringify(resData));
	})

	res.on('end', () => {		
    var body = Buffer.concat(chunks);
    console.log(body.toString());
	})

});

req.on('error', (err) => {
	console.log('Error: ' + err.message);
})

req.write(postData);

req.end();
 