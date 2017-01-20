// 3 states of promises:
// 	pending
// 	fulfilled
// 	rejected

//pending can change state (duh) but fulfilled rejected will never change state (once you're done ur done)


//then method takes two parameters (optionally), callbacks that return a fullfillment or rejection
//if promiseMeSomething works, yada returns, if it doesn't work, nada returns
promiseMeSomething()
.then(function(value){
	return "yada";
}, function (reason){
	return "nada";
});

//then returns a promise, here we assign that value to "outputPromise"
//outputPromise becomes a new promise for the return value of either handler
//outputPromise can become a new promise, be rejected, or get fulfilled
var outputPromise = getInputPromise()
.then(function(input){
	return "woohoo";
}, function(reason){
	return reason; //this is an exception
};

//chain promises to alter future values
var greetingPromise = sayHello();
greetingPromise.then(function (greeting) {
    return greeting + '!!!!';
}).then(function (greeting) {
    console.log(greeting);    // 'hello world!!!!’
});

//if you omit the rejection handler, the error will go to outputPromise
var outputPromise = getInputPromise()
.then(function(input){
	//stuff
});

//if you omit the fulfillment handler, the value will go to outputPromise
//this is good if you only wanna handle the error
var outputPromise = getInputPromise()
.then(null, function(error){
	//stuff
});

//chain ansychronous operations to control the order in which they unfold


//the fin function is like a "finally" clause; 