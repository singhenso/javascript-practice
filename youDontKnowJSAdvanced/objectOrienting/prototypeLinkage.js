function Foo(who){
	this.me = who;
};

Foo.prototype.identify = function(){
	return "I am " + this.me;
};

function Bar(who){
	Foo.call(this, who);
};

/*
	Object.create does the first two steps of the new KW (Create a new object and link it),
	but it does not do step 3 and 4
*/
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function(){
	alert("Hello, " + this.identify());
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak(); //Hello, I am b1
b2.speak(); //Hello, I am b2

b1.constructor //it should point to the bar function BUT it actually is the foo function