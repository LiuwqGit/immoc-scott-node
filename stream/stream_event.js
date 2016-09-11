//文件系统模块
var fs = require('fs');

//读取文件，创建读取流
var readStream = fs.createReadStream('stream_copy_logo.js');
 
//读取流 的事件
readStream
	.on('data', function(chunk) {
		console.log('data emits');
		console.log(Buffer.isBuffer(chunk));
		console.log(chunk.toString('utf8'));
	})
	.on('readable', function(){
		console.log('data readable');
	})
	.on('end', function(){
		console.log('data end');
	})
	.on('close', function(){
		console.log('data close');
	})
	.on('error', function(e) {
		console.log('data read error' + e);
	});