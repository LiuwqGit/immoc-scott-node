var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

/**
 * 需要过滤出来的数据
 * @param  {数组} html html页面
 * @return {[type]}      [description]
 */	
function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.chapter');

	var courseData = [];

	chapters.each(function(item) {
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text();

		var videos = chapter.find('.video').children('li');

		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		};

		videos.each(function(item) {
			var video = $(this).find('.J-media-item');
			var videoTitle = video.text();
			var videoId = video.attr('href').split('/video/')[1];

			chapterData.videos.push({
				title: videoTitle,
				id:  videoId
			});
		});
		courseData.push(chapterData);

	});

	return courseData;

	// [
	// 	{
	// 		chapter: '',
	// 		videos: {
	// 			title: '',
	// 			id: ''
	// 		}
	// 	}
	// ]



}

/**
 * 打印需要输出的值	
 * @param  {[type]} courseData [description]
 * @return {[type]}            [description]
 */
function printCourseInfo(courseData) {
	courseData.forEach(function(item) {
		var chapterTitle = item.chapterTitle;

		console.log(chapterTitle + '\n');

		item.videos.forEach(function(video) {
			var id = video.id;
			var title = video.title;

			console.log('【' + id + '】' + title + '\n');
		});
	});
}

/**
 * nodejs中 http  get请求
 * @param  {String} res) {	var        html [description]
 * @return {[type]}      [description]
 */
http.get(url, function(res) {
	var html = '';
	res.on('data', function(data) {
			html += data;
	});
	res.on('end', function() {

		var courseData = filterChapters(html);

		printCourseInfo(courseData);
	});
}).on('error', function() {
	console.log('获取课程数据出错!');
});