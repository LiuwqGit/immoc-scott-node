var http = require('http');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/learn/'; 

var videoIds = [637, 348, 259, 197, 134, 75 ];

/**
 * 需要过滤出来的数据
 * @param  {数组} html html页面
 * @return {[type]}      [description]
 */	
function filterChapters(html) {
	var $ = cheerio.load(html, {ignoreWhitespace: true});
	var chapters = $('.chapter');

	var title = $('.path span').text();
	var number = $('.statics clearfix .static-item l .meta-value js-learn-num').text();

	var courseData = {
		title: title,
		number: number,
		videos: []
	};

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
		courseData.videos.push(chapterData);

	});

	return courseData;

// coursesData = {
// 	title: '',
// 	number: '',
// 	videos: [
// 		{
// 			chapter: '',
// 			videos: {
// 				title: '',
// 				id: ''
// 			}
// 		}
// 	]
// }
	
}

/**
 * 打印需要输出的值	
 * @param  {[type]} coursesData [description]
 * @return {[type]}            [description]
 */
function printCourseInfo(coursesData) {
	coursesData.forEach(function(courseData) {
		console.log(courseData.number + '人学过了 ' + courseData.title + '\n');
	});
	coursesData.forEach(function(courseData) {
		console.log('###  ' + courseData.title + '\n');
		courseData.videos.forEach(function(item) {
			var chapterTitle = item.chapterTitle;

			console.log(chapterTitle + '\n');

			item.videos.forEach(function(video) {
				var id = video.id;
				var title = video.title;

				console.log('【' + id + '】' + title + '\n');
			});
		});
	});
}

function getPageAsync(url) {
	return new Promise(function(resolve, reject) {
		console.log('正在爬取 ' + url);
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
				resolve(html);
				// var courseData = filterChapters(html);

				// printCourseInfo(courseData);
			});
		}).on('error', function(e) {
			reject(e);
			console.log('获取课程数据出错!');
		});
	});
}

var fetchCourseArray = [];

videoIds.forEach(function(id) {
	fetchCourseArray.push(getPageAsync(baseUrl + id));
});

Promise
	.all(fetchCourseArray)
	.then(function(pages) {
		var coursesData = [];

		pages.forEach(function(html) {
			var courses = filterChapters(html);
			coursesData.push(courses);
		});

		coursesData.sort(function(a , b) {
			return a.number < b.number;
		});
		printCourseInfo(coursesData);
	});

