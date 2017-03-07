/*
	Every single "object" is built by a constructor function.

	A constructor makes an object linked to its own prototype.

	Difference: in java you have an instance thats a COPY of a parent.

	Theres a function called Object and there is an object that Object is linked to,
	labeled Object.prototype.  On Object.prototype is toString and valueOf etc.

	.prototype links to object
	.constructor links to function

	new makes a new object, linked to the prototype object NO CONSTRUCTOR PROPERTY ON THIS
	OBJECT!!!

	A constructor is a funciton that is called with the new keyword in front of it

	[[Prototype]] is a linkage from one object to another object it can come from object.create
	or indirectly from the new keyword

	[[Prototype]] allows us to call a property on an object reference and if it can't handle
	that reference it delegates up the prototype chain to a different object

	We can find where [[prototype]] points to by...
		a1.__proto__
		object.getPrototypeOf
		a1.constructor.prototype

	In classical inheritence, I instantiate objects from a class and they are copies of that class
	In JS, new objects delegate upward to prototypes. They're not copies. Not classical inheritence.

	Rather than saying JS has prototype inheritence, say JS has behavior delegation

	Delegation is a live link - its not a stagnant copy - so its arguably more powerful;
		if bar changes at runtime, foo will follow suit
		Downside: shadowing is awkward
*/

function Foo (who){
	this.me = who;
}

Foo.prototype.identify = funtion(){
	return "I am" + this.me;
} //identify property now on Foo.prototype object

var a1 = new Foo("a1"); //makes a new object called a1, linked to Foo.prototype
var a2 = new Foo("a2"); //makes a new object called a2, linked to Foo.prototype

a2.speak = function(){
	console.log("Speak");
} //speak property is only found on a2

a1.__proto__ === Foo.prototype //calls dunder getter function on Object.prototype, which
//return the internal prototype linkage of whatever this is, this is a1, returning [[p]],
//which is __proto__; public property __proto__ references internal [[p]] property
// true, a1.__proto__ points to same object as Foo.prototype

a1.__proto__ === Object.getPrototypeOf(a1); //true

a1.identify(); // I am a1

a1.identify = function(){
	console.log("I'm a shadow.") //this is called shadowing, overrides prototype identify
}

a1.identify = function(){
	alert("I am" + Foo.prototype.identify.call(this));
} //this can bind a1 to this binding to accomplish relative polymorphism
//this is super messy, and undesirable, not a real class design
//if you override a function, keep this in mind