/*
	Closure is when a function "remembers" its lexical scope even when the function
	is executing outside its lexical scope.
*/

function foo(){
	var bar = "bar";

	function baz(){
		console.log(bar);
	}

	bam(baz);
}

function bam(baz){
	baz(); // "bar"
}


foo();

//===============================================

function foo(){
	var bar = "bar";

	return function(){
		console.log(bar);
	}
}

function bam(){
	foo()(); //bar
}

bam();

//===============================================

function foo(){
	var bar = "bar";

	setTimeout(function(){
		console.log(bar); //bar, remembers lexical scope
	}, 1000);
}

foo();

//===============================================

function foo(){
	var bar = "bar";

	$('#btn').click(function(evt){
		console.log(bar); //bar, remembers lexical scope
	});
}

//===============================================

function foo(){
	var bar = 0;

	setTimeout(function(){
		console.log(bar++);
	}, 100);

	setTimeout(function(){
		console.log(bar++);
	}, 200);
}

foo();  //0 1

//===============================================


for (var i = 1; i <=5; i++){
	setTimeout(function(){
		console.log("i: " i);
	}, i*1000);
}
/*
	you get 6 5 different times, why don't we get 5 different i's?
	
	5 different functions close over same global scope
*/
for (var i = 1; i <=5; i++){
	(function(i){
		setTimeout(function(){
			console.log(i);
		}, 1000 * i)
	})(i);
}

//==================================================

for (let i=1; i <5; i++){
	setTimeout(function(){
		console.log('i: ' i);
	}, i*1000);
}
/*
	This works without the IFFE. The let kw binds i to a for loop 
	AND rebinding i for each iteration of the for loop.
*/

//===================================================

var foo = (function(){
	var o = {bar: "bar"};

	return {obj: o};
})();

console.log(foo.obj.bar)
/*
	This is NOT AN EXAMPLE OF CLOSURE. No function remember its lexical scope
	here because theres no inner function being transported out.
*/