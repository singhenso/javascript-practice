function get(url){
	
	return new Promise(function(resolve, reject){
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		var status = req.status;

		req.onload = function(){
			if(req.status === 200){
			resolve(req.response);
			}
			else{
				reject(req.response);
			}
		}
		

		req.onerror = function(){
			reject(Error('Network Error'));
		}

		req.send();
	});
};

get('www.google.com')
.then(function(response){
	return JSON.parse(response);
}).then(function(response){
	console.log(response);
})

//shortcut:

get('www.google.com').then(JSON.parse).then(function(response){
	console.log(response);
});

//or we could make a getJSON function based off get, which returns a promise

function getJSON(url){
	return get(url).then(JSON.parse);
}