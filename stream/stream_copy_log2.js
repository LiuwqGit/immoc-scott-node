var fs = require('fs');

var readStream = fs.createReadStream('haiou.jpg');

var writeStream = fs.createWriteStream('haiou_stream_copy_pause.jpg');

readStream.on('data', function(chunk) {
	if (writeStream.write(chunk) === false) {
		console.log('still cached');
		readStream.pause();
	}		
});

readStream.on('end', function() {
	writeStream.end();
});

// drain 耗尽 ，数据已经写入目标
writeStream.on('drain', function() {
	console.log('data drain');

	readStream.resume();
});