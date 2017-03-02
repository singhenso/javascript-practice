/*
	Classic Module Pattern:
		1. There must be an outter wrapping function (doesn't have to be an IFFE)
		2. There must be one or more inner functions that get returned from 
			that outer function that have closure over the outter scope

	Idea of encapsulation; only expose what needs to be public

	So closures helps you hide things! You don't need to expose inner details.

	Trade-offs:
		1. Hides stuff and makes inner stuff hard to test; Unit testing theoretically
		says you should test every function
		2. Every time you create instance of your module you recreate copies of ALL 
		the methods
*/

var foo = (function(){
	var o = {bar: "bar"};

	return {
		bar: function(){
			console.log(o.bar);
		}
	};
})();

foo.bar() = "bar";

//==================================================

var foo = (function(){
	var publicAPI = {
		bar: function(){
			publicAPI.baz();
		},
		baz: function(){
			console.log("baz");
		}
	}
	return publicAPI;
})();

/*
	Modern module pattern
*/

define("foo", function(){
	var o = {bar: "bar"};

	return {
		bar: function(){
			console.log(o.bar);
		}
	};
});
