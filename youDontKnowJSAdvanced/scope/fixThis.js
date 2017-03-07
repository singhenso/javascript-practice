//==================== Fix with a callback =========================================

 // We have a simple object with a clickHandler method that we want to use when a button on 
 //the page is clicked​
    var user = {
	    data:[
		    {name:"T. Woods", age:37},
		    {name:"P. Mickelson", age:43}
	    ],
	    clickHandler:function (event) {
		    var randomNum = ((Math.random () * 2 | 0) + 1) - 1; // random number between 0 and 1​
		​
		    // This line is printing a random person's name and age from the data array​
		    console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
	    }
    }
​
    // The button is wrapped inside a jQuery $ wrapper, so it is now a jQuery object​
    // And the output will be undefined because there is no data property on the button object​
    $ ("button").click(user.clickHandler); // Cannot read property '0' of undefined

    //SOLUTION:
    $("button").click(user.clickHandler.bind(user));


// =============== FIX THIS INSIDE A CALL BACK ===========================================

    var user = {
	    tournament:"The Masters",
	    data      :[
	    {name:"T. Woods", age:37},
	    {name:"P. Mickelson", age:43}
	    ],
​
    	clickHandler:function () {
		    // the use of this.data here is fine, because "this" refers to the user object, 
		    //and data is a property on the user object.​
		​
		    this.data.forEach (function (person) {
		    // But here inside the anonymous function (that we pass to the forEach method), 
		    //"this" no longer refers to the user object.​
		    // This inner function cannot access the outer function's "this"​
		   
		    console.log ("What is This referring to? " + this); //[object Window]​
 
		    console.log (person.name + " is playing at " + this.tournament);
		    // T. Woods is playing at undefined​
		    // P. Mickelson is playing at undefined​
		    })
    	}
​
    }
​
    user.clickHandler(); // What is "this" referring to? [object Window]

    //SOLUTION:

     var user = {
	    tournament:"The Masters",
	    data      :[
		    {name:"T. Woods", age:37},
		    {name:"P. Mickelson", age:43}
	    ],
​
	    clickHandler:function (event) {
		    // To capture the value of "this" when it refers to the user object, 
		    //we have to set it to another variable here:​
		    // We set the value of "this" to theUserObj variable, so we can use it later​
		    var theUserObj = this;
		    this.data.forEach (function (person) {
			    // Instead of using this.tournament, we now use theUserObj.tournament​
			    console.log (person.name + " is playing at " + theUserObj.tournament);
		    })
	    }
​
    }
​
    user.clickHandler();
    // T. Woods is playing at The Masters​
    //  P. Mickelson is playing at The Masters

// ==================== FIX THIS WHEN THE METHOD IS ASSIGNED TO A VARIABLE ============

	// This data variable is a global variable​
    var data = [
	    {name:"Samantha", age:12},
	    {name:"Alexis", age:14}
	];
	​
    var user = {
	    // this data variable is a property on the user object​
	    data :[
		    {name:"T. Woods", age:37},
		    {name:"P. Mickelson", age:43}
		],

	    showData:function (event) {
			    var randomNum = ((Math.random () * 2 | 0) + 1) - 1; // random number between 0 and 1​
			​
			    // This line is adding a random person from the data array to the text field​
			    console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
    		}
​
	}

​
    // Assign the user.showData to a variable​
    //now when we call showUserData() the execution context is global
    var showUserData = user.showData;
​
    // When we execute the showUserData function, the values printed to the console 
    //are from the global data array, not from the data array in the user object​

    showUserData (); // Samantha 12 (from the global data array)​
​	
	//SOLUTION:

	var showUserData = user.ShowData.bind(user);

//======================= FIX THIS WHEN BORROWING METHODS ================================

	// We have two objects. One of them has a method called avg () that the other doesn't have​
    // So we will borrow the (avg()) method​

    var gameController = {
	    scores  : [20, 34, 55, 46, 77],
	    avgScore: null,
	    players : [
		    {name:"Tommy", playerID:987, age:23},
		    {name:"Pau", playerID:87, age:33}
	    ]
    }
​
    var appController = {
	    scores  :[900, 845, 809, 950],
	    avgScore:null,
    	avg     :function () {
​
		    var sumOfScores = this.scores.reduce (function (prev, cur, index, array) {
		    return prev + cur;
		    });
​
    		this.avgScore = sumOfScores / this.scores.length;
    	}
    }
​
    //If we run the code below,​
    // the gameController.avgScore property will be set to the average score from 
    // the appController object "scores" array​
   
    // Don't run this code, for it is just for illustration; 
    // we want the appController.avgScore to remain null​
    gameController.avgScore = appController.avg();
    // The avg method’s “this” keyword will not refer to the gameController object, 
    //it will refer to the appController object because it is being invoked on the appController.

    //SOLUTION: use apply, first parameter is what we want this to be

    appController.avg.apply(gameController, gameController.scores);