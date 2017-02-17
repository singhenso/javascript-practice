function LinkedList(){
	//we could set properties here
	this.sayHi = function(){
		console.log('Hi');
	}
};

var list = new LinkedList();

list.sayHi(); //we get "Hi"


//but its best practice to add it to the prototype

LinkedList.prototype.sayHello = function(){
	console.log('Hello');
};

//each one of these has their own sayHi function in memory
//but there is only one sayHello method on the prototype object
//so adding function to prototype is more efficient
//when you use prototype you lose ability to make private variables, so we're sacrificing that for
//efficiency
var list2 = new LinkedList();
var lsit3 = new LinkedList();