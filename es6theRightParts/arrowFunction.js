/*
	variable = parameters => return value;

	No way to give a name to an arrow function.
	Anonymous function show up anonymous in stack traces. Bad for error tracing.
	
*/

function foo(){
	return 2;
}

// same as...

foo = x => 2;

// variations: (visual hiccups)

() => 3
x => 3
(...x) => 3
(x, y) => 3