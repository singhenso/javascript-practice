 /*
 	Generators alone do not solve the trust issues, they only solve the nonsequential issue.

 	Instead of yielding an undefined value, we are going to yield a promise, and the promise will
 	resume the generator.

 	ASQ has this built in, as do all the major libraries.
 */

function asyncCall(){
	// do some async call
}

ASQ()
.runner(function*(){
	yield asyncCall();
})
.val(function(answer){ // this is our .then
	console.log(answer);
})
