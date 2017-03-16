var data = ajax("http://some.url");
console.log(data) //Oops! We don't have data yet!

//mitigated by...

ajax("http://some.url", function myCallback(data){
	console.log(data); //yay, I work!
});

/*
	While it is true that you CAN make synchronous Ajax requests, you never should! It
	locks the rowser UI (buttons, scrolling, etc.) and prevents all user interaction.
*/

/*
	The console environment is not offically part of JS, but rather the host environment.
	This means that console.log(...) doesn't immediately output what its given in every
	browser or environment.  I/O is very slow and blocking to most programs (including JS),
	so it might be better to perform console operations asynchronously in the background.

	Below, the browser might defer console I/O to the background, and a.index++ will run
	before a is logged to the console. So, you might get index: 2 instead of expected
	index: 1.
*/
	var a = {
    	index: 1
	};

	// later
	console.log( a ); // ??

	// even later
	a.index++;

/*
	The event loop is where the browser schedules JS execution. It is continuously running,
	and each iteration is called a "tick".  For each tick, if an event is waiting in the queue,
	its taken off and executed. Your callback is queued behind all other functions in the queue
	and it waits its turn. No cutting the line.

	setTimeout() DOES NOT put your callback on the event loop queue. What it does is set up
	a timer, and when the timer expires, it places your callback on the event loop queue.
	You are garunteed that your function will fire after the specified time, but not at the 
	exact time.
*/

	// `eventLoop` is an array that acts as a queue (first-in, first-out)
	var eventLoop = [ ];
	var event;

	// keep going "forever"
	while (true) {
	    // perform a "tick"
	    if (eventLoop.length > 0) {
	        // get the next event in the queue
	        event = eventLoop.shift();

	        // now, execute the next event
	        try {
	            event();
	        }
	        catch (err) {
	            reportError(err);
	        }
	    }
	}

/*
	"Run to Completion" url1 and url2 could respond at the same moment or at completely
	unexpected moments. JS will process them in an order, which is not garunteed. So,
	res[0] could be url2, or it could be url1, and this could be considered a "race to
	completion" bug. 


*/

	var res = [];

	function response(data) {
	    res.push( data );
	}

	// ajax(..) is some arbitrary Ajax function given by a library
	ajax( "http://some.url.1", response );
	ajax( "http://some.url.2", response );


	//to account for the possible race bug...

	var res = [];

	function response(data) {
	    if (data.url == "http://some.url.1") {
	        res[0] = data;
	    }
	    else if (data.url == "http://some.url.2") {
	        res[1] = data;
	    }
	}

	// ajax(..) is some arbitrary Ajax function given by a library
	ajax( "http://some.url.1", response );
	ajax( "http://some.url.2", response );

/*
	Cooperation

	HACK: setTimeout(function(){}, 0) will just put something at the end of the event loop
	queue (next tick)

	Below code will hog the event loop until its completed.
*/

	var res = [];

	// `response(..)` receives array of results from the Ajax call
	function response(data) {
	    // add onto existing `res` array
	    res = res.concat(
	        // make a new transformed array with all `data` values doubled
	        data.map( function(val){
	            return val * 2;
	        } )
	    );
	}

	// ajax(..) is some arbitrary Ajax function given by a library
	ajax( "http://some.url.1", response );
	ajax( "http://some.url.2", response );

	// ======= below code will fix issue =================================================

	var res = [];

	// `response(..)` receives array of results from the Ajax call
	function response(data) {
	    // let's just do 1000 at a time
	    var chunk = data.splice( 0, 1000 );

	    // add onto existing `res` array
	    res = res.concat(
	        // make a new transformed array with all `chunk` values doubled
	        chunk.map( function(val){
	            return val * 2;
	        } )
	    );

	    // anything left to process?
	    if (data.length > 0) {
	        // async schedule next batch
	        setTimeout( function(){
	            response( data );
	        }, 0 );
	    }
	}

	// ajax(..) is some arbitrary Ajax function given by a library
	ajax( "http://some.url.1", response );
	ajax( "http://some.url.2", response );