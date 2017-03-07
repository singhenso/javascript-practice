/*
	Objects linked to other objects, contrast with prototypeLinkage.js
*/
var Foo = {
	init: function(who){
		this.me = who;
	},
	identify: function(){
		return "I am " + this.me;
	}
}

var Bar = Object.create(Foo);

Bar.speak = function(){
	alert("Hello, " + this.identify());
};

//instead of using "new", using Object.create and .call method
var b1 = Object.create(Bar);
b1.init("b1");
b1.speak(); //Hello, I am b1.
