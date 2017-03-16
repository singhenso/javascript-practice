/*
	Synchronous looking asynchronous code

	We can block locally inside of our generator

	This is asynchronicity with a notification that we have completed. This is good for testing code.
*/

function getData(d){
	setTimeout(function(){run(d)}, 1000); //resume generator with value we got back
}

var run = coroutine(function*(){ 
	var x = 1 + (yield getData(10));
	//locally blocked until getData() finishes
	var y = 1 + (yield getData(30));
	var answer = (yield getData("Meaning of life: " + (x + y)));
	console.log(answer);
})

run();