/*
	bind() is used to call a function setting this explicitly
		if we use a this kw in a method and we call that method from a receiver
			object, we need .bind()
		The this value is also bound to another object if we assign 
			the method (where this is defined) to a variable.

	call()
		pass in function parameters as individual parameters

	apply()
		pass in function parameters as an array
*/

//======= Bind Polyfill ============================================================================


	// Credit to Douglas Crockford for this bind method​
	if (!Function.prototype.bind) {
	    Function.prototype.bind = function (oThis) {
	        if (typeof this !== "function") {
	            // closest thing possible to the ECMAScript 5 internal IsCallable function​
	            throw new TypeError ("Function.prototype.bind - what is trying to be bound is not callable");
	        }
	​
	        var aArgs = Array.prototype.slice.call (arguments, 1),
	                fToBind = this,
	                fNOP = function () {
	                },
	                fBound = function () {
	                    return fToBind.apply (this instanceof fNOP && oThis
	                            ? this​
	                            : oThis,
	                            aArgs.concat (Array.prototype.slice.call (arguments)));
	                };
	​
	        fNOP.prototype = this.prototype;
	        fBound.prototype = new fNOP ();
	​
	        return fBound;
	    };
	}

// =========== Borrow Methods with Bind ===========================================================

	// Here we have a cars object that does not have a method to print its data to the console​
    var cars = {
        data:[
            {name:"Honda Accord", age:14},
            {name:"Tesla Model S", age:2}
        ]
​
    }
​
    // We can borrow the showData () method from the user object we defined in the last example.​
    // Here we bind the user.showData method to the cars object we just created.​
    cars.showData = user.showData.bind(cars);
    cars.showData (); // Honda Accord 14​
​
	/*One problem with this example is that we are adding a new method (showData) on the 
	cars object and we might not want to do that just to borrow a method 
	because the cars object might already have a property or method name showData. 
	We don’t want to overwrite it accidentally. 
	As we will see in our discussion of Apply and Call below, 
	it is best to borrow a method using either the Apply or Call method.*/

// ================ Function Curry with Bind ====================================================

	/*
		Function currying is using a function to return a new function with some parameters
		already set.
	*/

	function greet(gender, age, name){
		var salutation = gender === "male" ? "Mr." : "Ms.";

		if (age > 25){
			return "Hello, " + salutation + name;
		}
		else{
			return "Hey, " + name;
		}
	}

	var greetAnAdultMale = greet.bind(null, male, 30); //first parameter set to null bc we're not using this


	greetAnAdultMale("John Watkins"); //Hello Mr John Watkins

// ======================== Set this value with Apply or Call ====================================

	// global variable for demonstration​
    var avgScore = "global avgScore";
​
    //global function​
    function avg (arrayOfScores) {
        // Add all the scores and return the total​
        var sumOfScores = arrayOfScores.reduce (function (prev, cur, index, array) {
            return prev + cur;
        });
​
        // The "this" keyword here will be bound to the global object, unless we set the "this" with Call or Apply​
        this.avgScore = sumOfScores / arrayOfScores.length;
    }
​
    var gameController = {
        scores  :[20, 34, 55, 46, 77],
        avgScore:null​
    }
​
    // If we execute the avg function thus, "this" inside the function is bound to 
    // the global window object:​
    avg (gameController.scores);
    // Proof that the avgScore was set on the global window object​
    console.log (window.avgScore); // 46.4​
    console.log (gameController.avgScore); // null​
​
    // reset the global avgScore​
    avgScore = "global avgScore";
​
    // To set the "this" value explicitly, so that "this" is bound to the gameController,​
    // We use the call () method:​
    avg.call (gameController, gameController.scores);
​
    console.log (window.avgScore); //global avgScore​
    console.log (gameController.avgScore); // 46.4​


//============ SET THIS IN CALLBACK FUNCTIONS WITH APPLY ===========================

	var clientData = {
	    id: 094545,
	    fullName: "Not Set",
	    // setUserName is a method on the clientData object​
	    setUserName: function (firstName, lastName)  {
		    // this refers to the fullName property in this object​
		    this.fullName = firstName + " " + lastName;
		}
	}

	function getUserInput (firstName, lastName, callback, callbackObj) {
	    // The use of the Apply method below will set the "this" value to callbackObj​
	    callback.apply(callbackObj, [firstName, lastName]);
	}

	// The clientData object will be used by the Apply method to set the "this" value​
    getUserInput("Barack", "Obama", clientData.setUserName, clientData);
    // the fullName property on the clientData was correctly set​
    console.log(clientData.fullName); // Barack Obama​

//============= BORROW ARRAY METHODS WITH APPLY AND CALLL ============================

	// An array-like object: note the non-negative integers used as keys​
    var anArrayLikeObj = {0:"Martin", 1:78, 2:67, 3:["Letta", "Marieta", "Pauline"], length:4 };

    // Make a quick copy and save the results in a real array:​
    // First parameter sets the "this" value​
    var newArray = Array.prototype.slice.call(anArrayLikeObj, 0);
​
    console.log (newArray); // ["Martin", 78, 67, Array[3]]​
​
    // Search for "Martin" in the array-like object​
    console.log (Array.prototype.indexOf.call(anArrayLikeObj, "Martin") === -1 ? false : true); // true​
​
    // Try using an Array method without the call () or apply ()​
    console.log(anArrayLikeObj.indexOf("Martin") === -1 ? false : true);// Error: Object has no method 'indexOf'​
​
    // Reverse the object:​
    console.log (Array.prototype.reverse.call(anArrayLikeObj));
    // {0: Array[3], 1: 67, 2: 78, 3: "Martin", length: 4}​
​
    // Sweet. We can pop too:​
    console.log (Array.prototype.pop.call(anArrayLikeObj));
    console.log (anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, length: 3}​
​
    // What about push?​
    console.log (Array.prototype.push.call(anArrayLikeObj, "Jackie"));
    console.log (anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, 3: "Jackie", length: 4}​

// ========= LOOK AT ARGUMENTS WITH CALL =================================================

	// We do not define the function with any parameters, yet we can get all the arguments passed to it​
    function doSomething () {
        var args = Array.prototype.slice.call(arguments);
        console.log (args);
    }
​
    doSomething ("Water", "Salt", "Glue"); // ["Water", "Salt", "Glue"]​

// ================== USE APPLY TO EXECUTE VARIABLE-ARITY FUNCTIONS ======================

	/*
		Math.max is a variable-arity function
	*/

	// We can pass any number of arguments to the Math.max () method​
    console.log (Math.max (23, 11, 34, 56)); // 56

    var allNumbers = [23, 11, 34, 56];
    // We cannot pass an array of numbers to the the Math.max method like this​
    console.log (Math.max (allNumbers)); // NaN

    var allNumbers = [23, 11, 34, 56];
    // Using the apply () method, we can pass the array of numbers:​
    console.log (Math.max.apply (null, allNumbers)); // 56
