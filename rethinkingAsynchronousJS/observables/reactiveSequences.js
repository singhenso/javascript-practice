/*
	Reactive sequences work similar to JS observables.
*/

function fromEvent(el, eventType){
	return ASQ.react(function(proceed){
		$(el).bind(eventType, proceed);
	});
};

var rsq = fromEvent(bt, "click");

rsq
	.val(function(evt){
		return evt.target.className;
	})
	.then(function(done, ClassName){
		if(/foobar/.test(className)){
			done(className);
		}
	})
	.val(function(className){
		console.log(className);
	});