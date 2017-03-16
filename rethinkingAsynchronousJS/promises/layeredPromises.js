/*
	Promise.all returns an array of promise, that we wait on with .then(function(values)),
	where you wait on x and y so we can add them together
*/

function add(xPromise, yPromise){
	return Promise.all([xPromise, yPromise]).then(function(values){
		return values[0] + values[1];
	});
}

add(fetchX(), fetchY()).then(function(sum){
	console.log(sum);
});

/*
	Promise "gate". We want ALL these things to happen, and then we'll move along.

	Promise.all gives us a promise that we "then" off of and give to a new promise, doTask2
*/

Promise.all([
	doTask1a(),
	doTask1b(),
	doTask1c()
])
.then(function(results){
	return doTask2(
		Math.max(
			results[0],
			results[1],
			results[2]
		);
	);
});