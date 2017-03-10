//first you make an instance of the class
if (window.XMLHttpRequest) {
    // code for modern browsers
    var http = new XMLHttpRequest();
 } else {
    // code for old IE browsers
    var http = new ActiveXObject("Microsoft.XMLHTTP");
}

//call a function when state changes
http.onreadystatechange = alertContents;

function alertContents(){
	if(http.readyState === 4){
		if(http.status === 200){
			alert(http.responseText)
		}
		else{
			alert("Error");
		}
	}
}

//then you specify the request method and url via open()
//third parameter defaults to true for asynch, if you want synch set to false
http.open('GET', 'www.google.com', true);

//sends the request to server
http.send(null);

/*
	you can add event listeners that follow the ProgressEvent interface
*/
http.addEventListener("progress", updateProgress);
http.addEventListener("load", transferComplete);
http.addEventListener("error", transferFailed);
http.addEventListener("abort", transferCanceled);http