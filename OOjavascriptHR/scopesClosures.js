/*
A new lexical scope is created every time you make a new function
An inner lexical scope has access to a containing outer lexical scope

Blocks on looping or conditionals do not create new scopes.

EXECUTION CONTEXT - in-memory scopes that differ from lexical scope in that it is 
	built as code runs, not as it is type;
	governs what variables are available at run time and within what context

	Every time a function is run it creates a new execution context

CLOSURES - any function that remains available after outer scopes have returned;
	- the context for a function will always created as a child
		of the context it was defined within
*/

var sagas = [];

var hero = aHero(); //returns String and assigns it to global variable hero, say its "Boy"

var newSaga = function(){
	var foil = aFoil(); //returns a String
	sagas.push(function(){ //pushes function object to sagas
		var deed = aDeed(); //returns a random string
		log(hero+dead+foil);
	})
}

newSaga(); //calls newSaga, creates new execution context
//within global execution context, sets foil to "Rat"
saga[0](); //calls function object, generates new deed, returns "BoyEyesRat"
saga[0](); //calls function object again, generates new deed again, returns "BoyDigsRat"
newSaga(); //calls newSaga, new execution context, pushes to sagas[1], sets its foil to ET
saga[0](); //calls function object at index 0, we get "BoyPinsRat" notice foil is still rat
saga[1](); //BoyGetsET 
saga[0](); //BoyEatsRat