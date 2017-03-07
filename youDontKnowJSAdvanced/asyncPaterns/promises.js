/* 3 states of promises:
	pending
 	fulfilled
 	rejected

	fulfilled or rejected will never change state (once you're done you're done)

	We get to decide what to do with completion of promise, univerting version of control
	*/

//====== jQuery promise ==========================================================

var wait = jQuery.Deferred();
var p = wait.promise();

p.done(function(value){
	console.log(value);
});

setTimeout(function(){
	wait.resolve(Math.random());
}, 1000);

//====== more jQuery promise =====================================================

function waitForN(n){
	var d = $.Deferred();
	setTimeout(d.resolve, n);
	return d.promise();
}

waitForN(1000)
.then(function(){
	console.log("Hello world");
	return waitForN(2000);
})
.then(function(){
	console.log("finally")''
});

//================= Native Promise ==============================================

function getData(d){
	return new Promise(function(resolve, reject){
		setTimeout(function(){resolve(d);}, 1000);
	});
}

var x;

getData(10)
.then(function(num1){
	x = 1 + num1;        // x = 1 + 10
	return getData(30);
})
.then(function(num2){
	var y = 1 + num2;    // y = 1 + 30
	return getData("Meaning of life: " + (x + y));
})
.then(function(answer){
	console.log(answer);  /// Meaning of life: 42
})