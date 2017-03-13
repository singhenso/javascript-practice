//Write an identity function that takes an argument and returns that argument

function identity (argument){
	return argument;
}

//write a function identityf that takes an argument and returns a function that returns taht argument

function identifyf(argument){
	return function(){
		return argument;
	}
}

var three = function(3);

three() // 3

//Write a function addf that adds from two invocations

addf(3)(4) = 7;

function addf(number){
	return function(number2){
		return number + number2;
	}
}

//Write a function liftf that takes a binary function, and makes it callable within two invocations

/*
	This is a higher order function, a function that takes another function as a parameter and returns
	another function as a result.
*/

function mul(first, second){
	return first * second;
}

var addf = liftf(add);
addf(3)(4);//7
liftf(mul)(5)(6);

function liftf(binaryFunction){
	return function(first){
		return function(second){
			return binaryFunction(first, second);
		}
	}
}


//Write a function curry that takes a binary function and an argument, and returns a function that can take
//a second argument

/*
	Taking a function with multiple arguments and making it a function that takes a single argument is called currying
*/

var add3 = curry(add, 3);
add3(4) //7

function curry(binaryFunction, firstArgument){
	return function(secondArgument){
		return binaryFunction(firstArgument, secondArgument);
	}
}

//Without writing any new functions, show three ways to write the inc function (takes any number and adds 1 to it)

var inc = curry(add, 1);

var inc = liftf(add)(1);

var inc = addf(1);

//===================================================================================================================

//Write a function twice that takes a binary function and returns a unary function that passes its argument to
//the binary function twice

function twice(binaryFunction){
	return function(argument){
		binaryFunction(argument, argument);
	}
}

var double = twice(add);
double(11); //22

//Write reverse, a function that reverses the arguments of a binary function

function reverse(binaryFunction){
	function(first, second){
		return binaryFunction(second, first);
	}
};

//Write composeu, a function that takes two unary functions and returns a unary function that calls them both

function composeu(unary1, unary2){
	return function(number){
		return unary2(unary1(number));
	}
}

//Write a function, composeb, that takes two binary functions and returns a function that calls them both

function composeb(binary1, binary2){
	return function(num1, num2, num3){
		return (binary2(binary1(num1, num2), num3));
	}
}

//Write a limit function that allows a binary function to be called a limited number of times

function limit(binary, theLimit){
	var count = 0;

	if(count < theLimit){
		return function(num1, num2){
			count += 1;
			return num1 + num2;
		}
	}
	return undefined;
}

//================================================================================================

//Write a from function that produces a generator that will produce a series of values.

function from(firstNum){
	return function(){
		firstNum++;
		return (firstNum - 1);
	}
}

//Write a to function that takes a generator and an end value, and returns a generator that
//will produce numbers up to that limit

function to(generator, endValue){
	return function(){
		var count = 0;
		if (count < endValue){
			count++;
			return generator();
		}
		return undefined;
	}
}

//Write a fromTo function that produces a generator that will produce values in a range

function fromTo(num1, num2){
	return to(from(num1), num2)
}

//Write an element function that takes an array and a generator and returns a gnerator that will produce elements from array

function element(array, generator){
	if (generator === undefined){
		generator = fromTo(0, array.length);
	}
	return function(){
		if(generator() !== undefined){
			return array[generator()];
		}
	}
}

//=====================================================================================================================

//Write a function collect that takes a generator and an array and produces a function that will collect results in an array

var array = [];
var col = collect(fromTo(0,2), array);

function collect(generator, array){
	return function(){
		if(generator() !== undefined){
			array.push(generator());
		}
		return generator();
	}
}

//Write a function filter that takes a generator and a predicate and produces a generator that produces only the
//values approved of by the predicate

function filter(generator, condition){
	return function recursive(){
		var value = generator();
		if(value === undefined || condition(value)){
			return value;	
		}
		return recursive();
	}
}

//Write a concat function that takes two generators and produces a generator that combines the sequences

function concat(generator1, generator2){
	return function(){
		if (generator1() !== undefined){
			return generator1();
		}
		else if(generator2() !== undefined){
			return generator2();
		}
		return undefined;
	}
}

//Make a function gensymf that makes a funciton that generates unique symbols

function gensymf(character){
	var count = 0;
	return function(){
		count++;
		return character + count;
	}
}

//Write a function gensymff that takes a unary function and a seed and returns a gensymf

function gensymff(factory, seed){
	return gensymf(chcaracter){
		var number = seed;
		return function(){
			seed = factory(number);
			return prefix + number;
		}
	}
}

//Make a function fibonaccif that returns a generator that will return the next fibonacci number

function fibonaccif(num1, num2){
	var n = 0;
	var temp = n;
	var temp1 = num1;
	var temp2 = num2;

	return function fibonacci(){
		n = temp;
		num1 = temp1;
		num2 = temp2;

		if(temp < 2){
			temp++
			return n;
		}
		else{
			temp1++;
			temp2++;

			return num1 + num2;
		}
	}
}

function fibonaccif(num1, num2){
	var i = 0;
	return function(){
		var next;
		switch(i){
			case 0:
				i = 1;
				return a;
			case 1:
				i = 2;
				return b;
			default:
				next = a + b;
				a = b;
				b = next;
				return next;
		}
	}
}

function fibonaccif(a, b){
	return function(){
		var next = a;
		a = b;
		b += next;
		return next;
	}
}