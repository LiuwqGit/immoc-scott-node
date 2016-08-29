var eventEmitter = require('events').EventEmitter;
var life = new eventEmitter();

// on 也可以换成  addEventListener
life.on('listing', function(who) {
	console.log('1列表' + who );
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
life.emit('listing', '1');