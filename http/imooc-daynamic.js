var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/637';

function filterChapters(html) {
	var $ = cheerio.load(html, {ignoreWhitespace: true});

	var courseData = [];

	var chapters = $('.mod-chapters').find('.chapter');

	chapters.each(function(index, el) {
		var chapter = $(this);

		var chapterName = chapter.find('strong').text();
		var videos = chapter.find('.video').children('li');

		var chapterData = {
			chapterName: chapterName,
			videos : []
		};
		 
		  videos.each(function(index, el) {
		  	var video = $(this).find('.J-media-item');
		  	var id = video.attr('href');
		  	var title = video.text();
		  	chapterData.videos.push({
		  		id: id,
		  		title: title
		  	});
		  });
		  courseData.push(chapterData);
	});

	return courseData;

// 格式样子：
// 	[
// 		{
// 			chapterName: '',
// 			videos: [{
// 				id: '',
// 				title: '',
// 			}]
// 		}
// 	]
}

function parseJson(courseData) {
	
	courseData.forEach(function(item) {

		var name = item.chapterName;
		var videos = item.videos;
		console.log(name + '\n');

		videos.forEach(function(item) {
			var id = item.id;
			var title = item.title;
			console.log('【' + id + '】' + title + '\n');
		});
	});
}



http.get(url, function(res) {
	var html = '';
	res.on('data', function(data) {
		html += data;
	});
	res.on('end', function() {
		var courseData = filterChapters(html);
		parseJson(courseData);
	});
}).on('error', function(err) {
	console.log(err.message);
});