var redis = require('redis');

var client = redis.createClient(6397, '10.10.3.15', {});
//定义一个全局的key值
var stringKey = '201608311001';

client.on('error', function(err) {
	console.log('Error: ' + err.message);
});


client.on('connect', runSample);

function runSample() {


	client.get(stringKey, function(err, reply) {
		console.log(reply.toString());
	});

// 另一种方式获取一个字符串类型的值，返回value

	var multiCmd = client.multi();
	multiCmd.get(stringKey);
	multiCmd.exec(function(err, reply) {
		console.log(reply.toString());
	});

}

console.log('kaoqin');
client.quit();