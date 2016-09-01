var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');


//存储数据
var schema = mongoose.Schema;

//骨架模版
var filmSchema = new schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	year: Number,
	summary: String,
	poster: String,
	flash: String
});

//模型 ,
// 创建了一个名为 movie 的 model，mongoose 会将名词变为复数，
// 在这里，collection 的名字会是 `movies`。
var film = mongoose.model('movie', filmSchema);
//存储数据
var movie = new film({
	title: '黑衣人三',
	doctor: '史密斯',
	year: 2018,
	flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
    country: '美国',
    language: '英语',
    summary: '好片'
});

//保存数据库
movie.save(function(err) {
	if (err) {
		console.log('保存失败');
	} else {
		console.log('电影保存成功！');
	}
})