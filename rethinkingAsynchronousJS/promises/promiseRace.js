/*
	Wait for any resolution and whichever one crosses finish line first wins, and everyone
	else gets ignored.

	The timeout sets a max timout for the promise.

	.race() returns a promise that resolves or rejects as soon as one of the promises
	in the iterable resolves or rejects
*/

var p = trySomeAsyncThing();

Promise.race([
	p,
	//time bomb - after 3 seconds we reject if we have no resolution yet
	new Promise(function(_, reject){
		setTimeout(function(){
			reject("Timeout!");
		}, 3000);
	})
])
.then(
	success,
	error
);