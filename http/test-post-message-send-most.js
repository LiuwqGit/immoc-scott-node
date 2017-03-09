var http = require('http');
for (i = 0; i < 800; i++) {
	(
		function(i) {

			var options = {
				hostname: '10.10.17.21',
				port: 8080,
				path: '/messagecontent/api/message/send',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			}

			var req = http.request(options, (res) => {

				var chunks = [];
				res.on('data', (chunk) => {
					chunks.push(chunk);
				})

				res.on('end', () => {
					var body  = Buffer.concat(chunks);
					console.log(body.toString());
				})
			})

			var contentData = {
				meetingId: '201701101627-500',//会议ID
			  msgContent: 'string12' + i,//消息内容
			  msgType: 1,//int 消息类型 1内容，2图片，3许愿，4图文直播， 5语音
			  senderId: 'string12',//消息发送人id（mongo自动生成的id）
			  senderImage: 'string12',//消息发送人头像
			  senderName: 'string12'//消息发送人昵称
			};
			var queryData = JSON.stringify(contentData);

			req.write(queryData);
			req.end();
		}
	)(i);
}