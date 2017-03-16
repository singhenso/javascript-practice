/*
	A Thunk is a function that has everything it needs to return a value when its called.
	Doesn't need anything passed in.

	Thunk becomes a container around a particular state.
*/

	function add(x,y){
		return x + y;
	}

	var thunk = function(){
		return add(10,15);
	}

	thunk();

/*
	Async thunk

	Outside world doesn't know or care if the value is immediately available or not

	First time thunk is called might take a while, but it could memorize the answer
	to the quesiton so that the next time you call it you get the value right away

	By wrapping this funciton around the state, we have normalized time out of the 
	equation.

	Time independent wrapper around a function.
*/

	function addAsync(x, y, cb){
		setTimeout(function(){
			cb(x + y);
		}, 1000);
	}

	var thunk = function(cb){
		addAsync(10, 15, cb);
	};

	thunk(function(sum){
		sum;
	});

/*
	Thunks are so important because they use closures to maintain the state of something,
	eliminating time as a complecting factor of state.
*/

	function aSynchCall(file, callback){
		setTimeout(function(){
			callback(file);
		}, 5000);
	}

	function myThunk(aSynchFunction, file){
		var fn, myFile;

		aSynchFunction(file, function(){
			if(fn){
				fn(myFile);
			}
			else{
				myFile = file;
			}
		});

		return function(callback){
			if(!myFile){
				fn = callback;
			}
			else{
				callback(myFile);
			}
		}
	}

	var thunk = myThunk(aSynchCall, someURL);

	thunk(function(text){
		console.log(text);
	});
