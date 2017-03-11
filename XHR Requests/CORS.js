/*
	Works by adding new HTTP headers
*/

//===============================================

function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){ //"withCredentials" property only exists on xhr2
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", "http://www.nczonline.net/");

if(!request){
	throw new Error("CORs not supported");
}

if (request){
    request.onload = function(){ //.onload is only on xhr2
        //do something with request.responseText
    };
    request.send();
}


//============== Simple Request =================

/*
	Only allowed methods: Get, Head, and Post
	Only has forbidden header names or CORS-safelisted headers

	Below request elicits following request/response headers:

	GET /resources/public-data/ HTTP/1.1
	Host: bar.other
	User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
	Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*;q=0.8
	Accept-Language: en-us,en;q=0.5
	Accept-Encoding: gzip,deflate
	Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
	Connection: keep-alive
	Referer: http://foo.example/examples/access-control/simpleXSInvocation.html
	Origin: http://foo.example !!!!!!!!


	HTTP/1.1 200 OK
	Date: Mon, 01 Dec 2008 00:23:53 GMT
	Server: Apache/2.0.61 
	Access-Control-Allow-Origin: *  !!!!!!!!!!
	Keep-Alive: timeout=2, max=100
	Connection: Keep-Alive
	Transfer-Encoding: chunked
	Content-Type: application/xml

*/

var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/public-data/';
   
function callOtherDomain() {
  if(invocation) {    
    invocation.open('GET', url, true);
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}

//================ Preflighted Request ===========================

/*
	A preflighted request will have headers other than the CORS-safe listed headers.
	This will automatically elicit an "OPTIONS" request FIRST, and THEN the actual request will be sent (2 requests)

*/

var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/post-here/';
var body = '<?xml version="1.0"?><person><name>Arun</name></person>';
    
function callOtherDomain(){
  if(invocation)
    {
      invocation.open('POST', url, true);
      invocation.setRequestHeader('X-PINGOTHER', 'pingpong'); //not a CORS-safe listed header
      invocation.setRequestHeader('Content-Type', 'application/xml');
      invocation.onreadystatechange = handler;
      invocation.send(body); 
    }
}

//============= Request with Credentials ===========================

/*
	Since this is a simple GET request, it is not preflighted, but the browser will reject any response that does 
	not have the Access-Control-Allow-Credentials: true header, and not make the response available 
	to the invoking web content.

	Credentialed requests are aware of cookies. Request header looks like this:

		Cookies : Whatever my cookies are

	When responding to a credentialed request, server cannot set Access-Controll-Allow-Origin to *
	It has to be the specific domain asking for the response
*/

var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/credentialed-content/';
    
function callOtherDomain(){
  if(invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true; 
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}