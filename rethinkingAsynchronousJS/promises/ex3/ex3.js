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

function getFile(file) {
	// what do we do here?
	return new Promise(function(resolve, reject){
		fakeAjax(file, function(data){
			resolve(data);
		});
		reject(Error('There has been an error'));
	})
}

// request all files at once in "parallel"
// ???

getFile(file1).then(function(data){
	output(data);
	return getFile(file2);
}).then(function(data){
	output(data);
	return getFile(file3);
}).then(function(data){
	output(data);
	output('Done!');
});
