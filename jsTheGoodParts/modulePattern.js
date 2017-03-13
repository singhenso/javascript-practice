/*
	No easy way to get privacy in JS except for function modules because each function has a 
	function scope that no variables can leak out of.  We are storing the return value (firrst 
	method and second method) in singleton which close over the privateVariable and privateFunction.

	You dont need to make a class! Its just functions!

	Closure provides private state within the object
*/


var singleton = (function(){
	var privateVariable;
	function privateFunction(x){
		...privateVariable...
	}

	return {
		firstMethod: function(a,b){
			...privateVariable...
		},
		secondMethod: function(c){
			...privateVariable...
		}
	}
}());

//============== Module Pattern as Constructors =================================

/*
	1. Make an object
		Object literal
		new
		Object.create
	2. Define soem variables and functions
		Private members
	3. Have public methods that close over pricate stuff
	4. Return object
*/

function constructor(spec){
	var that = otherMaker(spec),
	member,
	method = function(){
		//spec, member, method
	}
	//anything you need public, assign to the return variable
	that.method = method;
	return that;
}