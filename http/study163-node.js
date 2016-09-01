var http = require('http');
var url = 'http://study.163.com/find.htm#/courselist?ct=400000000031644';
var cheerio = require('cheerio');

function videoData(html) {
	console.log('videoData1');
	var $ = cheerio.load(html);
	var videos = $('.j-data-list');
   // var  basepool = 
	var courseData = [];

	console.log('videoData2 ' + 　videos + ' ddd '　+ videos + 'aaa');
	// videos.each(function(item) {
	// console.log('videoData13');
	// 	var video = $(this).find('.u-cover u-find-cover');
	// 	var id = video.find('a').attr('data-href');
	// 	var img = video.find('.img');
	// 	var title = img.find('.f-thide').text();
	// 	var author = img.find('.orgName f-fs0 f-thide').text();
	// 	var personNum = img.find('hot f-fs0').text();
	// 	var price = img.find('normal f-fs0').text();
	// 	courseData.push({
	// 		id: id,
	// 		title: title,
	// 		personNum: personNum,
	// 		price: price,
	// 		author: author
	// 	});
	// console.log('videoData28');
	// });

	console.log('videoData31');
	return courseData;
	//数据格式
	// [
	// 	{
	// 		id: '',
	// 		title: '',
	// 		personNum: '',
	// 		price: '',
	// 		author: ''
	// 	}
	// ]
};

function parseVideoInfo(courseData) {
	console.log('中金啊');
	courseData.forEach(function(item) {
		console.log('中金啊1');
		var title = item.title;
		var personNum = item.personNum;
		var author = item.author;
		var id = item.id;
		var price = item.price;
		console.log('标题：' +title + personNum + author  + id + price);
	});
};

http.get(url, function(res) {
	var html = '';
	res.on('data', function(data) {
		html += data;
	});
	res.on('end', function() {
		var courseData = videoData(html);
console.log('之前');
		parseVideoInfo(courseData);
console.log('之后');
	});
}).on('error', function() {
	console.log('抓取网站失败!');
});