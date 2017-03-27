/*
	Not native to JavaScript (yet)

	An observable is a stream of data that comes through

	www.rxmarbles.com

	Framework: Rxjs
*/

//create observable with a dom element and event name
var observable = Rx.Observable.fromEvent(btn, "click");

//every time an event comes in, it flows through this chain
observable
	// think of an event stream as a neverending array
	.map(function mapper (evt){
		return evt.target.className;
	})
	.filter(function filterer(className){
		return /foobar/.test(className);
	})
	// this method only lets unique events flow through
	.distinctUntilChanged();
	.subscribe(function(data){
		var className = data[1];
		console.log(className);
	});