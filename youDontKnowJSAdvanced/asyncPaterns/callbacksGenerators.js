/*
	Callback hell "Pyramind of Doom"
		Callback hell has nothing to do with indentation (its not about the
			nested functions)
		A callback is a continuation, executing some part of the program at a 
			seperate time
		When we're calling something that we don't trust, like a third party library,
			we have done an inversion of control
			 We trust that you will pass along that you're supposed to or if anything
			 happens I need output about you'll give that to me, and you will only
			 call my callback once, and you won't do it too soon or too late
	
	Generators
		Type of function that can pause itself and resume later
*/

//=============== Seperate Callbacks ================================

/*
	Below just makes inversion of control worse.  You're trusting you will only call
	one and not the other. What if they call both the success and the failure? What if
	they call the failure first then the success later? Doesn't solve anything.
*/

function trySomething(ok, err){
	setTimeout(function(){
		var num = Math.random();
		if (num > 0.5) ok(num);
		else err(num)
	}, 1000);
}

trySomething(
	function(num){
		console.log("Success: " + num);
	},
	function(num){
		console.log("Sorry: " + num);
	}
)

//===================== Error-first Style ============================

/*
	What happens if they pass back both an err object and a success value? You'd probably completely
	ignore the success value. This is also called Node style callback.
*/

function trySomething(cb){
	setTimeout(function(){
		var num = Math.random()
		if (num > 0.5) cb(null, num);
		else cb("Too low!");
	}, 1000);
}

trySomething(function(err, num){
	if(err){
		console.log(err);
	}
	else{
		console.log("Number: " + num);
	}
})

//============= Nested Callback =====================================

/*
	No error handling. Problem.
*/

function getData(g, cb){
	setTimeout(function(){cb(d), 1000});
}

getData(10, function(num1){
	var x = 1 + num1;
	getData(30, function(num2){
		var y = 1 + num2;
		getData(
			"Meaning of life: " + (x + y),
			function(answer){
				console.log(answer);
			}
		);
	});
})

//============ Generators ===========================================

function* gen(){
	console.log("Hello");
	yield null;
	console.log("World");
}

var it = gen();       //constructs an iterator, doesn't actually call function or execute anything
it.next(); // Hello   //runs until next yield statement
it.next(); // World   //runs until next yield statement or to the end

//=============== Generator Messages ===============================

var run = coroutine(function* (){
	var x = 1 + (yield null);  //yield is actually a message passing mechanism
	var y = 1 + (yield null);  
	yield(x + y);
});

run();   //starts code and comes to first yield and gives a null value
run(10); //value 10 is passed in to first (yield null) --> 1 + 10
console.log("Meaning of life: " + run(30).value) //passes in 30 to second (yield null) and 31 + 11 is returned

//============= Yield Tasks ========================================

function getData(d){
	setTimeout(function(){run(d), 1000});
}

var run = coroutine(function*(){
	var x = 1 + (yield getData(10));
	var y = 1 + (yield getData(30));
	var answer = (yield getData(
		"Meaning of life: " + (x + y);
	));
	console.log(answer);

});

run();