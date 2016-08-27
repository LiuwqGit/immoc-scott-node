// var pet = {
// 	Words: '.......',
// 	speak: function () {
// 		console.log(this.Words);
// 		console.log(this === pet);
// 	}
// };

// pet.speak();
// 
// 



// function pet(words) {
// 	this.words = words;

// 	console.log(this.words);
// 	console.log(this === global);//这里的this指向的是global对象
// }

// pet('...');


function Pet(words) {
	this.words = words;
	this.speak = function () {
		console.log(this.words);
		console.log(this);
	};
}

var cat = new  Pet('Miao');
cat.speak();