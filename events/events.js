var eventEmitter = require('events').EventEmitter;
var life = new eventEmitter();

// on 也可以换成  addEventListener
life.on('listing', function(who) {
	console.log('1列表' + who );
});


life.emit('listing', '1');