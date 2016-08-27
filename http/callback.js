function learn(something) {
	console.log(something);
}

function we(callback, something) {
	something += ' is cool';
	callback(something);
}


we(learn, 'Node.js');

// 匿名回调函数
we(function (something) {
	console.log(something);
}, 'jade');