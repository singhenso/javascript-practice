/*
	There will be cases where its impossible to predict the number of steps at author time
*/

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
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// Deal with arbitrarily large chain of promises

var listOfURLs = ["file1", "file2", "file3"];

var promises = listOfUrls.map(function(value){
	return getFile(value);
});

promises.reduce(function(chain, promise){
	return chain.then(function(){
		return promise;
	}).then(output);
}, Promise.resolve())
.then(function(data){
	console.log("Complete!");
})
