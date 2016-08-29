var eventEmitter = require('events').EventEmitter;
var life = new eventEmitter();
//给EventEmitter设置最大监听数
life.setMaxListeners(11);
function listing1(who) {	
	console.log('1列表' + who );
}

// on 也可以换成  addEventListener
life.on('listing', listing1);
life.on('listing', function(who) {
	console.log('2列表' + who);
});
life.on('listing', function(who) {
	console.log('3列表' + who);
});
life.on('listing', function(who) {
	console.log('4列表' + who);
});
life.on('listing', function(who) {
	console.log('5列表' + who);
});
life.on('listing', function(who) {
	console.log('6列表' + who);
});
life.on('listing', function(who) {
	console.log('7列表' + who);
});
life.on('listing', function(who) {
	console.log('8列表' + who);
});
life.on('listing', function(who) {
	console.log('9列表' + who);
});
life.on('listing', function(who) {
	console.log('10列表' + who);
});
life.on('listing', function(who) {
	console.log('11列表' + who);
});

life.on('methods', function(where) {
	console.log('方法1' + where);
});
life.on('methods', function(where) {
	console.log('方法2' + where);
});

life.removeListener('listing', listing1);
life.removeAllListeners();

var hasListingListener = life.emit('listing', '1');
var hasMethodListener = life.emit('methods', '2');
var hasOtherListener = life.emit('other', '2');

// console.log(hasListingListener);
// console.log(hasMethodListener);
// console.log(hasOtherListener);