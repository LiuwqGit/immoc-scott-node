var pet = {
	words: 'Miao',
	speak: function (say) {
		console.log(say + ' ' + this.words);
	}
};

// pet.speak('speak'); // speak Miao

var dog = {
	words: 'wang'
};

// pet.speak(); //undefined Miao

pet.speak.call(dog, 'Speak'); // Speak wang