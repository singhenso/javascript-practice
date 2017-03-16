/*
	This is better than callbacks or thunks, but theres even better ways (we'll get to later)

*/

doFirstThing()
.then(function(){
	return doSecondThing();
})
.then(function(){
	return doThirdThing();
})
.then(
	complete,
	error
)

// =======================================
/*
	Promises are also about passing data, propogating data down from step to step
*/

function getData(d){
	return new Promise(funciton(resolve, reject){
		setTimeout(function(){resolve(d);}, 1000);
	});
}

var x;

getData(10)
.then(function(num1){
	x = 1 + num1;
	return getData(30);
})
.then(function(num2){
	var y = 1 + num2;
	return getData('The meaning of life is...' + (x + y));
})
.then(function(answer){
	console.log(answer);
});

/*
	If you reference a promise twice...
*/

	promise.then(doSomething) //references same data as....


	//somewhere else in my program. Promise results are immutable.

	promise.then(doSomethingElse)