/*
THIS is just a parameter. If we think of a normal JS parameter, thats anything passed to
	a function.

Whats different between THIS and a normal parameter?
	we can't name this
	you bind values to this differently (theres about 5 different ways)

This is an identifier that gets bound to some value

*/

//What will this not be?
var fn = function(a, b){
	console.log(this);
}

var ob2 = {method: fn};

var obj = {
	fn : function(a,b){
		console.log(this);
	}
}

theObj.fn(3,4);
/*
	Doesn't refer to function object this apperas within
	Doesn't refer to an instance of that function object this appears within
	Doesn't refer to an object that happens to have that function as a property (ob2)
	Doesn't refer to the object created by the literal this appears within (obj)
	Doesn't refer to an execution context or scope (its not {1: 3, b:4})

	What is it referring to???
	The object found to the left of the dot where the containing function is called
	so line 26, theObj! thats THIS!
	When you don't have a left of the dot object, js binds this to global object
		<global>
*/

//What about this?
r.method(g, b);

/*
	this is r! r is to the left of the dot!
*/

//What does .call do?
var r = {}, g = {}, b = {};

fn.call(r, g, b); //notice first parameter is extra!

/*
	we can use .call to bind our extra first parameter to this!
*/

//What about this?
r.method.call(y, g, b); //this is still y! we don't care about r! .call overrides method
//access rules

//What about this?
setTimeout(fn, 100)
//global object, undefined parameters

//and this?
setTimeout(r.method, 1000);
/*
	setTimeout is passed a callback
	r.method is using dot notation, but we don't actually call fn until setTimeout
	the important moment is where the function is invoked
	just because we did a property look up doesn't mean its relevant
	only moment of calltime influences this
	so this will still be global object
*/

//and this?
new r.method(r, b); //binding for keyword this with new keyword
/*
	this is bound to a brand new object everytime you make a "new" instance
*/