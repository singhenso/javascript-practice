/*
	When you set yield to a value, .next() will return an object with the value AND a boolean telling you in the generator
	is done or not.

	If there is no return in your generator, theres always an implicit undefined returned
*/

function *main(){
	yield 1;
	yield 2;
	yield 3;
}

var it = main();

it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false} we are techincally paused, not complete
it.next(); // {value: undefined, done: true} all values without a return statement return undefined

/*
	Not only can we yield messages out, but we can pass messages into the generator
*/

function coroutine(g){
	var it = g();
	return function(){
		return it.next.apply(it, arguments);
	};
}

var run = coroutine(function*(){
	var x = 1 + (yield);
	var y = 1 + (yield);
	yield(x + y);
});

run(); // I hit var x = 1 + ... uh oh! yield statement! I pause, literally right here in the middle of the statement.
run(10); // I pass in 10 to my yield statment. I keep runninng until i hit yield again, then I stop.
console.log("The meaning of life: " + run(30).value); // I pass 30 to second yield statement. I keep running until I hit yield(x + y)

// x + y equates to 42. yield returns {value: 42, done: false}, and we access value through run(30).value

// ================== A simpler Example ===================================================

function *foo(x){
	var y = x * (yield);
	return y;
}

var it = foo(6);

it.next();

var res = it.next(7) // passes in 7 to yield

res.value; // 42