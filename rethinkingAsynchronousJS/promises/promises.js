/*
	Promises are like event listeners.

	You can either fulfill a promise via resolve or reject it via reject.
*/

function trackCheckout(info){
	return new Promise(function(resolve, reject){

	})
};

function finish(){
	chargeCreditCard(purchaseInfo);
	showThankYouPage();
}

function error(err){
	logStatsError(err);
	finish();
}

var promise = trackCheckout(purchaseInfo);

promise.then(
	finish,
	error
)

/*
	If theres still callbacks involved, how are we solving the issue? How can we trust the Promise?
	
	Promise Trust:
		Only resolved once
		Either success OR error
		Messages passed/kept
		Exceptions become errors
		Immutable once resolved

	Pattern for managing callbacks in a trustable fashion.
*/