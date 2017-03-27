/*
	first function will show up in stack trace, second won't
	
	Arrow function can't be bound to a this keyword, so it will
	automatically use "this" key word from surrounding scope
*/

p.then(function extractID(v){ return v.id })

p.then(v => v.id)

// ====================

var object = {
	id: 42,
	foo: function foo(){
		setTimeout(function(){
			console.log(this.id);
		}.bind(this), 100);
	}
};

obj.foo(); // 42

// same as

var object = {
	id: 42,
	foo: function foo(){
		setTimeout(() => 
			console.log(this.id)
		, 100);
	}
};

obj.foo(); // 42