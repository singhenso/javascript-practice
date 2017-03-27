/*
	A transformation is doing something to one value and getting
	a different value out (thats it).

	But remember, functional programming chooses to use functions
	in an immutable fashion.

	.map() returns a whole new array
*/

function doubleIt(v){ return v * 2; }

[1,2,3,4,5,6].map(doubleIt);