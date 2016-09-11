var fs = require('fs');

var readStream = fs.createReadStream('haiou.jpg');

var writeStream = fs.createWriteStream('haiou_stream_copy.jpg');

readStream.on('data', function(chunk) {
	writeStream.write(chunk);
});

readStream.on('end', function() {
	writeStream.end();
});