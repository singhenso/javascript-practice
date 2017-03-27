/*
	Composition - calling one function and using its output as input to another function
*/

function sum(x,y){
	return x + y;
}

function mult(x, y){
	return x * y;
}

function compose2(fn1, fn2){
	return function comp(){
		var args = [].slice.call(arguments); // turn arguments passed into comp1 into an array
		return fn2(
			fn1(args.shift(), args.shift()), args.shift();
		)
	}
}

var multAndSum = compose2(mult, sum);

multAndSum(3, 4, 5); // 17

/*
	In the above, we make a lot of assumptions. We assume that you wanted specific
	arguments passed to specific functions, and we also assumed that we were only
	passed two functions! You have to think about the most common way someone would
	compose something to create functional compositions.
*/

/*
	Its not about being able to change the value. Its about changing the assignment.

	var --> mutable binding to a value
	const --> immutable binding to a value

	Primitive values can't be changed, but non-primitives are references so
	even if you use const they can change
*/

const z = [4, 5, 6];
z = 10; // won't work!
z[0] = 10; // works! 
// const is not declaring an immutable array, its just always bound by reference

/*
	Object.freeze makes properties themselves bound immutably
*/

const w = Object.freeze([4, 5, 6]);
w = 10; // won't work!
w[0] = 10 // won't work!

/*
	Changing references or bindings is something you want to stay away from in functional
	programming.  You always way to make a copy of something rather than changing it in 
	place.
*/

function doubleThemImmutable(list){
	var newList = []; // store a copy of list rather than changing list directly
	for(var i = 0; i < list.length; i++){
		newList[i] = list[i] * 2;
	}
	return newList;
}