//make a funciton that takes f that returns a function that calls f on time out

function j(f){
	setTimeout(function(){
		f();
	}, 1000)
}


function f(){
	console.log('Hello');
}

f();

//make a function that calls input f every 50 miliseconds

function foreverAndEver(){
	while(true){
		setTimeout(function(){
			f()
		}, 50);
	}
}

foreverAndEver();

//Check if matrix is word square (check [i][j] === [j][i])  

//DFS on html nodes