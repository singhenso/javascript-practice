/*

	Everything outside of setTimeout (including the call to setTimeout itself), is part 
	A of your program, inside setTimeout is part B. The callback is a "continuation" deferred
	to happen at a later moment.

	Callbacks === Continuations
*/

	setTimeout(function(){
		console.log("callback!");
	}, 1000);

/*
	Callback hell isn't about the Pyramid of Doom.

	Callbacks don't gracefully allow you to make recovery/retry/forking operations. You
	can hard code flow control but the code will become convaluted and hard to read.

	Also, if you are making a call to a third party and using a callback to handle the 
	response, you are handing over control of the rest of your program to this third
	party.

	The third party could...
		1. Call your callback more than once (what if your callback was
			charging a customer's credit card?)
		2. Call your callback too early
		3. Call your callback too late
		4. Fail to pass along necessary parameters to your callback
		5. Swallow any errors/exceptions
	
	You're going to have to do a lot of hard coding to protect against all these possible
	scenarios, and you might even be overlooking potential scenarios.
*/

	