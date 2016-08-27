function Pet(words, words2) {
	this.words = words ;
	this.words2 = words2;
	this.speak = function (say) {
		console.log(say + ' ' + this.words + this.words2);
	};
}

function Dog(Words) {
	// Pet.call(this, Words);
	Pet.apply(this, arguments);
}

var dog = new Dog('Wang', 'gogo');
dog.speak("speak");

// 对于apply和call两者在作用上是相同的，但两者在参数上有区别的。
// 对于第一个参数意义都一样，但对第二个参数：
// apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而call则作为call的参数传入（从第二个参数开始）。
// 如 func.call(func1,var1,var2,var3)对应的apply写法为：func.apply(func1,[var1,var2,var3])

// 同时使用apply的好处是可以直接将当前函数的arguments对象作为apply的第二个参数传入