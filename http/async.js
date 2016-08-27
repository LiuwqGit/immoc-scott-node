// <script src='a.js'></script>
// <script src='b.js'></script>
// <script src='c.js'></script>

// var i = 0;
// while(true) {
// 	i++;
// }
// 
// 

var c = 0;

function printIt() {
	console.log(c);
}

function plus(callback1) {
	setTimeout(function () {
		c += 1;
		callback1();
	}, 1000);
}

plus(printIt);
// printIt();