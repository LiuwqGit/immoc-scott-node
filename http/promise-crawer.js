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
	// var number = $('.statics clearfix .static-item l .meta-value js-learn-num').text();
	// 获取已经学习的人数
	// ps: 因为在网页源代码中，已经学习人数，并没有展示出来，所以，获取不到。
	var number = $('.statics clearfix .static-item l score-btn .meta-value').text();
	//要组装的数据结构
	var courseData = {
		title: title,
		number: number,
		videos: []
	};

	//	循环章节信息
	chapters.each(function(item) {
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text();

		//	找到所有的video
		var videos = chapter.find('.video').children('li');

		//章节信息courseData中videos数组的数据结构
		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		};
		// 循环video,将需要的信息组装
		videos.each(function(item) {
			var video = $(this).find('.J-media-item');
			var videoTitle = video.text();
			var videoId = video.attr('href').split('/video/')[1];

			chapterData.videos.push({
				title: videoTitle,
				id:  videoId
			});
		});
		//将组装好的videos添加到想要的数据结构中
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


/**
 * 异步获取页面数据
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function getPageAsync(url) {
	//实例化一个Promise方法
	return new Promise(function(resolve, reject) {
		console.log('正在爬取 ' + url);
		 /**
		 * nodejs中 http  get请求
		 * @param  {String} res) {	var        html [description]
		 * @return {[type]}      [description]
		 */
		http.get(url, function(res) {
			var html = '';
			//get请求中的data事件
			res.on('data', function(data) {
					html += data;
			});
			//get请求中的end事件
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
	//将需要抓取的网页数据添加到数组中
	fetchCourseArray.push(getPageAsync(baseUrl + id));
});


//主方法函数
Promise
	.all(fetchCourseArray)
	.then(function(pages) {
		var coursesData = [];

		pages.forEach(function(html) {
			var courses = filterChapters(html);
			coursesData.push(courses);
		});


		//排序，将学习人数多的排前面
		coursesData.sort(function(a , b) {
			return a.number < b.number;
		});
		printCourseInfo(coursesData);
	});

