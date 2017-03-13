/*	fetch API is not supported by all browsers
	and is based on Promises
*/

fetch('www.google.com')
.then(function(response){
	console.log(response);
}).catch(function(error){
	console.log(error);
})

//===============================================

var request = new Request('https://davidwalsh.name/users.json', {
	method: 'POST', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'Content-Type': 'text/plain'
	})
});


fetch(request).then(function() { /* handle response */ });

//================================================

fetch('www.google.com', {
	method: 'POST', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'Content-Type': 'text/plain'
	})
}).then(function(response){ console.log(response)});