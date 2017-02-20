/*Abstracting over an array with higher-order function, forEach*/

var array = [5, 6, 9, 1, 3, 4, 5, 2, 3];
console.log(array);

array.forEach(function(i){
	console.log(i);
});

/*Abstracing over actions with a closure*/

function greaterThan(n){
	return function(m) { return m > n};
}

greaterThanFive = greaterThan(5);

console.log(greaterThanFive(10));

/*Abstracting over array with filter()*/

array.filter(function(i){
	if (i > 5) console.log(i);
});

/*transform an array with map*/

array.map(function(i){
	return i - 1;
});

/*Abstracting over an array with reduce, folding up the array 1 element at a time
	Easiest way (IMO) to sum up an array.
*/

console.log(array.reduce(function(a, b){
	return a + b;
}, 0));