/*
	Closure is when a function "remembers" its lexical scope even when the function
	is executing outside its lexical scope.

	Closures have acess to three scope chains: its oiwn, its outer function's, and
	the global scope

	Inner function has access to outer function's variables even after outter funciton
	has returned

	GOTCHA: clsoures cannot access an outer function's this variable by using the this keyword 
	because the this variable is accessible only by the function itself, not the inner function
	
	Closures work because we moved memory allocation from the stack to the heap, and developed a 
	garbage collecter for the heap
		Don't allocate activation records on stack, allocate them on the heap with a garbage collector
*/

function foo(){
	var bar = "bar";

	function baz(){
		console.log(bar);
	}

	bam(baz);
}

function bam(baz){
	baz(); 
}


foo(); // "bar"

//===============================================

function showName(firstName, lastName){
	var nameIntro = "Your name is ";

	function makeFullName(){
		return nameIntro + firstName + " " + lastName;
	}

	return makeFullName();
}

showName("Michael", "Jackson"); //Your name is Michael Jackson

//===============================================

function celebrityName (firstName) {
    var nameIntro = "This celebrity is ";
    // this inner function has access to the outer function's variables, including the parameter​
   function lastName (theLastName) {
        return nameIntro + firstName + " " + theLastName;
    }
    return lastName;
}
​
​var mjName = celebrityName ("Michael"); // At this juncture, the celebrityName outer function has returned.​
​
​// The closure (lastName) is called here after the outer function has returned above​
​// Yet, the closure still has access to the outer function's variables and parameter​
mjName ("Jackson"); // This celebrity is Michael Jackson 

//===============================================

function celebrityID () {
    var celebrityID = 999;
    // We are returning an object with some inner functions​
    // All the inner functions have access to the outer function's variables​
    return {
        getID: function ()  {
            // This inner function will return the UPDATED celebrityID variable​
            // It will return the current value of celebrityID, even after the changeTheID function changes it​
          return celebrityID;
        },
        setID: function (theNewID)  {
            // This inner function will change the outer function's variable anytime​
            celebrityID = theNewID;
        }
    }
​
}
​
​var mjID = celebrityID (); // At this juncture, the celebrityID outer function has returned.​
mjID.getID(); // 999​
mjID.setID(567); // Changes the outer function's variable​
mjID.getID(); // 567: It returns the updated celebrityId variable 

//===============================================

// This example is explained in detail below (just after this code box).​
​function celebrityIDCreator (theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
      theCelebrities[i]["id"] = function ()  {
        return uniqueID + i;
      }
    }
    
    return theCelebrities; //this will only return i++ after the entire for loop ha run
}
​
​var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
​
​var createIdForActionCelebs = celebrityIDCreator (actionCelebs);
​
​var stalloneID = createIdForActionCelebs [0];

console.log(stalloneID.id()); // 103






function celebrityIDCreator (theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i = 0; i < theCelebrities.length; i++) {
        theCelebrities[i]["id"] = function (j)  { // the j parametric variable is the i passed in on invocation of this IIFE​
            return function () {
                return uniqueID + j; // each iteration of the for loop passes the current value of i into this IIFE and it saves the correct value to the array​
            } () // BY adding () at the end of this function, we are executing it immediately and returning just the value of uniqueID + j, instead of returning a function.​
        } (i); // immediately invoke the function passing the i variable as a parameter​
    }
​
    return theCelebrities;
}
​
​var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
​
​var createIdForActionCelebs = celebrityIDCreator (actionCelebs);
​
​var stalloneID = createIdForActionCelebs [0];
console.log(stalloneID.id); // 100​
​
​var cruiseID = createIdForActionCelebs [1]; console.log(cruiseID.id); // 101

//=============================================

$(function(){
	var selections = [];

	$(".niners").click(function(){ //this closure has access to selections variable
		selections.push(this.prop("name"));
	});
});

//===============================================

function foo(){
	var bar = "bar";

	return function(){
		console.log(bar);
	}
}

function bam(){
	foo()(); //bar
}

bam();

//===============================================

function foo(){
	var bar = "bar";

	setTimeout(function(){
		console.log(bar); 
	}, 1000);
}

foo(); //bar, remembers lexical scope

//===============================================

function foo(){
	var bar = "bar";

	$('#btn').click(function(evt){
		console.log(bar); 
	});
}

foo(); //bar, remembers lexical scope

//===============================================

function foo(){
	var bar = 0;

	setTimeout(function(){
		console.log(bar++);
	}, 100);

	setTimeout(function(){
		console.log(bar++);
	}, 200);
}

foo();  //0 1

//===============================================


for (var i = 1; i <=5; i++){
	setTimeout(function(){
		console.log("i: " i);
	}, i*1000);
}
/*
	you get 6 5 different times, why don't we get 5 different i's?
	
	5 different functions close over same global scope

	You could also solve this problem by using forEach() on an array
*/
for (var i = 1; i <=5; i++){
	(function(i){
		setTimeout(function(){
			console.log(i);
		}, 1000 * i)
	})(i);
}

//==================================================

for (let i=1; i <5; i++){
	setTimeout(function(){
		console.log('i: ' i);
	}, i*1000);
}
/*
	This works without the IFFE. The let kw binds i to a for loop 
	AND rebinding i for each iteration of the for loop.
*/

//===================================================

var foo = (function(){
	var o = {bar: "bar"};
	return {obj: o};
})();

console.log(foo.obj.bar)
/*
	This is NOT AN EXAMPLE OF CLOSURE. No function remember its lexical scope
	here because theres no inner function being transported out.
*/