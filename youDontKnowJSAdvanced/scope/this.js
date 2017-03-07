/*
	this gets set by the call site of the function call
	sort-of has a "dynamic scope"

	1. New Keyword
		The new kw overrides all over rules, 
	2. Explicit binding rule & Hard Binding rule
		If you use .call or .apply at the call site, both of those utilities take a this
		binding as their first parameter
	3. Implicit binding rule	
		When we make a reference to a function in an object property, that object at the
		call site becomes the this binding
	4. Default binding rule
		If you are in "use strict"; inside the function this will default to undefined 
		rather than the global object
		So default value will either be undefiend or the global object
*/

function foo(){
	console.log(this.bar);
}

var bar = "bar1";
var o2 = {bar: "bar2", foo: foo};
var o3 = {bar: "bar3", foo: foo};

foo();     //bar1
o2.foo();  //bar2
o3.foo();  //bar3

//======================================================

var o4 = {
	bar: "bar1",
	foo: function(){
		console.log(this.bar);
	}
};

var o5 = {bar: "bar2", foo: o1.foo};

var bar = "bar3";
var foo = o1.foo;

o1.foo(); // "bar1";
o2.foo(); // "bar2" - call site is o5! this = o5. implicit binding
foo();    // "bar3"

//======================================================

function foo(){
	console.log(this.bar);
}

var bar = "bar1";
var obj = {bar: "bar2"};

foo();         // "bar1"
foo.call(obj); //"bar2", we explicity say here that we want this to ref obj

//======================================================

function foo(){
	console.log(this.bar);
}

var bar = "bar1";
var obj = {bar: "bar2"};

var orig = foo; //making this global orig variable is kinda clunky
foo = function(){orig.call(obj);}; //this is hard binding, forces this to always be orig

foo(); //bar
foo.call(obj2) //bar

//======================================================

function bind(fn, o){ //creating a binding utility is same way to do above in clearner way
	return function(){ //reusuable, but still a global utility (clunky)
		fn.call(o);
	};
}

function foo(){
	console.log(this.bar);
}

var obj = {bar: "bar"};
var obj2 = {bar: "bar2"};

foo = bind(foo, obj);

foo();         //bar, not falling back to global, bc the callsite is actually 
foo.call(obj2) //bar

//======================================================

if(!Function.prototype.bind2){ //this is build in to ES5 with .bind()
	Function.prototype.bind2 = function(o){
		var fn = this;
		return function(){
			return fn.apply(o, arguments);
		};
	};
}

function foo(baz){
	console.log(this.bar + " " + baz);
}

var obj = { bar: "bar"};
foo = foo.bind2(obj); //

foo("baz");  //bar baz

//=====================================================

/*
	Putting "new" in front of a ANY function call makes it act as a "constructer call"
	Doing 4 things...
		1. A brand new object will be created
		2. Object gets linked to a different object
		3. Brand new object gets bound as the "this" KW for the function call
		4. If funciton does not otherwise return anything, it will implicity insert
			a return this;
*/

function foo(){
	this.baz = "baz";
	console.log(this.bar + " " + baz);
}

var bar = "bar";
var baz = new foo(); //undefined undefined

//======================================================

/*
	jQuery forces this reference to be the button rather than the a1 object
	So below code doesn't work
*/

function Foo(){
	this.me = who;
};

Foo.prototype.speak = function(){
	alert("Hello I am " + this.me);
}

var a1 = new Foo("a1");

$("#speak").click(a1.speak);