/*
	"Run to Completion" - functions in JS run until completion uninterrupted, we can reason about things
	in a single-threaded fashion, one function will not mess with another in memory or runtime

	Generators do not have a run to completion symmantic. Adds a syntactic sugar to a behavior we would have
	had to spend a lot of effort trying to emmulate.

	The "yield" keyword is like a pause button.

	A generator is a pausible function.  Localized blocking inside the generator ONLY, its not blocking the entire
	program.

	Iterators a patterned way of stepping through a set of data.  Calling a generator produces an interator. Its purpose
	is to step through CONTROL rather than a set of data.
*/

function* gen(){
	console.log("Hello");
	yield;
	console.log("World");
}

var it = gen();
it.next(); // Hello
it.next() // World

// =================================================

/*
	Functions are still running and active, but able to exist in a paused state.

	When function resumes, it will use current variable's values.

	A generator does not have to run to completion.
*/

var x = 1;

function *foo(){
	x++;
	yield;
	console.log("x: ", x);
}

function bar(){
	x++;
}

var it = foo(); // it doesn't actually execute generator, but constructs an INTERATOR that will control execution
it.next(); // starts generator, runs first x++ of foo(), pauses at yield statement
x; // 2
bar(); 
x; // 3
it.next() // x : 3

// ====================================================

/*
	Must you call .next() to run the function? Yes. it doesn't actually run the function. it.next() instructs the iterator
	to advance. The result of it.next() is {value: 42, done: true}

	"yield" can be thought of as an intermediate return statement
*/

function *foo(x, y){
	return x * y;
};

var it = foo(6,7);

var res = it.next();

res.value // 42