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

/*
	you can add event listeners that follow the ProgressEvent interface
	you must add event listeners before calling open()
*/
http.addEventListener("progress", updateProgress);
http.addEventListener("load", transferComplete);
http.addEventListener("error", transferFailed);
http.addEventListener("abort", transferCanceled);

function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
    // ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}

function transferComplete(evt) {
  console.log("The transfer is complete.");
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}

//then you specify the request method and url via open()
//third parameter defaults to true for asynch, if you want synch set to false

http.open('GET', 'www.google.com', true);

//sends the request to server
http.send(null);

http.open('POST', 'www.mysite.com', true);

http.send()