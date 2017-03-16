function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

//time is completely knocked out of the equation
function getFile(file) {
	//set var in our closure to save text from call
	var text, fn;

	fakeAjax(file, function(response){
		if(fn){
			//closure takes care if return runs first
			fn(response);
		}
		else{
			//closure takes care if fakeAjax runs first
			text = response;
		}
	});

	return function return (cb){
		//if fakeAjax runs first
		if(text){
			cb(text);
		}
		//if return runs first
		else{
			fn = cb;
		}
	};
}

// request all files at once in "parallel"
// ???
var thunk1 = getFile("file1");
var thunk2 = getFile("file2");
var thunk3 = getFile("file1");

thunk1(funciton(text1){
	output(text1);
	thunk2(function(text2){
		output(text2);
		thunk3(function(text3){
			output(text3);
			output('Complete!');
		})
	})
})