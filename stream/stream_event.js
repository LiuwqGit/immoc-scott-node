//文件系统模块
var fs = require('fs');

//读取文件，创建读取流
var readStream = fs.createReadStream('haiou.jpg');
 
var n = 0;

//可读流 的事件
readStream
	.on('data', function(chunk) {
		n++;
		console.log('data emits');
		console.log(Buffer.isBuffer(chunk));
		// console.log(chunk.toString('utf8'));
		// 将可读流暂停
		readStream.pause();
		console.log('data pause');
		//设置3000毫秒的定时器
		setTimeout(function() {
			console.log('data pause end');
			//重启 可读流
			readStream.resume();
		}, 10);
	})
	.on('readable', function(){
		console.log('data readable');
	})
	.on('end', function(){
		console.log(n);
		console.log('data end');
	})
	.on('close', function(){
		console.log('data close');
	})
	.on('error', function(e) {
		console.log('data read error' + e);
	});