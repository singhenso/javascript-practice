/*
	value: any JavaScript value
	writeable: boolean
	enumerable: boolen //can you enumerate over it?
	configurable: boolean //can delete it or change it into an accessor property if it was a data property

	get: function(){return value};
	set: function(value){};
*/

var my_object = Object.create(Object.prototype);

Object.defineProperty(my_object, 'foo'{
	value: bar,
	writeable: true,
	enumerable: true,
	configurable: true //once configurable is set to false, it can never be set to true again
});

Object.defineProperty(my_object, 'inch', {
	get: function(){
		return this.mm / 25.4
	},
	set: function(value){
		return this.mm * 25.4;
	},
	configurable: false;
});

Object.getOwnPropertyDescriptor(object, key) //describes attributes of a property

//============== Object Extensibility ==========================

Object.preventExtensions(object); //refuses new methods/properties

Object.seal(object); 

Object.freeze(object); //prevents extensions and makes every property read-only and non-configurable

Object.isExtensible(object);

Object.isSealed(object);

Object.isFrozen(object);