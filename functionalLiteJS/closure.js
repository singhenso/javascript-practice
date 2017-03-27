/*
	Closure remembers variables around it even when function is 
	executed elsewhere
*/

function foo(){
	count 0;
	return function(){
		return count++;
	};
}

var x = foo();

x(); // 0
x(); // 1
x(); // 2
