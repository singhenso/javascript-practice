/*
	if the new keyword was a method on a prototype, this is what it would look like...
*/

Function.prototype.new = function new(){
	var that = Object.create(this.prototype),
	result = this.apply(that, arguments);
	return(typeof result === 'object' && result !== null) ? result : that;
}

//=================================

function Gizmo(id){
	this.id = id;
};

Gizmo.prototype.toString = function(){
	return "gizmo " + this.id;
}

function Hoozit(id){
	this.id = id;
}

Hoozit.prototype = new Gizmo();

Hoozit.prototype.test = function(id){
	return this.id === id;
}

/*
	Trying to do classical programming in a language without a type system.  This is not easy. Also,
	notice we don't really have privacy in this model.

	The way to do better is the module pattern. Lets try it.
*/

function gizmo(id){
	return{
		id: id,
		toString: function(){
			return "gizmo" + this.id;
		}
	};
}

function hoozit(id){
	var that = gizmo(id);
	that.test = function(testid){
		return testid === this.id;
	};
	return that;
}

/*
	Lets make some stuff private...
*/

function gizmo(id){
	return{
		toString: function(){
			return "gizmo" + id;
		}
	};
}

function hoozit(id){
	var that = gizmo(id);
	that.test = function(testid){
		return testid === id;
	};
	return that;
}

/*
	COST: in the prototype model, we save on memeory, but in this model we have much more objects created,
	incurring a memory cost
*/