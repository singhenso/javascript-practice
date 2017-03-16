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
// The old-n-busted callback way

function getFile(file) {
	var responses = [];

	fakeAjax(file,function(text){
		if(file === 'file1'){
			responses.push(text);
		}
		if(responses[0] !== null && file === 'file2'){
			responses.push(text)
		}
		if(responses[1] !== null && file === 'file3'){
			responses.push(text);
		}
	});

	for(var i = 0; i < responses.length; i++){
		output(reponses[i]);
	}
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
