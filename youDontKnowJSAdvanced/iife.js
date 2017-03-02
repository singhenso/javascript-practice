//immediately invoked function expression

var foo = "foo";

//wrap a function in parenthesis to make it an expression
//the parenthesis at the end executes the function
(function(){
	var foo = "foo2";
	console.log(foo);
})();

console.log(foo); //still just foo

//============================================================

/*
	Below code will not work, because it will just log whatever i is when
	this for loop is finished. 'i' is never "locked in".
*/

	var elems = document.getElementByTagName('a');

	for (var i = 0; i < elems.length; i++){
		elems[i].addEventListener('click', function(e){
			e.preventDefault();
			alert('I am link #' + i);
		}, 'false');
	}

/*
	The below code works, because i is locked in as "lockedInIndex"; After the loop
	has finished executing, even though the value of 'i' is the total number of
	elements, inside the IIFE the value of 'lockedInIndex' is whatever the value passed into
	it ('i') was at the time of execution
*/

	var elems = document.getElementByTagName('a');

	(function(lockedInIndex){
		for (var i = 0; i < elems.length; i++){
			elems[i].addEventListener('click', function(e){
				e.preventDefault();
				alert('I am link #' + lockedInIndex);
			}, 'false')
		}
	})(i);

//===============================================================

var foo = "foo";

(function(bar){
	var foo = bar;
	console.log(foo); //"foo"
})(foo);

console.log(foo) //"foo"