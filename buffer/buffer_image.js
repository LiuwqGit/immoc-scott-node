var fs = require('fs');

//读取图片文件，并使用回调函数，先打印第二个参数是否为buffer
fs.readFile('logo.png', function(err, origin_buffer) {
	console.log(Buffer.isBuffer(origin_buffer));

	//将buffer转换成图片文件
	fs.writeFile('logo_buffer.png', origin_buffer, function(err) {
		if (err) console.log(err);
	});

	// var base64Image = new Buffer(origin_buffer).toString('base64');
	// 将buffer以base64编码解析成字符串
	var base64Image = origin_buffer.toString('base64');

	//打印解析出来的base64位字符串
	console.log(base64Image);

	//将字符串以base64位编码存入到buffer中
	var decodedImage = new Buffer(base64Image, 'base64');

	// 比较前后两个buffer是否相同。0表示相同
	console.log(Buffer.compare(origin_buffer, decodedImage));

	//将buffer写入logo_buffer文件中
	fs.writeFile('logo_buffer', decodedImage, function(err) {
		if (err) console.log(err);
	});
});