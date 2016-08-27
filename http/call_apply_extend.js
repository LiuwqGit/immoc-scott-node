function Pet(words) {
	this.words = words ;
	this.speak = function (say) {
		console.log(say + ' ' + this.words );
	};
}

function Dog(Words) {
	Pet.call(this, Words);
}

var dog = new Dog('Wang');
dog.speak("speak");

