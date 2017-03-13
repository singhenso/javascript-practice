/*
	SLow code below...
*/

var digit_name = function(n){
	var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];

	return names[n]
}

/*
	Everytime I call digit_name(n), a new array called names is constructed. This is
	slow!

	Below, we use a closure...
*/

var digit_name = (function(n){
	var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];

	return function(n){
		return names[n];
	};

}());

/*
	This time I'm returning a function that is using names.  I am calling the outer function
	immediately and storing the return value of the outter function (the inner function) in
	digit_name, which continues to have access to names. Furthermore, names is not global, and
	it is not public.

	Below, the fade function...
*/

function fade(id){
	var dom = document.getElementById(id),
	level = 1;

	function step(){
		var h = level.toString(16); //makes a hex character
		dom.style.backgroundColor = '#FFFF' + h + h;

		if (level < 15){
			level += 1;
			setTimeout(step, 100);
		}
	}

	setTimeout(step, 100);
}

/*
	If I call fade on two different things, the calls won't interfere with one another.  They both get
	a new dom variable, level variable, and step function.
*/